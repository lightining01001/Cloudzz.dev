import ParticlesBackground from "@/components/ParticlesBackground";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Members from "@/components/Members";
import TerminalWindow from "@/components/Terminal/TerminalWindow";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      <ParticlesBackground />
      <Hero />
      <About />
      <Members />

      <TerminalWindow />
      <Contact />
    </main>
  );
}
