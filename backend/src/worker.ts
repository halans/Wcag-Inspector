import { Hono } from "hono";
import { cors } from "hono/cors";
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
  CORS_ALLOWED_ORIGIN?: string;
};

const app = new Hono<{ Bindings: Bindings }>();

function parseTimeout(env: Bindings): number | undefined {
  if (!env.ANALYSIS_FETCH_TIMEOUT_MS) {
    return undefined;
  }
  const parsed = Number.parseInt(env.ANALYSIS_FETCH_TIMEOUT_MS, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined;
}

function parseAllowedOrigins(env: Bindings): "*" | string[] {
  const raw = env.CORS_ALLOWED_ORIGIN?.trim();
  if (!raw) {
    return "*";
  }
  const origins = raw
    .split(",")
    .map((value) => value.trim())
    .filter((value) => value.length > 0);
  return origins.length === 0 ? "*" : origins;
}

app.onError((err, c) => {
  const { status, body } = toErrorResponse(err);
  return c.json(body, status as ContentfulStatusCode);
});

app.use("*", (c, next) => {
  const allowed = parseAllowedOrigins(c.env);
  return cors({
    origin: (origin) => {
      if (allowed === "*") {
        return "*";
      }
      if (!origin) {
        return allowed[0] ?? "";
      }
      return allowed.includes(origin) ? origin : "";
    },
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "OPTIONS"],
    maxAge: 86400,
  })(c, next);
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
