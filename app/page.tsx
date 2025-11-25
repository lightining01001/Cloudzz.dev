import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Members from './components/Members';
import Projects from './components/Projects';
import Contact from './components/Contact';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Members />
      <Projects />
      <Contact />
    </main>
  );
}