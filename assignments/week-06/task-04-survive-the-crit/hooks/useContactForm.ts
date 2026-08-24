"use client";

import { useState, useCallback, type FormEvent } from "react";
import type { ContactFormData, FormErrors, FormStatus } from "@/lib/types";
import { validateContactForm, hasErrors } from "@/lib/validation";

const INITIAL_DATA: ContactFormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export function useContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_DATA);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = useCallback(
    (field: keyof ContactFormData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[field];
          return next;
        });
      }
    },
    [errors]
  );

  const handleBlur = useCallback(
    (field: keyof ContactFormData) => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      const fieldErrors = validateContactForm({ ...formData, [field]: formData[field] });
      if (fieldErrors[field]) {
        setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }));
      }
    },
    [formData]
  );

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const validationErrors = validateContactForm(formData);
      if (hasErrors(validationErrors)) {
        setErrors(validationErrors);
        setTouched({
          name: true,
          email: true,
          subject: true,
          message: true,
        });
        return;
      }

      setStatus("submitting");
      setErrors({});

      try {
        const response = await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            "form-name": "contact",
            name: formData.name.trim(),
            email: formData.email.trim(),
            subject: formData.subject.trim(),
            message: formData.message.trim(),
          }).toString(),
        });

        if (!response.ok) {
          throw new Error("Form submission failed");
        }

        setStatus("success");
        setFormData(INITIAL_DATA);
        setTouched({});
      } catch {
        setStatus("error");
      }
    },
    [formData]
  );

  const resetStatus = useCallback(() => {
    setStatus("idle");
  }, []);

  return {
    formData,
    errors,
    status,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetStatus,
  };
}
