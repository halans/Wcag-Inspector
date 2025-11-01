import { useState } from "react";
import { CriterionResult } from "@shared/schema";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, CheckCircle2, AlertCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface CriterionCardProps {
  criterion: CriterionResult;
}

export default function CriterionCard({ criterion }: CriterionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const toggleExpanded = () => setIsExpanded(!isExpanded);
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleExpanded();
    }
  };
  
  return (
    <Card 
      tabIndex={0}
      role="button"
      aria-expanded={isExpanded}
      onKeyDown={handleKeyDown}
      onClick={toggleExpanded}
      className={`overflow-hidden border-l-4 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-4 ${
        criterion.passed 
          ? "border-l-green-500 hover:shadow-md hover:shadow-green-100 dark:hover:shadow-none" 
          : "border-l-red-500 hover:shadow-md hover:shadow-red-100 dark:hover:shadow-none"
      }`}>
      <CardHeader className={`p-5 flex flex-row items-center justify-between ${
        isExpanded 
          ? "bg-gray-50 dark:bg-gray-900/50" 
          : "bg-white dark:bg-gray-800"
      }`}>
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0">
            <span 
              className={`inline-flex items-center justify-center h-12 w-12 rounded-full shadow-sm ${
                criterion.passed 
                  ? "bg-gradient-to-br from-green-100 to-green-200 text-green-600 dark:from-green-900/70 dark:to-green-800/70 dark:text-green-400" 
                  : "bg-gradient-to-br from-red-100 to-red-200 text-red-600 dark:from-red-900/70 dark:to-red-800/70 dark:text-red-400"
              }`}
              aria-hidden="true"
            >
              {criterion.passed ? (
                <CheckCircle2 className="h-7 w-7" />
              ) : (
                <AlertCircle className="h-7 w-7" />
              )}
            </span>
            <span className="sr-only">{criterion.passed ? "Passed" : "Failed"}</span>
          </div>
          <div>
            <div className="flex items-center flex-wrap gap-2">
              <CardTitle className="text-lg font-heading font-bold text-gray-900 dark:text-white">
                {criterion.name}
              </CardTitle>
              <Badge variant="outline" className="ml-2 text-xs font-normal px-2 py-0">
                {criterion.criterionId}
              </Badge>
              {criterion.wcagVersion && (
                <Badge variant="outline" className="ml-2 text-xs font-normal px-2 py-0 bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800/50">
                  {criterion.wcagVersion}
                </Badge>
              )}
            </div>
            <div className="mt-1 flex items-center gap-3 flex-wrap">
              <Badge 
                variant={criterion.passed ? "default" : "destructive"}
                className={`${
                  criterion.passed 
                    ? "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/50 dark:text-green-200" 
                    : "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/50 dark:text-red-200"
                }`}
              >
                {criterion.passed ? "Passed" : "Failed"}
              </Badge>
              <p className="text-sm text-gray-500 dark:text-gray-400">Level {criterion.level}</p>
              {criterion.principle && (
                <Badge 
                  variant="outline" 
                  className="text-xs font-normal px-2 py-0.5 bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800/50"
                >
                  {criterion.principle}
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        <Button 
          variant="ghost" 
          size="sm"
          onClick={toggleExpanded}
          onKeyDown={handleKeyDown}
          aria-expanded={isExpanded}
          aria-label={`${isExpanded ? "Hide" : "Show"} details for ${criterion.name} criterion`}
          className={`rounded-full p-2 ${
            isExpanded
              ? "bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50"
              : "text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-500 dark:hover:text-gray-300 dark:hover:bg-gray-700/50"
          } focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500`}
        >
          {isExpanded ? (
            <ChevronUp className="h-5 w-5" aria-hidden="true" />
          ) : (
            <ChevronDown className="h-5 w-5" aria-hidden="true" />
          )}
        </Button>
      </CardHeader>
      
      {isExpanded && (
        <>
          <Separator className="h-px bg-gray-200 dark:bg-gray-700" />
          <CardContent className="p-5 space-y-6 bg-white dark:bg-gray-800">
            <div>
              <h5 className="text-sm font-heading font-semibold text-blue-700 dark:text-blue-400 mb-2 flex items-center">
                Description
                <span className="ml-2 h-px flex-grow bg-blue-100 dark:bg-blue-900/50"></span>
              </h5>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {criterion.description}
              </p>
            </div>
            
            <div>
              <h5 className="text-sm font-heading font-semibold text-blue-700 dark:text-blue-400 mb-2 flex items-center">
                Findings
                <span className="ml-2 h-px flex-grow bg-blue-100 dark:bg-blue-900/50"></span>
              </h5>
              <div className={`mt-2 ${
                criterion.passed 
                  ? "bg-green-50 border border-green-200 dark:bg-green-900/20 dark:border-green-900/50" 
                  : "bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-900/50"
              } p-4 rounded-lg`}>
                <div className="flex">
                  <div className="flex-shrink-0">
                    {criterion.passed ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" aria-hidden="true" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" aria-hidden="true" />
                    )}
                  </div>
                  <div className="ml-3">
                    <p className={`text-sm leading-relaxed ${
                      criterion.passed 
                        ? "text-green-800 dark:text-green-200" 
                        : "text-red-800 dark:text-red-200"
                    }`}>
                      {criterion.findings}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h5 className="text-sm font-heading font-semibold text-blue-700 dark:text-blue-400 mb-2 flex items-center">
                {criterion.passed ? "Elements Checked" : "Elements with Issues"}
                <span className="ml-2 h-px flex-grow bg-blue-100 dark:bg-blue-900/50"></span>
              </h5>
              <div className="mt-2 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                  {criterion.elements.map((item, index) => (
                    <li 
                      key={index} 
                      tabIndex={0}
                      role="listitem"
                      className={`py-3 px-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500 rounded ${
                        index % 2 === 0 ? "bg-gray-50 dark:bg-gray-800/50" : "bg-white dark:bg-gray-800"
                      }`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          // Optional: Add an action when pressing Enter on a list item
                          // For now, it's just focusable
                        }
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="pt-0.5">
                          {item.isPassed ? (
                            <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" aria-hidden="true" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" aria-hidden="true" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <code className="text-xs bg-gray-100 dark:bg-gray-900 rounded px-2 py-1 inline-block max-w-full overflow-x-auto whitespace-nowrap">
                            {item.element}
                          </code>
                          {item.issue && (
                            <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">{item.issue}</p>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {criterion.howToFix && (
              <div>
                <h5 className="text-sm font-heading font-semibold text-blue-700 dark:text-blue-400 mb-2 flex items-center">
                  How to Fix
                  <span className="ml-2 h-px flex-grow bg-blue-100 dark:bg-blue-900/50"></span>
                </h5>
                <div className="mt-2 bg-blue-50 border border-blue-100 p-4 rounded-lg dark:bg-blue-900/10 dark:border-blue-900/30">
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {criterion.howToFix}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </>
      )}
    </Card>
  );
}
