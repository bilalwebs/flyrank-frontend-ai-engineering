"use client"

import Header from "@/components/Header"
import Hero from "@/components/Hero"
import About from "@/components/About"
import Skills from "@/components/Skills"
import Projects from "@/components/Projects"
import Experience from "@/components/Experience"
import Certificates from "@/components/Certificates"
import Blog from "@/components/Blog"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"
import FloatingShapes from "@/components/FloatingShapes"
export default function Home() {
  return (
    <>
      <FloatingShapes />

      <Header />
      <main id="main-content" className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certificates />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
