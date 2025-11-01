import { Button } from "@/components/ui/button";
import { FileDown, FileText, FileSpreadsheet } from "lucide-react";
import { AnalysisResponse } from "@shared/schema";
import { exportToPdf, exportToCsv } from "@/lib/exportUtils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ExportButtonsProps {
  results: AnalysisResponse;
  isDisabled?: boolean;
}

export default function ExportButtons({ results, isDisabled = false }: ExportButtonsProps) {
  // Handler functions for exports
  const handlePdfExport = () => {
    exportToPdf(results);
  };
  
  const handleCsvExport = () => {
    exportToCsv(results);
  };
  
  return (
    <div className="flex items-center gap-2">
      <Button
        size="sm"
        onClick={handlePdfExport}
        disabled={isDisabled}
        className="flex items-center gap-1 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50"
        aria-label="Export as PDF"
        tabIndex={0}
      >
        <FileText className="h-4 w-4" />
        <span>PDF</span>
      </Button>
      
      <Button
        size="sm"
        onClick={handleCsvExport}
        disabled={isDisabled}
        className="flex items-center gap-1 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50"
        aria-label="Export as CSV"
        tabIndex={0}
      >
        <FileSpreadsheet className="h-4 w-4" />
        <span>CSV</span>
      </Button>
    </div>
  );
}