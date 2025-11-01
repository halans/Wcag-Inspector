import { Hono } from "hono";
import type { ExecutionContext } from "@cloudflare/workers-types";
import type { ContentfulStatusCode } from "hono/utils/http-status";
import {
  analyzeWebsite,
  analysisRequestSchema,
  analysisUrlErrorMessages,
  toErrorResponse,
} from "@shared";

type Bindings = {
  ANALYSIS_FETCH_TIMEOUT_MS?: string;
};

const app = new Hono<{ Bindings: Bindings }>();

function parseTimeout(env: Bindings): number | undefined {
  if (!env.ANALYSIS_FETCH_TIMEOUT_MS) {
    return undefined;
  }
  const parsed = Number.parseInt(env.ANALYSIS_FETCH_TIMEOUT_MS, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined;
}

app.onError((err, c) => {
  const { status, body } = toErrorResponse(err);
  return c.json(body, status as ContentfulStatusCode);
});

app.post("/api/analyze", async (c) => {
  let payload: unknown;
  try {
    payload = await c.req.json();
  } catch {
    return c.json(
      { code: "INVALID_URL", message: analysisUrlErrorMessages["invalid-format"] },
      { status: 400 },
    );
  }

  const parsed = analysisRequestSchema.safeParse(payload);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return c.json(
      {
        code: "INVALID_URL",
        message: issue?.message ?? analysisUrlErrorMessages["invalid-format"],
      },
      { status: 400 },
    );
  }

  try {
    const result = await analyzeWebsite(parsed.data.url, {
      timeoutMs: parseTimeout(c.env),
    });
    return c.json(result);
  } catch (error) {
    const { status, body } = toErrorResponse(error);
    return c.json(body, status as ContentfulStatusCode);
  }
});

app.get("/api/analyze", async (c) => {
  const url = c.req.query("url") ?? "";
  const parsed = analysisRequestSchema.safeParse({ url });
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return c.json(
      {
        code: "INVALID_URL",
        message: issue?.message ?? analysisUrlErrorMessages["invalid-format"],
      },
      { status: 400 },
    );
  }

  try {
    const result = await analyzeWebsite(parsed.data.url, {
      timeoutMs: parseTimeout(c.env),
    });
    return c.json(result);
  } catch (error) {
    const { status, body } = toErrorResponse(error);
    return c.json(body, status as ContentfulStatusCode);
  }
});

export default {
  fetch(request: Request, env: Bindings, ctx: ExecutionContext) {
    return app.fetch(request, env, ctx);
  },
};
