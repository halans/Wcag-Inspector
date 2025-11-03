import { render, screen, within } from "@testing-library/react";
import { act } from "react";
import userEvent from "@testing-library/user-event";
import ResultsSection from "../ResultsSection";
import { anchorIdForCriterion } from "../CriterionCard";
import type { AnalysisResponse } from "@shared";

const sampleAnalysis = (): AnalysisResponse => ({
  url: "https://example.com",
  timestamp: new Date().toISOString(),
  overallScore: 80,
  passedCriteria: 2,
  totalCriteria: 3,
  summary: "Sample summary",
  tags: [
    { name: "Focus", isPassed: true },
    { name: "Contrast", isPassed: false },
  ],
  results: [
    {
      criterionId: "2.4.11",
      name: "Focus Not Obscured (Minimum)",
      level: "AA",
      description: "Ensure focused elements are visible.",
      passed: true,
      findings: "No issues detected.",
      elements: [
        {
          element: "button.primary",
          isPassed: true,
        },
      ],
      principle: "Operable",
    },
    {
      criterionId: "2.4.12",
      name: "Focus Not Obscured (Enhanced)",
      level: "AAA",
      description: "Enhanced focus visibility.",
      passed: false,
      findings: "Focus indicator is partially hidden.",
      elements: [
        {
          element: "a[href='#details']",
          isPassed: false,
          issue: "Focus ring clipped by overlay",
        },
      ],
      principle: "Operable",
    },
    {
      criterionId: "1.1.1",
      name: "Non-text Content",
      level: "A",
      description: "Images have alt text.",
      passed: true,
      findings: "All images contain descriptive alt text.",
      elements: [
        {
          element: "img.hero",
          isPassed: true,
        },
      ],
      principle: "Perceivable",
    },
  ],
});

beforeAll(() => {
  Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
    value: vi.fn(),
    configurable: true,
  });
});

describe("ResultsSection interactions", () => {
  it("expands the matching card when using View details", async () => {
    const user = userEvent.setup();
    const analysis = sampleAnalysis();

    render(
      <ResultsSection
        results={analysis}
        isLoading={false}
        isError={false}
      />,
    );

    const summaryHeading = screen.getByRole("heading", {
      name: /wcag 2\.2 success criteria/i,
    });
    const summarySection = summaryHeading.closest("div");
    expect(summarySection).toBeTruthy();
    const detailButtons = within(summarySection as HTMLElement).getAllByRole(
      "button",
      { name: /view details/i },
    );
    expect(detailButtons.length).toBeGreaterThanOrEqual(2);

    const firstCard = document.getElementById(
      anchorIdForCriterion("2.4.11"),
    ) as HTMLElement | null;
    const secondCard = document.getElementById(
      anchorIdForCriterion("2.4.12"),
    ) as HTMLElement | null;

    expect(firstCard).toBeInstanceOf(HTMLElement);
    expect(secondCard).toBeInstanceOf(HTMLElement);
    expect(firstCard).toHaveAttribute("aria-expanded", "false");
    expect(secondCard).toHaveAttribute("aria-expanded", "false");

    await act(async () => {
      await user.click(detailButtons[0]);
    });
    expect(firstCard).toHaveAttribute("aria-expanded", "true");
    expect(secondCard).toHaveAttribute("aria-expanded", "false");

    await act(async () => {
      await user.click(detailButtons[1]);
    });
    expect(firstCard).toHaveAttribute("aria-expanded", "false");
    expect(secondCard).toHaveAttribute("aria-expanded", "true");
  });
});
