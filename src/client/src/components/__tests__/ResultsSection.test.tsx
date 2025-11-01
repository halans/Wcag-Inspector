import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import ResultsSection from "../ResultsSection";

describe("ResultsSection error handling", () => {
  it("displays actionable guidance for fetch timeouts", async () => {
    const retry = vi.fn();

    render(
      <ResultsSection
        isLoading={false}
        isError
        errorCode="FETCH_TIMEOUT"
        errorMessage="The target site did not respond within 10 seconds."
        onRetry={retry}
      />,
    );

    expect(
      screen.getByRole("heading", {
        name: /the target site took too long to respond/i,
      }),
    ).toBeInTheDocument();

    const retryButton = screen.getByRole("button", { name: /retry analysis/i });
    await userEvent.click(retryButton);
    expect(retry).toHaveBeenCalledTimes(1);

    expect(
      screen.getByText(/heavy pages or rate limiting can cause this/i),
    ).toBeInTheDocument();
  });
});
