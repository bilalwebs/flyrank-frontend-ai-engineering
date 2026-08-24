import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FormStatusMessage } from "@/components/contact/FormStatus";

describe("FormStatusMessage", () => {
  it("renders nothing when status is idle", () => {
    const { container } = render(
      <FormStatusMessage status="idle" onDismiss={() => {}} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders nothing when status is submitting", () => {
    const { container } = render(
      <FormStatusMessage status="submitting" onDismiss={() => {}} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("shows success message when status is success", () => {
    render(<FormStatusMessage status="success" onDismiss={() => {}} />);
    expect(screen.getByText("Message sent successfully!")).toBeInTheDocument();
    expect(screen.getByText(/thank you for reaching out/i)).toBeInTheDocument();
  });

  it("shows error message when status is error", () => {
    render(<FormStatusMessage status="error" onDismiss={() => {}} />);
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(screen.getByText(/please try again later/i)).toBeInTheDocument();
  });

  it("calls onDismiss when dismiss button is clicked", async () => {
    const onDismiss = vi.fn();
    render(<FormStatusMessage status="success" onDismiss={onDismiss} />);

    const dismissButton = screen.getByRole("button", { name: /dismiss message/i });
    dismissButton.click();

    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("has role=alert for screen readers", () => {
    render(<FormStatusMessage status="success" onDismiss={() => {}} />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });
});
