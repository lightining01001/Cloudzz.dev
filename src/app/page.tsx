import ParticlesBackground from "@/components/ParticlesBackground";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Members from "@/components/Members";
import TerminalWindow from "@/components/Terminal/TerminalWindow";
import Contact from "@/components/Contact";
import Arsenal from "@/components/Arsenal";
import GlobalConnectionSystem from "@/components/GlobalConnectionSystem";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      <ParticlesBackground />
      <GlobalConnectionSystem />
      <Hero />
      <About />
      <Members />
      <Arsenal />

      <TerminalWindow />
      <Contact />
    </main>
  );
}
