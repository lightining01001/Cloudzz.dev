const members = [
  {
    name: 'Leon',
    quote: '“Software is cool but have you ever had a Radio... yk I love software”',
  },
  {
    name: 'Roko',
    quote: '“Vibe coding since day one”',
  },
  {
    name: 'Frane',
    quote: '“We are so back baby”',
  },
];

const Members = () => {
  return (
    <section id="members" className="py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold crt-glow">// Our Team</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-8">
          {members.map((member) => (
            <div
              key={member.name}
              className="glass-card p-8 rounded-xl hover:shadow-glow transition-all duration-300 transform hover:-translate-y-2"
            >
              <h3 className="text-2xl font-bold blinking-cursor">{member.name}</h3>
              <p className="mt-4 italic">{member.quote}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Members;