import { Book, Code, BugIcon, HeartHandshake, AccessibilityIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer role="contentinfo" aria-label="Site footer" className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border-t border-gray-200 dark:border-gray-700 mt-8 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2 mb-3">
            <AccessibilityIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <span className="text-xl font-heading font-bold text-gray-900 dark:text-white">
              WCAG 2.2 Accessibility Analyzer
            </span>
          </div>
          <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl text-sm">
            Our mission is to help make the web more accessible for everyone. This tool analyzes websites against WCAG 2.2 guidelines and provides actionable recommendations for improvement.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-4">
          <div className="space-y-3">
            <h3 className="text-sm font-heading font-bold text-gray-900 dark:text-white uppercase tracking-wider">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://www.w3.org/WAI/standards-guidelines/wcag/" 
                  className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors text-sm flex items-center
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded-sm"
                  tabIndex={0}
                >
                  <Book className="h-4 w-4 mr-2" />
                  WCAG 2.2 Documentation
                </a>
              </li>
              <li>
                <a 
                  href="https://www.w3.org/WAI/WCAG22/quickref/" 
                  className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors text-sm flex items-center
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded-sm"
                  tabIndex={0}
                >
                  <Code className="h-4 w-4 mr-2" />
                  How to Meet WCAG
                </a>
              </li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-sm font-heading font-bold text-gray-900 dark:text-white uppercase tracking-wider">Get Involved</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://github.com/halans/wcag-inspector" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors text-sm flex items-center
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded-sm"
                  tabIndex={0}
                >
                  <HeartHandshake className="h-4 w-4 mr-2" />
                  Contribute to Project
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/halans/wcag-inspector/issues/new" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors text-sm flex items-center
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded-sm"
                  tabIndex={0}
                >
                  <BugIcon className="h-4 w-4 mr-2" />
                  Report an Issue
                </a>
              </li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-sm font-heading font-bold text-gray-900 dark:text-white uppercase tracking-wider">About</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              This tool is provided for educational purposes to help developers and content creators understand and implement accessibility best practices following modern web development principles.
            </p>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} WCAG 2.2 Accessibility Analyzer. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a 
              href="/privacy-policy" 
              className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded-sm px-1"
              tabIndex={0}
            >
              Privacy Policy
            </a>
            <a 
              href="/terms-of-service" 
              className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded-sm px-1"
              tabIndex={0}
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
