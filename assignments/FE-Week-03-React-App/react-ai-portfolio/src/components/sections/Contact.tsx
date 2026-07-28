import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ContactData } from "../../types";
import {
  contactFormSchema,
  type ContactFormData,
} from "../../lib/validation/contact";
import { SectionTitle } from "../ui/SectionTitle";
import { SocialLinks } from "../ui/SocialLinks";
import { Button } from "../ui/Button";

interface ContactProps {
  data: ContactData;
}

export function Contact({ data }: ContactProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = () => {
    setIsSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="w-full bg-surface py-20 sm:py-28"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle
          id="contact-heading"
          title="Get In Touch"
          subtitle="Have a question or want to work together? Reach out via the form or connect on social."
        />

        <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
          <div className="flex flex-col gap-8 lg:w-2/5">
            <div className="rounded-2xl border border-white/10 bg-background/60 p-6 backdrop-blur-md">
              <h3 className="mb-3 font-heading text-lg font-semibold text-accent">
                Email
              </h3>
              <a
                href={`mailto:${data.email}`}
                className="text-sm text-text/70 transition-colors hover:text-accent"
              >
                {data.email}
              </a>
            </div>

            <div className="rounded-2xl border border-white/10 bg-background/60 p-6 backdrop-blur-md">
              <h3 className="mb-3 font-heading text-lg font-semibold text-accent">
                Social
              </h3>
              <SocialLinks socials={data.socials} />
            </div>

            <div className="rounded-2xl border border-white/10 bg-background/60 p-6 backdrop-blur-md">
              <h3 className="mb-3 font-heading text-lg font-semibold text-accent">
                Let&apos;s Connect
              </h3>
              <p className="text-sm leading-relaxed text-text/70">
                I am always open to discussing new projects, creative ideas,
                or opportunities to be part of your vision.
              </p>
            </div>
          </div>

          <div className="flex-1">
            {isSubmitted ? (
              <div
                className="flex h-full min-h-[300px] flex-col items-center justify-center rounded-2xl border border-white/10 bg-background/60 p-8 text-center backdrop-blur-md"
                role="status"
              >
                <span className="mb-4 text-4xl" aria-hidden="true">
                  ✅
                </span>
                <h3 className="mb-2 font-heading text-xl font-bold text-text">
                  Message Sent!
                </h3>
                <p className="text-sm text-text/70">
                  Thank you for reaching out. I will get back to you soon.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-background/60 p-6 backdrop-blur-md sm:p-8"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-sm font-medium text-text"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    aria-invalid={errors.name ? "true" : "false"}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className="w-full rounded-lg border border-white/10 bg-surface px-4 py-3 text-sm text-text placeholder:text-text/40 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Your name"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p id="name-error" role="alert" className="mt-1 text-xs text-red-400">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-medium text-text"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className="w-full rounded-lg border border-white/10 bg-surface px-4 py-3 text-sm text-text placeholder:text-text/40 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="you@example.com"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p id="email-error" role="alert" className="mt-1 text-xs text-red-400">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-sm font-medium text-text"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    aria-invalid={errors.message ? "true" : "false"}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    className="w-full resize-none rounded-lg border border-white/10 bg-surface px-4 py-3 text-sm text-text placeholder:text-text/40 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Your message..."
                    {...register("message")}
                  />
                  {errors.message && (
                    <p id="message-error" role="alert" className="mt-1 text-xs text-red-400">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="accent"
                  disabled={isSubmitting}
                  className="mt-2 w-full disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
