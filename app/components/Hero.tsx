const Hero = () => {
  return (
    <section
      id="hero"
      className="h-screen flex items-center justify-center text-center"
    >
      <div className="glass-card p-12 rounded-xl">
        <h1 className="text-5xl font-bold crt-glow text-neon-blue">
          Cloudzz Hackathon Team — Zadar
        </h1>
        <p className="mt-4 text-xl blinking-cursor">
          Innovating under pressure since Day 1
        </p>
        <a
          href="#contact"
          className="mt-8 inline-block bg-neon-blue text-white px-8 py-3 rounded-lg hover:shadow-glow transition-shadow"
        >
          Join Us
        </a>
      </div>
    </section>
  );
};

export default Hero;