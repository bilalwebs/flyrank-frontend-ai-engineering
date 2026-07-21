
# FE-03 Round 2

## Prompt

```text
You are a senior Frontend Engineer specializing in React, Next.js, TypeScript, Tailwind CSS, React Hook Form, and Zod.

I am building a production-quality portfolio website for my FlyRank Frontend AI Engineering Internship.

Your task is to create a reusable SettingsForm component.

Project Context:
- Framework: Next.js (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- Form Library: React Hook Form
- Validation: Zod
- Goal: Build a clean, reusable, accessible, and production-ready settings form.

File Location:
components/forms/SettingsForm.tsx

Requirements:
- Use TypeScript.
- Use React Hook Form for form state management.
- Use Zod for validation.
- Use Tailwind CSS only (no inline styles).
- Make the component reusable.
- Use controlled form inputs.
- Display validation error messages.
- Include the following fields:
  - Full Name (required)
  - Email (required, valid email)
  - Theme (Light/Dark select)
  - Enable Notifications (checkbox)
- Add a Save Settings button.
- Disable the submit button while submitting.
- Use semantic HTML.
- Ensure keyboard accessibility.
- Add appropriate labels for every field.
- Add aria attributes where appropriate.

Expected Behavior:
- Empty required fields should display validation errors.
- Invalid email addresses should display an error.
- Valid submissions should log the form data.
- The form should remain responsive on mobile and desktop.

Constraints:
- Do not use JavaScript.
- Do not use inline CSS.
- Do not use class components.
- Do not use external UI libraries such as Material UI or Bootstrap.
- Follow clean code principles.
- Keep the component easy to maintain.

Before writing the code:

1. Analyze the requirements.
2. Explain the component structure.
3. Explain the TypeScript interfaces.
4. Explain the validation schema.
5. Identify edge cases.
6. Explain accessibility considerations.

After the analysis, generate the final solution using this structure:

1. Component Purpose
2. File Location
3. Folder Structure
4. Required Dependencies
5. Validation Schema
6. Complete TypeScript Code
7. Usage Example
8. Accessibility Notes
9. Best Practices
10. Suggested Improvements

Verification Step:

After generating the code:

- Review the code for correctness.
- Check that all requirements have been implemented.
- Identify any possible bugs.
- Write example test cases that should be used to verify the component.
- Confirm whether the component is production-ready.
```

## AI Output

# Analysis

## 1. Requirements Analysis

The component needs to be a **controlled, reusable settings form** with four fields (name, email, theme, notifications), Zod validation, React Hook Form state management, and full accessibility support. Since it's meant to be reusable, I'll design it to accept `defaultValues` and an `onSubmit` callback as props, rather than hardcoding behavior.

## 2. Component Structure

- A single `SettingsForm` component exported as a named export.
- Internal `zodResolver`-backed `useForm` hook.
- Each field wrapped in a `<div>` with a `<label>`, the input/select/checkbox, and a conditionally rendered error `<p>`.
- Submit button disabled during `isSubmitting`.
- Props allow parent components to supply initial values and a submit handler — this is what makes it reusable across different pages (e.g., "Account Settings," "Admin Settings").

## 3. TypeScript Interfaces

- `SettingsFormValues` — inferred directly from the Zod schema using `z.infer<>`, so validation and types never drift apart.
- `SettingsFormProps` — defines `defaultValues` (optional, partial) and `onSubmit` (required callback receiving validated data).

## 4. Validation Schema (Zod)

- `fullName`: `string().trim().min(1, "Full name is required")`
- `email`: `string().trim().min(1, "Email is required").email("Invalid email address")`
- `theme`: `enum(["light", "dark"])`
- `notifications`: `boolean()`

Chaining `.min(1)` before `.email()` ensures an empty field shows "required" rather than "invalid email," which is better UX.

## 5. Edge Cases

- Empty required fields → show "required" error, not silently fail.
- Whitespace-only name (`"   "`) → trimmed, caught by `.min(1)`.
- Malformed email (`"abc@"`) → caught by `.email()`.
- Rapid double-submit → prevented via `disabled={isSubmitting}`.
- Re-render on prop change (`defaultValues`) → handled with `reset()` in a `useEffect`.
- Select must always have a valid enum value — no empty "please select" option that would violate the `enum` type.

## 6. Accessibility Considerations

- Every input has a linked `<label htmlFor>`.
- Errors use `role="alert"` + `aria-live="polite"` so screen readers announce them immediately.
- Invalid fields get `aria-invalid="true"` and `aria-describedby` pointing to their error message id.
- Checkbox and select are natively keyboard-operable (no custom widgets).
- Submit button has `aria-busy` while submitting.

---

# Final Solution

## 1. Component Purpose

A reusable, accessible settings form for capturing user profile/display preferences, suitable for dashboards, onboarding flows, or admin panels.

## 2. File Location

`components/forms/SettingsForm.tsx`

## 3. Folder Structure

```
components/
  forms/
    SettingsForm.tsx
lib/
  validation/
    settingsSchema.ts
app/
  settings/
    page.tsx
```

(Schema is separated into `lib/validation` for reusability/testability, then imported into the component.)

## 4. Required Dependencies

```bash
npm install react-hook-form zod @hookform/resolvers
```

## 5. Validation Schema

**`lib/validation/settingsSchema.ts`**

```ts
import { z } from "zod";

export const settingsSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Full name is required")
    .max(80, "Full name must be under 80 characters"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  theme: z.enum(["light", "dark"], {
    required_error: "Please select a theme",
  }),
  notifications: z.boolean(),
});

export type SettingsFormValues = z.infer<typeof settingsSchema>;
```

## 6. Complete TypeScript Code

**`components/forms/SettingsForm.tsx`**

```tsx
"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  settingsSchema,
  type SettingsFormValues,
} from "@/lib/validation/settingsSchema";

interface SettingsFormProps {
  /** Optional initial values, useful when editing existing settings */
  defaultValues?: Partial<SettingsFormValues>;
  /** Called with validated data on successful submit */
  onSubmit: (data: SettingsFormValues) => void | Promise<void>;
}

const DEFAULT_VALUES: SettingsFormValues = {
  fullName: "",
  email: "",
  theme: "light",
  notifications: false,
};

export function SettingsForm({ defaultValues, onSubmit }: SettingsFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: { ...DEFAULT_VALUES, ...defaultValues },
    mode: "onBlur",
  });

  // Keep form in sync if defaultValues change after initial mount
  useEffect(() => {
    if (defaultValues) {
      reset({ ...DEFAULT_VALUES, ...defaultValues });
    }
  }, [defaultValues, reset]);

  const submitHandler = handleSubmit(async (data) => {
    // eslint-disable-next-line no-console
    console.log("Settings submitted:", data);
    await onSubmit(data);
  });

  return (
    <form
      onSubmit={submitHandler}
      noValidate
      className="mx-auto w-full max-w-md space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
      aria-label="Settings form"
    >
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Account Settings
      </h2>

      {/* Full Name */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="fullName"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Full Name
        </label>
        <input
          id="fullName"
          type="text"
          autoComplete="name"
          aria-invalid={errors.fullName ? "true" : "false"}
          aria-describedby={errors.fullName ? "fullName-error" : undefined}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          {...register("fullName")}
        />
        {errors.fullName && (
          <p
            id="fullName-error"
            role="alert"
            aria-live="polite"
            className="text-sm text-red-600 dark:text-red-400"
          >
            {errors.fullName.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="email"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          aria-invalid={errors.email ? "true" : "false"}
          aria-describedby={errors.email ? "email-error" : undefined}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          {...register("email")}
        />
        {errors.email && (
          <p
            id="email-error"
            role="alert"
            aria-live="polite"
            className="text-sm text-red-600 dark:text-red-400"
          >
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Theme */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="theme"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Theme
        </label>
        <select
          id="theme"
          aria-invalid={errors.theme ? "true" : "false"}
          aria-describedby={errors.theme ? "theme-error" : undefined}
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          {...register("theme")}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
        {errors.theme && (
          <p
            id="theme-error"
            role="alert"
            aria-live="polite"
            className="text-sm text-red-600 dark:text-red-400"
          >
            {errors.theme.message}
          </p>
        )}
      </div>

      {/* Notifications */}
      <div className="flex items-center gap-2">
        <input
          id="notifications"
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-700"
          {...register("notifications")}
        />
        <label
          htmlFor="notifications"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Enable Notifications
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
        className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Saving..." : "Save Settings"}
      </button>
    </form>
  );
}
```

## 7. Usage Example

**`app/settings/page.tsx`**

```tsx
import { SettingsForm } from "@/components/forms/SettingsForm";
import type { SettingsFormValues } from "@/lib/validation/settingsSchema";

export default function SettingsPage() {
  const handleSave = async (data: SettingsFormValues) => {
    "use server"; // omit if using a client-side handler instead
    // e.g. await fetch("/api/settings", { method: "POST", body: JSON.stringify(data) });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10 dark:bg-gray-950">
      <SettingsForm
        defaultValues={{ fullName: "Jane Doe", email: "jane@example.com" }}
        onSubmit={handleSave}
      />
    </main>
  );
}
```

> Note: if `onSubmit` needs to be a server action, drop the inline `"use server"` closure pattern above (it must be a top-level async function in a server file) and pass a real server action instead.

## 8. Accessibility Notes

- Labels are explicitly associated via `htmlFor`/`id`.
- Errors are announced via `role="alert"` and `aria-live="polite"`.
- `aria-invalid` and `aria-describedby` link fields to their error text for assistive tech.
- All controls are native HTML elements — fully keyboard operable (Tab, Space, Enter, arrow keys on select) without extra JS.
- Visible focus rings via `focus:ring-2` for keyboard users.
- `aria-busy` communicates submission state to screen readers.

## 9. Best Practices

- Single source of truth for types (`z.infer`) — no schema/type drift.
- `mode: "onBlur"` gives timely feedback without being aggressive on every keystroke.
- Validation logic separated into `lib/validation` for reuse/testing.
- Component only knows about `onSubmit`/`defaultValues` — no coupling to API calls, making it portable.
- Tailwind utility classes only, dark-mode variants included, no inline styles.

## 10. Suggested Improvements

- Add a toast/notification system to confirm successful saves.
- Add optimistic UI or a "success" state after submit.
- Extract each field into a small `<FormField>` wrapper to reduce repetition if more fields are added later.
- Add unit tests with React Testing Library + Vitest/Jest.
- Consider `react-hook-form`'s `Controller` if you later add a custom (non-native) select or switch component.

---

# Verification

**Requirements check:**

- ✅ TypeScript, RHF, Zod, Tailwind only, controlled inputs (via `register`), all four fields, Save button, disabled while submitting, semantic `<form>/<label>/<input>`, keyboard accessible, labels present, aria attributes present.

**Possible bugs / things to watch:**

1. If `onSubmit` throws, `isSubmitting` still resets correctly (RHF handles this), but you may want a try/catch to surface a submit error message to the user — currently a failed `onSubmit` fails silently in the UI (only visible in console/network tab).
2. The `theme` select has no "unselected" state — this is intentional (avoids invalid enum values) but confirm it matches your UX expectations.
3. Server Action closures (`"use server"` inside a function passed as a prop) only work in specific Next.js configurations — flag this to whoever wires up the real submit handler.

**Example test cases (React Testing Library):**

```tsx
it("shows required errors on empty submit", async () => {
  render(<SettingsForm onSubmit={jest.fn()} />);
  fireEvent.click(screen.getByRole("button", { name: /save settings/i }));
  expect(await screen.findByText("Full name is required")).toBeInTheDocument();
  expect(await screen.findByText("Email is required")).toBeInTheDocument();
});

it("shows an error for invalid email", async () => {
  render(<SettingsForm onSubmit={jest.fn()} />);
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "not-an-email" } });
  fireEvent.blur(screen.getByLabelText(/email/i));
  expect(await screen.findByText(/valid email/i)).toBeInTheDocument();
});

it("calls onSubmit with valid data", async () => {
  const onSubmit = jest.fn();
  render(<SettingsForm onSubmit={onSubmit} />);
  fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: "Jane Doe" } });
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "jane@example.com" } });
  fireEvent.click(screen.getByRole("button", { name: /save settings/i }));
  await waitFor(() =>
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ fullName: "Jane Doe", email: "jane@example.com" })
    )
  );
});

it("disables the submit button while submitting", async () => {
  const onSubmit = jest.fn(() => new Promise((r) => setTimeout(r, 100)));
  render(<SettingsForm onSubmit={onSubmit} defaultValues={{ fullName: "A", email: "a@b.com" }} />);
  const button = screen.getByRole("button", { name: /save settings/i });
  fireEvent.click(button);
  expect(button).toBeDisabled();
});
```

**Production-readiness verdict:** Yes, this component is production-ready for a portfolio project — it's type-safe, validated, accessible, and cleanly separated from data-fetching concerns. Before shipping in a real product, I'd add: submit-error UI feedback, unit tests (above), and i18n for labels/messages if the app needs multi-language support.
