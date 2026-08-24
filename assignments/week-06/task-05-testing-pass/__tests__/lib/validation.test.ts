import { describe, it, expect } from "vitest";
import { validateContactForm, hasErrors } from "@/lib/validation";
import type { ContactFormData } from "@/lib/types";

describe("validateContactForm", () => {
  const validData: ContactFormData = {
    name: "John Doe",
    email: "john@example.com",
    subject: "Project Inquiry",
    message: "Hello, I would like to discuss a project.",
  };

  it("returns no errors for valid data", () => {
    const errors = validateContactForm(validData);
    expect(hasErrors(errors)).toBe(false);
  });

  it("returns error when name is empty", () => {
    const errors = validateContactForm({ ...validData, name: "" });
    expect(errors.name).toBe("Name is required");
  });

  it("returns error when name is too short", () => {
    const errors = validateContactForm({ ...validData, name: "A" });
    expect(errors.name).toBe("Name must be at least 2 characters");
  });

  it("returns error when email is empty", () => {
    const errors = validateContactForm({ ...validData, email: "" });
    expect(errors.email).toBe("Email is required");
  });

  it("returns error when email is invalid", () => {
    const errors = validateContactForm({ ...validData, email: "not-an-email" });
    expect(errors.email).toBe("Please enter a valid email address");
  });

  it("returns error when subject is empty", () => {
    const errors = validateContactForm({ ...validData, subject: "" });
    expect(errors.subject).toBe("Subject is required");
  });

  it("returns error when subject is too short", () => {
    const errors = validateContactForm({ ...validData, subject: "AB" });
    expect(errors.subject).toBe("Subject must be at least 3 characters");
  });

  it("returns error when message is empty", () => {
    const errors = validateContactForm({ ...validData, message: "" });
    expect(errors.message).toBe("Message is required");
  });

  it("returns error when message is too short", () => {
    const errors = validateContactForm({ ...validData, message: "Short" });
    expect(errors.message).toBe("Message must be at least 10 characters");
  });

  it("returns multiple errors for completely empty data", () => {
    const emptyData: ContactFormData = {
      name: "",
      email: "",
      subject: "",
      message: "",
    };
    const errors = validateContactForm(emptyData);
    expect(hasErrors(errors)).toBe(true);
    expect(errors.name).toBeDefined();
    expect(errors.email).toBeDefined();
    expect(errors.subject).toBeDefined();
    expect(errors.message).toBeDefined();
  });

  it("trims whitespace before validating", () => {
    const errors = validateContactForm({
      ...validData,
      name: "   ",
      email: "   ",
    });
    expect(errors.name).toBe("Name is required");
    expect(errors.email).toBe("Email is required");
  });
});

describe("hasErrors", () => {
  it("returns false for empty object", () => {
    expect(hasErrors({})).toBe(false);
  });

  it("returns true when errors exist", () => {
    expect(hasErrors({ name: "Required" })).toBe(true);
  });
});
