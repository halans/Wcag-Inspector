import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "wouter";
import { Home, FileText, ChevronRight } from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">
                <Home className="h-4 w-4 mr-1" />
                Home
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="h-4 w-4" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink>Terms of Service</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-blue-500" />
            <CardTitle>Terms of Service</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <h2>Agreement to Terms</h2>
          <p>
            By accessing or using the WCAG Accessibility Analyzer ("the Service"), you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access the Service.
          </p>

          <h2>Description of Service</h2>
          <p>
            The WCAG Accessibility Analyzer is a tool that evaluates websites against Web Content Accessibility Guidelines (WCAG) 2.2 standards to help identify potential accessibility issues. The Service is provided "as is" and "as available" for both personal and commercial use.
          </p>

          <h2>Disclaimer of Warranties</h2>
          <p>
            The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement, or course of performance.
          </p>

          <p>
            We do not warrant that:
          </p>
          <ul>
            <li>The Service will function uninterrupted, secure, or available at any particular time or location</li>
            <li>Any errors or defects will be corrected</li>
            <li>The Service is free of viruses or other harmful components</li>
            <li>The results of using the Service will meet your requirements</li>
          </ul>

          <h2>Limitation of Liability</h2>
          <p>
            In no event shall the WCAG Accessibility Analyzer, its developers, or contributors be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
          </p>
          <ul>
            <li>Your access to or use of or inability to access or use the Service</li>
            <li>Any conduct or content of any third party on the Service</li>
            <li>Any content obtained from the Service</li>
            <li>Unauthorized access, use, or alteration of your transmissions or content</li>
          </ul>

          <h2>Use of Results</h2>
          <p>
            The accessibility analysis provided by the Service is for informational purposes only and should not be considered a comprehensive accessibility audit. We make no guarantee about the accuracy or completeness of the analysis. Users should conduct additional testing with real users and specialized accessibility tools for a comprehensive evaluation.
          </p>

          <h2>User Obligations</h2>
          <p>
            When using the Service, you agree not to:
          </p>
          <ul>
            <li>Use the Service in any way that violates any applicable laws or regulations</li>
            <li>Use the Service to analyze websites you do not own or have permission to analyze</li>
            <li>Attempt to interfere with, compromise the system integrity or security, or decipher any transmissions to or from the servers running the Service</li>
            <li>Impose an unreasonable or disproportionately large load on our infrastructure</li>
            <li>Upload or transmit viruses, malware, or other types of malicious software</li>
          </ul>

          <h2>Modifications to Service</h2>
          <p>
            We reserve the right to modify or discontinue, temporarily or permanently, the Service (or any part thereof) with or without notice. We shall not be liable to you or to any third party for any modification, suspension, or discontinuance of the Service.
          </p>

          <h2>Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms of Service at any time. We will provide notice of significant changes by posting the new Terms on this page.
          </p>

          <h2>Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws applicable to the jurisdiction where the Service is hosted, without regard to its conflict of law provisions.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us through our GitHub repository or the provided contact information.
          </p>

          <p className="text-sm text-gray-500">Last updated: April 2025</p>
        </CardContent>
      </Card>
    </div>
  );
}