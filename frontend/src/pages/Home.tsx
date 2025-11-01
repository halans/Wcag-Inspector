import { useState } from "react";
import Header from "@/components/Header";
import IntroSection from "@/components/IntroSection";
import UrlInputForm from "@/components/UrlInputForm";
import ResultsSection from "@/components/ResultsSection";
import WcagInfoSection from "@/components/WcagInfoSection";
import Footer from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { AnalysisResponse } from "@shared/schema";
import { ApiError } from "@/lib/queryClient";

export default function Home() {
  const [url, setUrl] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Query for analysis results
  const {
    data: results,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery<AnalysisResponse | null>({
    queryKey: ["analysis", url],
    queryFn: async () => {
      if (!url) return null;
      const response = await fetch(
        `/api/analyze?url=${encodeURIComponent(url)}`,
      );

      if (!response.ok) {
        let payload: unknown;
        try {
          payload = await response.json();
        } catch {
          // Ignore JSON parse errors; message fallback handled below.
        }

        const data =
          payload && typeof payload === "object"
            ? (payload as Record<string, unknown>)
            : undefined;

        const message =
          typeof data?.message === "string" && data.message.trim().length > 0
            ? data.message
            : "Failed to analyze website. Please try again.";
        const code =
          typeof data?.code === "string" && data.code.trim().length > 0
            ? data.code
            : "UNKNOWN_ERROR";

        throw new ApiError(message, response.status, code, payload);
      }

      return response.json() as Promise<AnalysisResponse>;
    },
    enabled: url !== "",
  });

  const handleAnalyze = async (submittedUrl: string) => {
    setIsAnalyzing(true);
    setUrl(submittedUrl);

    try {
      await refetch({ throwOnError: true });
    } catch (analysisError) {
      console.error("Analysis error:", analysisError);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleRetry = async () => {
    if (!url) return;
    setIsAnalyzing(true);
    try {
      await refetch({ throwOnError: true });
    } catch (analysisError) {
      console.error("Retry error:", analysisError);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const apiError = error instanceof ApiError ? error : undefined;
  const errorCode = apiError?.code;
  const errorMessage = apiError?.message ?? (isError ? "An unexpected error occurred." : "");
  const busy = isAnalyzing || isLoading || isFetching;
  const shouldShowResults = busy || isError || !!results;

  return (
    <div className="bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 min-h-screen flex flex-col">
      <Header />
      
      <main id="main-content" role="main" aria-label="Main content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow">
        <IntroSection />
        
        <section aria-labelledby="url-input-header">
          <UrlInputForm 
            onAnalyze={handleAnalyze} 
            isAnalyzing={busy} 
          />
        </section>
        
        {shouldShowResults && (
          <section aria-label="Analysis results">
            <ResultsSection 
              results={results ?? undefined} 
              isLoading={busy}
              isError={isError}
              errorMessage={errorMessage}
              errorCode={errorCode}
              onRetry={handleRetry}
            />
          </section>
        )}
        
        <section aria-label="WCAG information">
          <WcagInfoSection />
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
