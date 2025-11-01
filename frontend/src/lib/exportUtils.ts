import { jsPDF } from 'jspdf';
import { saveAs } from 'file-saver';
import { AnalysisResponse, CriterionResult } from '@shared/schema';

/**
 * Export analysis results to PDF with simple formatting
 */
export function exportToPdf(data: AnalysisResponse): void {
  // Use default settings for PDF creation
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - (margin * 2);
  
  let currentY = 20;
  
  // Title
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('WCAG Accessibility Analysis Report', pageWidth / 2, currentY, { align: 'center' });
  currentY += 10;
  
  // URL and date
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`Website: ${data.url}`, margin, currentY);
  currentY += 7;
  doc.text(`Date: ${new Date().toLocaleDateString()}`, margin, currentY);
  currentY += 15;
  
  // Overall Score
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Overall Compliance Score', margin, currentY);
  currentY += 10;
  
  const scorePercentage = Math.round((data.passedCriteria / data.totalCriteria) * 100);
  
  // Score information
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`${data.passedCriteria} of ${data.totalCriteria} criteria passed (${scorePercentage}%)`, margin, currentY);
  currentY += 7;
  
  // Status
  const statusText = scorePercentage >= 75 ? 'Good' : (scorePercentage >= 50 ? 'Needs Improvement' : 'Poor');
  doc.text(`Status: ${statusText}`, margin, currentY);
  currentY += 15;
  
  // Summary
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Summary', margin, currentY);
  currentY += 7;
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const summaryLines = doc.splitTextToSize(data.summary, contentWidth);
  doc.text(summaryLines, margin, currentY);
  currentY += (summaryLines.length * 5) + 10;
  
  // WCAG Principles summary
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Compliance by WCAG Principle', margin, currentY);
  currentY += 10;
  
  const principles = [
    { name: 'Perceivable', results: data.results.filter(r => r.principle === 'Perceivable') },
    { name: 'Operable', results: data.results.filter(r => r.principle === 'Operable') },
    { name: 'Understandable', results: data.results.filter(r => r.principle === 'Understandable') },
    { name: 'Robust', results: data.results.filter(r => r.principle === 'Robust') }
  ];
  
  for (const principle of principles) {
    const passedCount = principle.results.filter(r => r.passed).length;
    const principlePercentage = Math.round((passedCount / principle.results.length) * 100);
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`${principle.name}:`, margin, currentY);
    
    doc.setFont('helvetica', 'normal');
    doc.text(`${principlePercentage}% (${passedCount} of ${principle.results.length} passed)`, margin + 35, currentY);
    
    currentY += 7;
  }
  
  currentY += 10;
  
  // Detailed Results
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Detailed Results', margin, currentY);
  currentY += 10;
  
  // Add each criterion
  let pageCount = 1;
  
  for (const result of data.results) {
    // Check if we need a new page
    if (currentY > pageHeight - 40) {
      // Add footer to current page
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      doc.text(`Generated with WCAG Inspector - Page ${pageCount}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
      doc.setTextColor(0, 0, 0);
      
      doc.addPage();
      pageCount++;
      currentY = 20;
    }
    
    // Criterion ID and name
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`${result.criterionId} - ${result.name}`, margin, currentY);
    currentY += 6;
    
    // WCAG level and status
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const statusText = result.passed ? 'Passed' : 'Failed';
    doc.text(`Level ${result.level} | ${result.principle} | ${statusText}`, margin, currentY);
    currentY += 6;
    
    // Description
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    const descLines = doc.splitTextToSize(result.description, contentWidth);
    doc.text(descLines, margin, currentY);
    currentY += (descLines.length * 4) + 4;
    
    // Findings
    doc.setFont('helvetica', 'normal');
    const findingsLines = doc.splitTextToSize(`Findings: ${result.findings}`, contentWidth);
    doc.text(findingsLines, margin, currentY);
    currentY += (findingsLines.length * 4) + 4;
    
    // How to fix (if failed)
    if (!result.passed && result.howToFix) {
      const fixLines = doc.splitTextToSize(`How to fix: ${result.howToFix}`, contentWidth);
      doc.text(fixLines, margin, currentY);
      currentY += (fixLines.length * 4) + 4;
    }
    
    // Add a separator line
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, currentY, pageWidth - margin, currentY);
    doc.setDrawColor(0, 0, 0);
    currentY += 8;
  }
  
  // Add footer to last page
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text(`Generated with WCAG Inspector - Page ${pageCount}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
  doc.setTextColor(0, 0, 0);
  
  // Save the PDF
  doc.save(`accessibility-report-${new Date().toISOString().split('T')[0]}.pdf`);
}

/**
 * Export analysis results to CSV
 */
export function exportToCsv(data: AnalysisResponse): void {
  // Create CSV headers
  let csv = 'Criterion ID,Name,Level,Principle,Status,Findings\n';
  
  // Add each result as a row
  for (const result of data.results) {
    // Escape quotes in text fields
    const escapedFindings = result.findings.replace(/"/g, '""');
    
    // Add row
    csv += `${result.criterionId},"${result.name}",${result.level},${result.principle},${result.passed ? 'Passed' : 'Failed'},"${escapedFindings}"\n`;
  }
  
  // Create a blob and download
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  saveAs(blob, `accessibility-report-${new Date().toISOString().split('T')[0]}.csv`);
}