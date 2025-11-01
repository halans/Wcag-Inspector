import { Component, ReactNode, createRef } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface AppErrorBoundaryProps {
  children: ReactNode;
}

interface AppErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class AppErrorBoundary extends Component<
  AppErrorBoundaryProps,
  AppErrorBoundaryState
> {
  private readonly fallbackRef = createRef<HTMLDivElement>();

  constructor(props: AppErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): AppErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Unhandled client error:", error, errorInfo);
  }

  componentDidUpdate(
    _prevProps: AppErrorBoundaryProps,
    prevState: AppErrorBoundaryState,
  ) {
    if (!prevState.hasError && this.state.hasError && this.fallbackRef.current) {
      this.fallbackRef.current.focus();
    }
  }

  private resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <section
          role="alert"
          aria-live="assertive"
          className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4"
        >
          <div
            ref={this.fallbackRef}
            tabIndex={-1}
            className="max-w-xl w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <div className="flex items-center gap-3 text-red-600 dark:text-red-400 mb-4">
              <AlertTriangle className="h-6 w-6" aria-hidden="true" />
              <h1 className="text-xl font-heading font-bold">
                Something went wrong
              </h1>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              An unexpected error occurred while rendering the page. You can try
              again or reload the application.
            </p>
            {this.state.error?.message && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                <strong>Error details:</strong> {this.state.error.message}
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button type="button" onClick={this.resetError}>
                Try again
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => window.location.reload()}
              >
                Reload page
              </Button>
            </div>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}
