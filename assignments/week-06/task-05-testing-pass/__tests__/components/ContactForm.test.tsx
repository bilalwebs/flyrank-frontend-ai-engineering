import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "@/components/contact/ContactForm";

const mockFetch = vi.fn();
global.fetch = mockFetch;

beforeEach(() => {
  vi.clearAllMocks();
  mockFetch.mockResolvedValue({ ok: true });
});

function renderContactForm() {
  return render(<ContactForm />);
}

describe("ContactForm", () => {
  it("renders all form fields", () => {
    renderContactForm();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it("renders the submit button", () => {
    renderContactForm();
    expect(screen.getByRole("button", { name: /send message/i })).toBeInTheDocument();
  });

  it("shows validation error when submitting empty form", async () => {
    const user = userEvent.setup();
    renderContactForm();

    await user.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText("Name is required")).toBeInTheDocument();
      expect(screen.getByText("Email is required")).toBeInTheDocument();
      expect(screen.getByText("Subject is required")).toBeInTheDocument();
      expect(screen.getByText("Message is required")).toBeInTheDocument();
    });
  });

  it("shows validation error for invalid email", async () => {
    const user = userEvent.setup();
    renderContactForm();

    await user.type(screen.getByLabelText(/name/i), "John Doe");
    await user.type(screen.getByLabelText(/email/i), "invalid-email");
    await user.type(screen.getByLabelText(/subject/i), "Project Inquiry");
    await user.type(screen.getByLabelText(/message/i), "Hello, I would like to discuss a project.");

    await user.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText("Please enter a valid email address")).toBeInTheDocument();
    });
  });

  it("shows validation error for short message", async () => {
    const user = userEvent.setup();
    renderContactForm();

    await user.type(screen.getByLabelText(/name/i), "John Doe");
    await user.type(screen.getByLabelText(/email/i), "john@example.com");
    await user.type(screen.getByLabelText(/subject/i), "Project Inquiry");
    await user.type(screen.getByLabelText(/message/i), "Short");

    await user.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText("Message must be at least 10 characters")).toBeInTheDocument();
    });
  });

  it("submits form with valid data and shows success", async () => {
    const user = userEvent.setup();
    renderContactForm();

    await user.type(screen.getByLabelText(/name/i), "John Doe");
    await user.type(screen.getByLabelText(/email/i), "john@example.com");
    await user.type(screen.getByLabelText(/subject/i), "Project Inquiry");
    await user.type(screen.getByLabelText(/message/i), "Hello, I would like to discuss a project.");

    await user.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        "/",
        expect.objectContaining({
          method: "POST",
        })
      );
    });

    await waitFor(() => {
      expect(screen.getByText("Message sent successfully!")).toBeInTheDocument();
    });
  });

  it("shows error message when submission fails", async () => {
    mockFetch.mockResolvedValue({ ok: false });
    const user = userEvent.setup();
    renderContactForm();

    await user.type(screen.getByLabelText(/name/i), "John Doe");
    await user.type(screen.getByLabelText(/email/i), "john@example.com");
    await user.type(screen.getByLabelText(/subject/i), "Project Inquiry");
    await user.type(screen.getByLabelText(/message/i), "Hello, I would like to discuss a project.");

    await user.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    });
  });

  it("shows loading state while submitting", async () => {
    mockFetch.mockImplementation(() => new Promise(() => {}));
    const user = userEvent.setup();
    renderContactForm();

    await user.type(screen.getByLabelText(/name/i), "John Doe");
    await user.type(screen.getByLabelText(/email/i), "john@example.com");
    await user.type(screen.getByLabelText(/subject/i), "Project Inquiry");
    await user.type(screen.getByLabelText(/message/i), "Hello, I would like to discuss a project.");

    await user.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText("Sending...")).toBeInTheDocument();
    });
  });

  it("clears field error when user starts typing", async () => {
    const user = userEvent.setup();
    renderContactForm();

    await user.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText("Name is required")).toBeInTheDocument();
    });

    await user.type(screen.getByLabelText(/name/i), "J");

    await waitFor(() => {
      expect(screen.queryByText("Name is required")).not.toBeInTheDocument();
    });
  });
});
