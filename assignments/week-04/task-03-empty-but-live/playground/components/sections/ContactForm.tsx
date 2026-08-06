"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { contactSchema, type ContactFormData } from "@/lib/validation/contact"
import { Button } from "@/components/ui/Button"
import { CheckIcon, SendIcon } from "@/components/ui/icons"

export function ContactForm() {
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSuccess(true)
    reset()
  }

  if (isSuccess) {
    return (
      <div
        className="flex h-full flex-col items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-50 p-10 text-center dark:border-emerald-400/20 dark:bg-emerald-500/10"
        role="status"
      >
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300">
          <CheckIcon className="h-7 w-7" />
        </span>
        <p className="mt-5 text-lg font-semibold text-emerald-700 dark:text-emerald-300">
          Message sent successfully!
        </p>
        <p className="mt-2 text-sm text-emerald-600 dark:text-emerald-400">
          Thank you for reaching out. I will get back to you soon.
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => setIsSuccess(false)}
        >
          Send another message
        </Button>
      </div>
    )
  }

  const inputClasses =
    "mt-1.5 block w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground transition-colors placeholder:text-muted/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"

  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
      <h2 className="text-2xl font-bold tracking-tight text-foreground">
        Send a Message
      </h2>
      <p className="mt-2 text-sm text-muted">
        Fill in the form below and I&apos;ll get back to you as soon as I can.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-6">
        <div className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-foreground"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              {...register("name")}
              aria-invalid={errors.name ? "true" : "false"}
              aria-describedby={errors.name ? "name-error" : undefined}
              className={inputClasses}
              placeholder="Your name"
            />
            {errors.name && (
              <p
                id="name-error"
                className="mt-1.5 text-sm text-red-600 dark:text-red-400"
                role="alert"
              >
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-foreground"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              {...register("email")}
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={inputClasses}
              placeholder="your.email@example.com"
            />
            {errors.email && (
              <p
                id="email-error"
                className="mt-1.5 text-sm text-red-600 dark:text-red-400"
                role="alert"
              >
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-foreground"
            >
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              {...register("message")}
              aria-invalid={errors.message ? "true" : "false"}
              aria-describedby={errors.message ? "message-error" : undefined}
              className={inputClasses}
              placeholder="Your message..."
            />
            {errors.message && (
              <p
                id="message-error"
                className="mt-1.5 text-sm text-red-600 dark:text-red-400"
                role="alert"
              >
                {errors.message.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            disabled={isSubmitting}
            loading={isSubmitting}
          >
            {isSubmitting ? (
              "Sending..."
            ) : (
              <>
                Send Message
                <SendIcon className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
