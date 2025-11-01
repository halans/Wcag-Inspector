import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

const SUPPORTED_PROTOCOLS = new Set(["http:", "https:"]);
const URL_SCHEME_PATTERN = /^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//;

export type AnalysisUrlValidationReason =
  | "invalid-format"
  | "unsupported-protocol";

export const analysisUrlErrorMessages: Record<AnalysisUrlValidationReason, string> =
  {
    "invalid-format": "Please enter a valid URL (e.g., https://example.com)",
    "unsupported-protocol": "Only HTTP and HTTPS URLs are supported",
  };

export class AnalysisUrlValidationError extends Error {
  constructor(public readonly reason: AnalysisUrlValidationReason) {
    super(analysisUrlErrorMessages[reason]);
    this.name = "AnalysisUrlValidationError";
  }
}

export function normalizeAnalysisUrl(rawUrl: string): string {
  let candidate = rawUrl.trim();
  if (!candidate) {
    throw new AnalysisUrlValidationError("invalid-format");
  }

  if (!URL_SCHEME_PATTERN.test(candidate)) {
    candidate = `https://${candidate}`;
  }

  let parsed: URL;
  try {
    parsed = new URL(candidate);
  } catch {
    throw new AnalysisUrlValidationError("invalid-format");
  }

  if (!SUPPORTED_PROTOCOLS.has(parsed.protocol)) {
    throw new AnalysisUrlValidationError("unsupported-protocol");
  }

  if (!parsed.hostname) {
    throw new AnalysisUrlValidationError("invalid-format");
  }

  parsed.hash = "";
  return parsed.toString();
}

export const analysisUrlSchema = z
  .string()
  .trim()
  .min(1, analysisUrlErrorMessages["invalid-format"])
  .transform((value, ctx) => {
    try {
      return normalizeAnalysisUrl(value);
    } catch (error) {
      if (error instanceof AnalysisUrlValidationError) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: error.message,
        });
        return z.NEVER;
      }
      throw error;
    }
  });

// User schema (keeping the existing one)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Analysis Schema
export const analyses = pgTable("analyses", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  overallScore: integer("overall_score").notNull(),
  passedCriteria: integer("passed_criteria").notNull(),
  totalCriteria: integer("total_criteria").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertAnalysisSchema = createInsertSchema(analyses).omit({
  id: true,
  createdAt: true,
});

export type InsertAnalysis = z.infer<typeof insertAnalysisSchema>;
export type Analysis = typeof analyses.$inferSelect;

// Analysis Results Schema
export const criteriaResults = pgTable("criteria_results", {
  id: serial("id").primaryKey(),
  analysisId: integer("analysis_id").notNull(),
  criterionId: text("criterion_id").notNull(),
  passed: boolean("passed").notNull(),
  findings: text("findings").notNull(),
  elements: text("elements").notNull(), // JSON stringified array of elements
});

export const insertCriteriaResultSchema = createInsertSchema(criteriaResults).omit({
  id: true,
});

export type InsertCriteriaResult = z.infer<typeof insertCriteriaResultSchema>;
export type CriteriaResult = typeof criteriaResults.$inferSelect;

// Analysis Request Schema for URL validation
export const analysisRequestSchema = z.object({
  url: analysisUrlSchema,
});

export type AnalysisRequest = z.infer<typeof analysisRequestSchema>;

// Analysis Response Schema
export const criterionResultSchema = z.object({
  criterionId: z.string(),
  name: z.string(),
  level: z.string(),
  description: z.string(),
  wcagVersion: z.string().optional(),
  principle: z.string().optional(),
  passed: z.boolean(),
  findings: z.string(),
  elements: z.array(z.object({
    element: z.string(),
    issue: z.string().optional(),
    isPassed: z.boolean()
  })),
  howToFix: z.string().optional()
});

export const analysisResponseSchema = z.object({
  url: z.string(),
  timestamp: z.string(),
  overallScore: z.number(),
  passedCriteria: z.number(),
  totalCriteria: z.number(),
  results: z.array(criterionResultSchema),
  summary: z.string(),
  tags: z.array(z.object({
    name: z.string(),
    isPassed: z.boolean()
  }))
});

export type CriterionResult = z.infer<typeof criterionResultSchema>;
export type AnalysisResponse = z.infer<typeof analysisResponseSchema>;
