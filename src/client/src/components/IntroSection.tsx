import { InfoIcon, CheckSquare, AlertTriangle, Lightbulb, AccessibilityIcon, BarChart3, FileCode, Globe, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function IntroSection() {
  const [isToolInfoExpanded, setIsToolInfoExpanded] = useState(false);
  
  return (
    <section className="mb-12">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-50/80 via-indigo-50/80 to-blue-50/80 dark:from-blue-950/30 dark:via-indigo-950/30 dark:to-blue-950/30 border border-blue-100 dark:border-blue-900/30 p-8 md:py-12 md:px-16 mb-10 shadow-sm">
        <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-700/20 [mask-image:linear-gradient(0deg,transparent,black)] dark:[mask-image:linear-gradient(0deg,transparent,white)]" aria-hidden="true"></div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-500/10 to-indigo-600/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 text-sm font-medium mb-6 border border-blue-200 dark:border-blue-800">
            <Sparkles className="h-4 w-4" />
            WCAG 2.2 Compliant Analyzer
          </div>
          
          <h1 className="font-heading text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 bg-clip-text text-transparent dark:from-blue-400 dark:via-indigo-400 dark:to-blue-300 mb-4 leading-tight tracking-tight">
            Website Accessibility Analyzer
          </h1>
          
          <p className="font-sans text-gray-700 dark:text-gray-300 max-w-3xl text-lg md:text-xl leading-relaxed mb-6">
            Make your website accessible to <span className="text-blue-600 dark:text-blue-400 font-medium">everyone</span>. 
            Quickly analyze your site's compliance with WCAG 2.2 guidelines and get actionable recommendations.
          </p>
          
          <div className="flex flex-wrap gap-3 mt-4">
            <Badge className="bg-white/80 dark:bg-gray-800/50 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700 px-3 py-1 text-sm">
              <AccessibilityIcon className="h-3.5 w-3.5 mr-1.5" />
              WCAG 2.2 Analysis
            </Badge>
            <Badge className="bg-white/80 dark:bg-gray-800/50 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700 px-3 py-1 text-sm">
              <BarChart3 className="h-3.5 w-3.5 mr-1.5" />
              Detailed Reports
            </Badge>
            <Badge className="bg-white/80 dark:bg-gray-800/50 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700 px-3 py-1 text-sm">
              <FileCode className="h-3.5 w-3.5 mr-1.5" />
              Code Analysis
            </Badge>
            <Badge className="bg-white/80 dark:bg-gray-800/50 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700 px-3 py-1 text-sm">
              <Globe className="h-3.5 w-3.5 mr-1.5" />
              Any Website
            </Badge>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card className="border-t-4 border-t-green-500 hover:shadow-lg transition-shadow duration-200 bg-white dark:bg-gray-800/50">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 p-3 rounded-xl mb-4">
                <CheckSquare className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-heading font-bold text-gray-900 dark:text-white text-lg mb-2">Quick Assessment</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get immediate insights on how well your website meets accessibility standards 
                with our automated testing tool.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-t-4 border-t-amber-500 hover:shadow-lg transition-shadow duration-200 bg-white dark:bg-gray-800/50">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900/30 dark:to-amber-800/30 p-3 rounded-xl mb-4">
                <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="font-heading font-bold text-gray-900 dark:text-white text-lg mb-2">Identify Issues</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Discover potential accessibility barriers that might prevent users with 
                disabilities from accessing your content.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-t-4 border-t-blue-500 hover:shadow-lg transition-shadow duration-200 bg-white dark:bg-gray-800/50">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 p-3 rounded-xl mb-4">
                <Lightbulb className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-heading font-bold text-gray-900 dark:text-white text-lg mb-2">Get Solutions</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Receive actionable recommendations on how to fix detected accessibility 
                issues and improve your website's compliance.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Separator className="my-6" />
      
      <Alert variant="default" className="bg-blue-50 border-blue-100 text-blue-700 dark:bg-blue-950/50 dark:border-blue-800/60 dark:text-blue-300 shadow-sm overflow-hidden">
        <div className="flex items-start">
          <InfoIcon className="h-5 w-5 mt-0.5" />
          <div className="flex-1 ml-3">
            <div className="flex justify-between items-center">
              <AlertTitle 
                className="text-blue-800 dark:text-blue-300 font-medium"
                tabIndex={0}
                id="about-tool-title"
              >
                About This Tool
              </AlertTitle>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsToolInfoExpanded(!isToolInfoExpanded)}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:bg-blue-100/50 dark:hover:bg-blue-900/30
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 -mr-2"
                aria-expanded={isToolInfoExpanded}
                aria-controls="tool-info-content"
                tabIndex={0}
              >
                {isToolInfoExpanded ? 
                  <ChevronUp className="h-5 w-5" /> : 
                  <ChevronDown className="h-5 w-5" />
                }
                <span className="sr-only">{isToolInfoExpanded ? "Collapse" : "Expand"} tool information</span>
              </Button>
            </div>
            
            <AlertDescription className="text-blue-700/90 dark:text-blue-300/90">
              <div className={isToolInfoExpanded ? "mt-2" : ""}>
                <p className="mb-2">
                  This tool analyzes websites against 27 WCAG 2.2 success criteria, including all of the new criteria 
                  introduced in the latest standard, organized by the four WCAG principles: Perceivable, Operable, 
                  Understandable, and Robust.
                </p>
                
                {isToolInfoExpanded && (
                  <div id="tool-info-content">
                    <p className="font-medium mt-4 mb-2">Key WCAG 2.2 Success Criteria Covered:</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                      <div>
                        <h4 className="text-sm font-semibold mb-1 text-blue-800 dark:text-blue-300">Perceivable</h4>
                        <ul className="list-disc pl-5 mb-3 space-y-1 text-sm">
                          <li>Non-text Content</li>
                          <li>Audio/Video Media</li>
                          <li>Information Relationships</li>
                          <li>Use of Color</li>
                          <li>Contrast (Minimum)</li>
                          <li>Resize Text</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-semibold mb-1 text-blue-800 dark:text-blue-300">Operable</h4>
                        <ul className="list-disc pl-5 mb-3 space-y-1 text-sm">
                          <li>Keyboard Accessibility</li>
                          <li>Timing Adjustable</li>
                          <li>Three Flashes</li>
                          <li>Bypass Blocks</li>
                          <li>Page Titled</li>
                          <li>Focus Order</li>
                          <li>Link Purpose</li>
                          <li>Focus Visible</li>
                          <li>Focus Not Obscured (Min & Enhanced)</li>
                          <li>Focus Appearance</li>
                          <li>Dragging Movements</li>
                          <li>Target Size (Minimum)</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-semibold mb-1 text-blue-800 dark:text-blue-300">Understandable</h4>
                        <ul className="list-disc pl-5 mb-3 space-y-1 text-sm">
                          <li>Language of Page</li>
                          <li>On Focus</li>
                          <li>Error Identification</li>
                          <li>Input Purpose</li>
                          <li>Consistent Help</li>
                          <li>Redundant Entry</li>
                          <li>Accessible Authentication (Min & Enhanced)</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-semibold mb-1 text-blue-800 dark:text-blue-300">Robust</h4>
                        <ul className="list-disc pl-5 mb-3 space-y-1 text-sm">
                          <li>Name, Role, Value</li>
                        </ul>
                        
                        <p className="text-sm mt-4 italic">
                          For comprehensive accessibility compliance, we recommend combining 
                          these automated checks with manual testing involving users with disabilities.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {!isToolInfoExpanded && (
                  <Button 
                    variant="link" 
                    onClick={() => setIsToolInfoExpanded(true)}
                    className="text-blue-600 dark:text-blue-400 p-0 h-auto font-normal text-sm hover:no-underline
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded-sm"
                    tabIndex={0}
                    aria-controls="tool-info-content"
                    aria-expanded="false"
                  >
                    Show all 27 criteria
                    <ChevronDown className="h-3.5 w-3.5 ml-1 inline" />
                  </Button>
                )}
              </div>
            </AlertDescription>
          </div>
        </div>
      </Alert>
    </section>
  );
}
