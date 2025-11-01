import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "wouter";
import { Home, ScrollText, ChevronRight } from "lucide-react";

export default function PrivacyPolicy() {
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
            <BreadcrumbLink>Privacy Policy</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <ScrollText className="h-6 w-6 text-blue-500" />
            <CardTitle>Privacy Policy</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <h2>Introduction</h2>
          <p>
            This Privacy Policy explains how the WCAG Accessibility Analyzer ("we", "us", "our") collects, uses, and protects your information when you use our website accessibility evaluation tool.
          </p>

          <h2>Information We Collect</h2>
          <p>
            When you use our tool to analyze websites, we temporarily process the URLs you submit for analysis purposes. We do not permanently store the URLs you analyze or any content from those websites unless explicitly requested for debugging purposes.
          </p>

          <h3>Technical Information</h3>
          <p>
            We may collect technical information such as:
          </p>
          <ul>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>IP address (anonymized)</li>
            <li>Time and date of your visit</li>
            <li>Pages you visit on our website</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>
            We use the information we collect to:
          </p>
          <ul>
            <li>Provide and maintain our accessibility analysis service</li>
            <li>Improve our tool and user experience</li>
            <li>Monitor usage patterns to optimize performance</li>
            <li>Detect and prevent technical issues</li>
          </ul>

          <h2>Data Security</h2>
          <p>
            We implement appropriate security measures to protect your information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2>Third-Party Services</h2>
          <p>
            Our tool may use third-party hosting services and analytics providers. These services have their own privacy policies that govern how they use your information.
          </p>

          <h2>Your Rights</h2>
          <p>
            Depending on your location, you may have rights regarding your personal information, including:
          </p>
          <ul>
            <li>The right to access information we hold about you</li>
            <li>The right to request correction of inaccurate information</li>
            <li>The right to request deletion of your information</li>
            <li>The right to object to processing of your information</li>
          </ul>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on this page.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us through our GitHub repository or the provided contact information.
          </p>

          <p className="text-sm text-gray-500">Last updated: April 2025</p>
        </CardContent>
      </Card>
    </div>
  );
}