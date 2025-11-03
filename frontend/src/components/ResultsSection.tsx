import { useState } from "react";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, GaugeCircle, Tag, Globe, Calendar, CheckCircle, Info, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AnalysisResponse } from "@shared/schema";
import ScoreCircle from "./ScoreCircle";
import CriterionCard from "./CriterionCard";
import CriteriaTabs from "./CriteriaTabs";
import ExportButtons from "./ExportButtons";

interface ResultsSectionProps {
  results: AnalysisResponse;
  isLoading: boolean;
  isError: boolean;
  error: string;
}

export default function ResultsSection({ results, isLoading, isError, error }: ResultsSectionProps) {
  // Use the first tab as the default
  const [activeTab, setActiveTab] = useState("all");

  if (isLoading) {
    return (
      <Card className="mb-8 border-0 shadow-lg overflow-hidden">
        <div className="h-2 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 animate-pulse"></div>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center p-10">
            <div className="animate-spin mb-4">
              <span className="sr-only">Loading...</span>
              <GaugeCircle className="h-12 w-12 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-heading font-bold mb-2">Analyzing Website...</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm text-center max-w-md">
              We're checking the website against WCAG 2.2 criteria. This may take a few moments.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="mb-8 border-0 shadow-lg overflow-hidden">
        <div className="h-2 w-full bg-red-500"></div>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center p-8">
            <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full mb-4">
              <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-lg font-heading font-bold text-red-600 dark:text-red-400 mb-2">Error Analyzing Website</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm text-center max-w-md">
              {error}
            </p>
            <Alert variant="destructive" className="mt-6 w-full max-w-md">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Troubleshooting</AlertTitle>
              <AlertDescription>
                Check that the URL is correct and the website is accessible. Some websites may block automated access.
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Format the timestamp
  const analysisTime = format(
    new Date(results.timestamp),
    "MMM d, yyyy 'at' h:mm a"
  );

  // Filter results based on active tab
  const getFilteredResults = () => {
    switch (activeTab) {
      case "passed":
        return results.results.filter(criterion => criterion.passed);
      case "failed":
        return results.results.filter(criterion => !criterion.passed);
      default:
        return results.results;
    }
  };

  return (
    <section id="results-section" className="mb-8" aria-labelledby="results-header">
      <Card className="overflow-hidden border-0 shadow-lg mb-8">
        <div className="h-2 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500"></div>
        <CardContent className="p-0">
          {/* Header with website info */}
          <div className="bg-gray-50 dark:bg-gray-900/50 p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-sm">
                  <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h2 id="results-header" className="text-xl font-heading font-bold text-gray-900 dark:text-white flex items-center">
                    {results.url}
                  </h2>
                  <div className="flex items-center gap-2 mt-1 text-sm text-gray-500 dark:text-gray-400">
                    <Calendar className="h-4 w-4" />
                    <time dateTime={results.timestamp}>{analysisTime}</time>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="px-3 py-1 text-sm bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200">
                  WCAG 2.2 Assessment
                </Badge>
                <ExportButtons results={results} />
              </div>
            </div>
          </div>
          
          {/* Overall score card */}
          <div className="p-6 md:p-8">
            <div className="mb-8">
              <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <GaugeCircle className="mr-2 h-5 w-5 text-blue-600 dark:text-blue-400" />
                Overall Accessibility Score
              </h3>
              
              <div className="bg-white dark:bg-gray-800/50 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                <div className="flex flex-col lg:flex-row items-center gap-8">
                  <div className="w-full md:w-72 h-72 relative flex items-center justify-center">
                    <ScoreCircle 
                      score={results.overallScore} 
                      label="Overall Score" 
                    />
                  </div>
                  
                  <div className="flex-1 space-y-6">
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-5 border border-blue-100 dark:border-blue-900/30">
                      <div className="flex items-center gap-3 mb-3">
                        <CheckCircle className={`h-6 w-6 ${
                          results.passedCriteria > results.totalCriteria/2 
                            ? "text-green-600 dark:text-green-400" 
                            : "text-amber-500 dark:text-amber-400"
                        }`} />
                        <h4 className="text-lg font-heading font-bold text-gray-900 dark:text-white">
                          {results.passedCriteria} of {results.totalCriteria} criteria passed
                        </h4>
                      </div>
                      <div className="h-3 relative rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                        <div 
                          className={`h-full ${
                            results.overallScore >= 80 
                              ? "bg-green-500" 
                              : results.overallScore >= 60 
                                ? "bg-amber-500" 
                                : "bg-red-500"
                          }`}
                          style={{ width: `${(results.passedCriteria / results.totalCriteria) * 100}%` }}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-base font-heading font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                        <Tag className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
                        Analysis Summary
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                        {results.summary}
                      </p>
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md border border-blue-100 dark:border-blue-900/30 mb-4 text-sm">
                        <p className="text-blue-800 dark:text-blue-300 flex items-start">
                          <Info className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                          <span>
                            This analysis focuses on 27 key WCAG success criteria covering the most important 
                            accessibility requirements across levels A, AA, and AAA.
                          </span>
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {results.tags.map((tag, index) => (
                          <Badge 
                            key={index}
                            variant={tag.isPassed ? "default" : "destructive"}
                            className={`${
                              tag.isPassed 
                                ? "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/50 dark:text-green-200" 
                                : "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/50 dark:text-red-200"
                            }`}
                          >
                            {tag.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Criteria details section */}
      <CriteriaTabs criteria={results.results} />
    </section>
  );
}
