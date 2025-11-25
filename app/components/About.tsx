const About = () => {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold crt-glow">// About Us</h2>
        <div className="mt-8 glass-card p-8 max-w-3xl mx-auto text-left">
          <p className="text-lg">
            We are a dynamic team of developers from Zadar, Croatia, united by our passion for hackathons. We excel at:
          </p>
          <ul className="mt-4 space-y-2 list-disc list-inside">
            <li>Real-time collaboration</li>
            <li>Rapid prototyping</li>
            <li>Creative problem solving</li>
            <li>Coding under pressure</li>
            <li>Innovation and teamwork</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;