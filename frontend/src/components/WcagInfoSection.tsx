import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WcagInfoSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <Card>
      <CardHeader 
        className="px-6 py-4 flex flex-row justify-between items-center cursor-pointer" 
        onClick={() => setIsExpanded(!isExpanded)}
        tabIndex={0}
        role="button"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsExpanded(!isExpanded);
          }
        }}
        aria-expanded={isExpanded}
        aria-controls="wcag-info-content"
      >
        <CardTitle id="wcag-info-header" className="text-base my-0">About WCAG 2.2</CardTitle>
        <Button 
          variant="ghost" 
          size="sm"
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
          aria-expanded={isExpanded}
          aria-controls="wcag-info-content"
          aria-label={isExpanded ? "Collapse WCAG information" : "Expand WCAG information"}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
        >
          {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </Button>
      </CardHeader>
      
      {isExpanded && (
        <CardContent id="wcag-info-content">
          <div className="prose max-w-none text-gray-700 dark:text-gray-200 dark:prose-headings:text-white dark:prose-strong:text-gray-100">
            <p>
              The Web Content Accessibility Guidelines (WCAG) 2.2 provide recommendations for making web content more accessible
              to people with disabilities including blindness, low vision, deafness, hearing loss, learning disabilities,
              cognitive limitations, motor limitations, speech disabilities, and combinations of these.
            </p>
            
            <h3 className="text-base font-medium mt-4 mb-2">New Key Success Criteria in WCAG 2.2</h3>
            
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>2.4.11 Focus Not Obscured (Minimum)</strong> - When a user interface component receives keyboard focus, the component is not entirely hidden due to author-created content.</li>
              <li><strong>2.4.12 Focus Not Obscured (Enhanced)</strong> - When a user interface component receives keyboard focus, no part of the component is hidden by author-created content.</li>
              <li><strong>2.4.13 Focus Appearance</strong> - When a user interface component receives keyboard focus, the focus indication meets enhanced contrast and size requirements.</li>
              <li><strong>2.5.7 Dragging Movements</strong> - All functionality that uses a dragging movement can be operated by a single pointer without dragging.</li>
              <li><strong>2.5.8 Target Size (Minimum)</strong> - The size of the target for pointer inputs is at least 24 by 24 CSS pixels.</li>
              <li><strong>3.2.6 Consistent Help</strong> - If a web page contains help mechanisms, these are presented consistently.</li>
              <li><strong>3.3.7 Redundant Entry</strong> - Information previously entered by the user is auto-populated or available for the user to select.</li>
              <li><strong>3.3.8 Accessible Authentication (Minimum)</strong> - If authentication requires cognitive function test, alternative authentication method is available.</li>
              <li><strong>3.3.9 Accessible Authentication (Enhanced)</strong> - Authentication does not rely on cognitive function tests.</li>
            </ul>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
