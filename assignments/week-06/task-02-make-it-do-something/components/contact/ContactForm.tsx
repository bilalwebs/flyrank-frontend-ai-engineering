"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { useContactForm } from "@/hooks/useContactForm";
import { FormField } from "./FormField";
import { SubmitButton } from "./SubmitButton";
import { FormStatusMessage } from "./FormStatus";

export function ContactForm() {
  const {
    formData,
    errors,
    status,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetStatus,
  } = useContactForm();

  return (
    <section id="contact" className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-2xl"
      >
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-600/20">
            <Mail className="h-6 w-6 text-purple-400" aria-hidden="true" />
          </div>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Get In{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
          <p className="mt-3 text-gray-400">
            Have a project in mind? Let&apos;s work together to bring your ideas to life.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-white/5 bg-white/[0.02] p-6 sm:p-8 backdrop-blur-sm">
          <FormStatusMessage status={status} onDismiss={resetStatus} />

          <form
            name="contact"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            noValidate
            className="mt-6 space-y-5"
          >
            <input type="hidden" name="form-name" value="contact" />
            <p className="hidden">
              <label>
                Don&apos;t fill this out: <input name="bot-field" />
              </label>
            </p>

            <FormField
              label="Name"
              name="name"
              required
              value={formData.name}
              error={errors.name}
              touched={touched.name}
              placeholder="Your name"
              onChange={(v) => handleChange("name", v)}
              onBlur={() => handleBlur("name")}
            />

            <FormField
              label="Email"
              name="email"
              type="email"
              required
              value={formData.email}
              error={errors.email}
              touched={touched.email}
              placeholder="you@example.com"
              onChange={(v) => handleChange("email", v)}
              onBlur={() => handleBlur("email")}
            />

            <FormField
              label="Subject"
              name="subject"
              required
              value={formData.subject}
              error={errors.subject}
              touched={touched.subject}
              placeholder="Project inquiry"
              onChange={(v) => handleChange("subject", v)}
              onBlur={() => handleBlur("subject")}
            />

            <FormField
              label="Message"
              name="message"
              as="textarea"
              required
              value={formData.message}
              error={errors.message}
              touched={touched.message}
              placeholder="Tell me about your project..."
              onChange={(v) => handleChange("message", v)}
              onBlur={() => handleBlur("message")}
            />

            <SubmitButton status={status} />
          </form>
        </div>
      </motion.div>
    </section>
  );
}
