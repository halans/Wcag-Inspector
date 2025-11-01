import type { Express, Response } from "express";
import { createServer, type Server } from "node:http";
import {
  AnalysisUrlValidationError,
  analysisUrlErrorMessages,
  analysisRequestSchema,
  normalizeAnalysisUrl,
} from "@shared/schema";
import { analyzeWebsite } from "./accessibility";
import { toErrorResponse } from "./errors";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint for analyzing a website (POST)
  app.post("/api/analyze", async (req, res) => {
    const parsedResult = analysisRequestSchema.safeParse(req.body);
    if (!parsedResult.success) {
      const message =
        parsedResult.error.issues[0]?.message ??
        analysisUrlErrorMessages["invalid-format"];
      return res
        .status(400)
        .json({ code: "INVALID_URL", message });
    }

    try {
      const result = await analyzeWebsite(parsedResult.data.url);
      return res.status(200).json(result);
    } catch (error) {
      return respondWithError(res, error);
    }
  });

  // API endpoint for analyzing a website (GET)
  app.get("/api/analyze", async (req, res) => {
    try {
      // Get URL from query param
      const url = req.query.url as string;

      if (!url) {
        return res.status(400).json({
          code: "INVALID_URL",
          message: analysisUrlErrorMessages["invalid-format"],
        });
      }

      const normalizedUrl = normalizeAnalysisUrl(url);

      // Attempt to analyze the website
      const result = await analyzeWebsite(normalizedUrl);

      // Return the analysis results
      return res.status(200).json(result);
    } catch (error) {
      if (error instanceof AnalysisUrlValidationError) {
        return res
          .status(400)
          .json({ code: "INVALID_URL", message: error.message });
      }

      return respondWithError(res, error);
    }
  });

  // API endpoint for getting analysis history (for future use)
  app.get("/api/analyses", async (req, res) => {
    try {
      // This would fetch from a database in a production app
      // For now, we'll return an empty array
      return res.status(200).json([]);
    } catch (error) {
      return respondWithError(res, error);
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

function respondWithError(res: Response, error: unknown) {
  const { status, body } = toErrorResponse(error);
  if (status >= 500) {
    console.error("Unhandled analysis error:", error);
  }
  return res.status(status).json(body);
}
