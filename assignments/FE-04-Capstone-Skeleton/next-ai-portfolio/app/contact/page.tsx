import { ContactHero } from "@/components/sections/ContactHero"
import { ContactForm } from "@/components/sections/ContactForm"
import { ContactInfoSection } from "@/components/sections/ContactInfo"

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <section className="pb-20 sm:pb-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <ContactForm />
            <ContactInfoSection />
          </div>
        </div>
      </section>
    </>
  )
}
