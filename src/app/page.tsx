import Hero from "@/components/Hero";
import About from "@/components/About";
import Members from "@/components/Members";
import TerminalWindow from "@/components/Terminal/TerminalWindow";
import Contact from "@/components/Contact";
import Arsenal from "@/components/Arsenal";
import GlobalConnectionSystem from "@/components/GlobalConnectionSystem";
import MapSection from "@/components/MapSection";

import StormCloud from "@/components/StormCloud";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      <StormCloud />
      <GlobalConnectionSystem />
      <Hero />
      <About />
      <Members />
      <Arsenal />
      <TerminalWindow />
      <MapSection />
      <Contact />
    </main>
  );
}
