import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AppErrorBoundary } from "@/components/AppErrorBoundary";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms-of-service" component={TermsOfService} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="wcag-analyzer-theme">
      <AppErrorBoundary>
        <QueryClientProvider client={queryClient}>
          {/* Skip to content link for keyboard users */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-blue-600 focus:text-white focus:p-3 focus:rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
          >
            Skip to content
          </a>
          <Router />
          <Toaster />
        </QueryClientProvider>
      </AppErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
