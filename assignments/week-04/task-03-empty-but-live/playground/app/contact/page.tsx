import { ContactHero } from "@/components/sections/ContactHero"
import { ContactForm } from "@/components/sections/ContactForm"
import { ContactInfoSection } from "@/components/sections/ContactInfo"
import { Container } from "@/components/ui/Container"

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <section className="pb-20 sm:pb-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <ContactForm />
            <ContactInfoSection />
          </div>
        </Container>
      </section>
    </>
  )
}
