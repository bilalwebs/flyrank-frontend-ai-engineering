import { portfolioData } from "./data/portfolio";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Skills } from "./components/sections/Skills";
import { Projects } from "./components/sections/Projects";
import { Contact } from "./components/sections/Contact";

function App() {
  return (
    <div className="min-h-screen bg-background text-text">
      <Header />

      <main id="main-content">
        <Hero data={portfolioData.hero} />
        <About data={portfolioData.about} />
        <Skills skills={portfolioData.skills} />
        <Projects projects={portfolioData.projects} />
        <Contact data={portfolioData.contact} />
      </main>

      <Footer
        socials={portfolioData.contact.socials}
        siteName={portfolioData.hero.name}
      />
    </div>
  );
}

export default App;
