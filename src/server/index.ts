import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { toErrorResponse } from "./errors";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const { status, body } = toErrorResponse(err);
    if (status >= 500) {
      console.error("Unhandled server error:", err);
    }
    res.status(status).json(body);
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Serve the app on configurable port with fallback
  // this serves both the API and the client
  const port = process.env.PORT ? parseInt(process.env.PORT) : 5000;
  
  // Function to find an available port if the default is in use
  const findAvailablePort = async (startPort: number): Promise<number> => {
    return new Promise((resolve) => {
      const testServer = server.listen(startPort, () => {
        const address = testServer.address();
        const port = typeof address === 'object' && address ? address.port : startPort;
        testServer.close(() => resolve(port));
      });
      
      testServer.on('error', () => {
        findAvailablePort(startPort + 1).then(resolve);
      });
    });
  };

  const availablePort = await findAvailablePort(port);
  
  server.listen({
    port: availablePort,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${availablePort}`);
    if (availablePort !== port) {
      log(`Note: Port ${port} was unavailable, using port ${availablePort} instead`);
    }
  });
})();
