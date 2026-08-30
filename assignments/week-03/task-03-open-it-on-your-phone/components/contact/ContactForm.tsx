"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, MapPin, Send } from "lucide-react";
import { PROFILE } from "@/constants/portfolio";
import { useContactForm } from "@/hooks/useContactForm";
import { FormField } from "./FormField";
import { SubmitButton } from "./SubmitButton";
import { FormStatusMessage } from "./FormStatus";

const contactInfo = [
  { icon: Mail, label: "Email", value: PROFILE.email, href: `mailto:${PROFILE.email}` },
  { icon: Github, label: "GitHub", value: "github.com", href: PROFILE.github },
  { icon: Linkedin, label: "LinkedIn", value: "linkedin.com", href: PROFILE.linkedin },
  { icon: MapPin, label: "Location", value: PROFILE.location, href: null },
];

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
    <section id="contact" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Get In{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-purple-600 to-blue-600" />
          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            Have a project in mind? Let&apos;s work together to bring your ideas to life.
          </p>
        </motion.div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-8 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6 lg:col-span-2"
          >
            {contactInfo.map((item) => {
              const Icon = item.icon;
              const content = (
                <div className="group flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-all duration-300 hover:border-purple-500/20 hover:bg-purple-500/5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-600/15">
                    <Icon className="h-5 w-5 text-purple-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-500">{item.label}</p>
                    <p className="mt-0.5 truncate text-sm font-medium text-gray-200 group-hover:text-white transition-colors">
                      {item.value}
                    </p>
                  </div>
                </div>
              );

              return item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={`${item.label}: ${item.value}`}
                  className="block focus:outline-none focus:ring-2 focus:ring-purple-500/50 rounded-xl"
                >
                  {content}
                </a>
              ) : (
                <div key={item.label} aria-label={`${item.label}: ${item.value}`}>
                  {content}
                </div>
              );
            })}

            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View GitHub profile"
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-purple-500/40 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-gray-950"
            >
              <Send className="h-4 w-4" />
              Let&apos;s Connect
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm sm:p-8">
              <FormStatusMessage status={status} onDismiss={resetStatus} />

              <form
                name="contact"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                noValidate
                aria-label="Contact form"
                className="mt-6 space-y-4 sm:space-y-5"
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
        </div>
      </div>
    </section>
  );
}
