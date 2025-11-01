import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AppErrorBoundary } from "../AppErrorBoundary";

function ProblemChild(): JSX.Element {
  throw new Error("boom");
}

describe("AppErrorBoundary", () => {
  it("renders an accessible fallback when children throw", () => {
    render(
      <AppErrorBoundary>
        <ProblemChild />
      </AppErrorBoundary>,
    );

    expect(screen.getByRole("heading", { name: /something went wrong/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /try again/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /reload page/i })).toBeInTheDocument();
  });
});
