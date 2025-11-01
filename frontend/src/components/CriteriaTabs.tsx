import { useState } from "react";
import { CriterionResult } from "@shared/schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import CriterionCard from "./CriterionCard";
import { CheckCircle2, AlertCircle, ListFilter, Info, Eye, HandIcon, BrainCircuit, AccessibilityIcon } from "lucide-react";

interface CriteriaTabsProps {
  criteria: CriterionResult[];
}

export default function CriteriaTabs({ criteria }: CriteriaTabsProps) {
  const [activeTab, setActiveTab] = useState("all");
  
  const passedCriteria = criteria.filter(criterion => criterion.passed);
  const failedCriteria = criteria.filter(criterion => !criterion.passed);
  
  // Group criteria by principles
  const perceivableCriteria = criteria.filter(criterion => criterion.principle === "Perceivable");
  const operableCriteria = criteria.filter(criterion => criterion.principle === "Operable");
  const understandableCriteria = criteria.filter(criterion => criterion.principle === "Understandable");
  const robustCriteria = criteria.filter(criterion => criterion.principle === "Robust");
  
  const getFilteredCriteria = () => {
    switch (activeTab) {
      case "passed":
        return passedCriteria;
      case "failed":
        return failedCriteria;
      case "perceivable":
        return perceivableCriteria;
      case "operable":
        return operableCriteria;
      case "understandable":
        return understandableCriteria;
      case "robust":
        return robustCriteria;
      default:
        return criteria;
    }
  };

  return (
    <Card className="overflow-hidden border-0 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <ListFilter className="mr-2 h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl font-heading font-bold text-gray-900 dark:text-white">WCAG 2.2 Success Criteria</h2>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          View details on individual success criteria and filter by status.
        </p>
      </CardHeader>

      <CardContent className="p-6">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Status Filter Tabs */}
          <h3 className="text-sm font-heading font-semibold text-gray-700 dark:text-gray-300 mb-2">Filter by Status</h3>
          <TabsList className="grid grid-cols-3 w-full mb-6 bg-blue-50 dark:bg-gray-900 p-1.5 rounded-lg border border-blue-100 dark:border-gray-700">
            <TabsTrigger 
              value="all" 
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 data-[state=active]:shadow-sm rounded-md px-2 sm:px-4 py-2 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <Info className="mr-1.5 h-4 w-4" />
                  <span>All</span>
                </div>
                <span className="hidden sm:inline-block font-medium bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full text-xs ml-1">
                  {criteria.length}
                </span>
              </div>
            </TabsTrigger>
            
            <TabsTrigger 
              value="passed" 
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-green-600 dark:data-[state=active]:text-green-400 data-[state=active]:shadow-sm rounded-md px-2 sm:px-4 py-2 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <CheckCircle2 className="mr-1.5 h-4 w-4 text-green-600 dark:text-green-400" />
                  <span>Passed</span>
                </div>
                <span className="hidden sm:inline-block font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-2 py-0.5 rounded-full text-xs ml-1">
                  {passedCriteria.length}
                </span>
              </div>
            </TabsTrigger>
            
            <TabsTrigger 
              value="failed" 
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-red-600 dark:data-[state=active]:text-red-400 data-[state=active]:shadow-sm rounded-md px-2 sm:px-4 py-2 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <AlertCircle className="mr-1.5 h-4 w-4 text-red-600 dark:text-red-400" />
                  <span>Failed</span>
                </div>
                <span className="hidden sm:inline-block font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 px-2 py-0.5 rounded-full text-xs ml-1">
                  {failedCriteria.length}
                </span>
              </div>
            </TabsTrigger>
          </TabsList>
          
          {/* WCAG Principles Tabs */}
          <h3 className="text-sm font-heading font-semibold text-gray-700 dark:text-gray-300 mb-2">Filter by WCAG Principle</h3>
          <TabsList className="grid grid-cols-4 w-full mb-6 bg-blue-50 dark:bg-gray-900 p-1.5 rounded-lg border border-blue-100 dark:border-gray-700">
            <TabsTrigger 
              value="perceivable" 
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-purple-600 dark:data-[state=active]:text-purple-400 data-[state=active]:shadow-sm rounded-md px-2 sm:px-4 py-2 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <Eye className="mr-1.5 h-4 w-4" />
                  <span className="text-xs xs:text-sm">Perceive</span>
                </div>
                <span className="hidden sm:inline-block font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 px-2 py-0.5 rounded-full text-xs ml-1">
                  {perceivableCriteria.length}
                </span>
              </div>
            </TabsTrigger>
            
            <TabsTrigger 
              value="operable" 
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-orange-600 dark:data-[state=active]:text-orange-400 data-[state=active]:shadow-sm rounded-md px-2 sm:px-4 py-2 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <HandIcon className="mr-1.5 h-4 w-4" />
                  <span className="text-xs xs:text-sm">Operate</span>
                </div>
                <span className="hidden sm:inline-block font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 px-2 py-0.5 rounded-full text-xs ml-1">
                  {operableCriteria.length}
                </span>
              </div>
            </TabsTrigger>
            
            <TabsTrigger 
              value="understandable" 
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-teal-600 dark:data-[state=active]:text-teal-400 data-[state=active]:shadow-sm rounded-md px-2 sm:px-4 py-2 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <BrainCircuit className="mr-1.5 h-4 w-4" />
                  <span className="text-xs xs:text-sm">Understand</span>
                </div>
                <span className="hidden sm:inline-block font-medium bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-200 px-2 py-0.5 rounded-full text-xs ml-1">
                  {understandableCriteria.length}
                </span>
              </div>
            </TabsTrigger>
            
            <TabsTrigger 
              value="robust" 
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 data-[state=active]:shadow-sm rounded-md px-2 sm:px-4 py-2 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <AccessibilityIcon className="mr-1.5 h-4 w-4" />
                  <span className="text-xs xs:text-sm">Robust</span>
                </div>
                <span className="hidden sm:inline-block font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded-full text-xs ml-1">
                  {robustCriteria.length}
                </span>
              </div>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="space-y-6">
            {getFilteredCriteria().length === 0 ? (
              <div className="text-center py-16 bg-gray-50 dark:bg-gray-900/30 rounded-lg border border-dashed border-gray-200 dark:border-gray-700">
                <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-heading font-bold text-gray-900 dark:text-white mb-2">No Criteria Found</h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                  No criteria match the selected filter. Try changing your filter selection.
                </p>
              </div>
            ) : (
              getFilteredCriteria().map(criterion => (
                <CriterionCard key={criterion.criterionId} criterion={criterion} />
              ))
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
