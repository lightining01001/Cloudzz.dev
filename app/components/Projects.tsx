const projects = [
  {
    title: 'Project Alpha',
    description: 'A revolutionary app that solves a common problem with a unique solution.',
    code: 'console.log("Hello, World!");',
  },
  {
    title: 'Project Beta',
    description: 'An innovative platform that connects people in a new and exciting way.',
    code: 'const x = 10;\\nconst y = 20;\\nconsole.log(x + y);',
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold crt-glow">// Our Projects</h2>
        <div className="mt-8 grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div key={project.title} className="glass-card p-8 rounded-xl text-left">
              <h3 className="text-2xl font-bold">{project.title}</h3>
              <p className="mt-2">{project.description}</p>
              <div className="mt-4 bg-gray-900 rounded-lg p-4 font-mono text-sm text-white">
                <p className="text-green-400">$ {project.code}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;