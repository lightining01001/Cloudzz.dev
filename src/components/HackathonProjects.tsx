"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import GlassCard from "./GlassCard";

const projects = [
    {
        name: "Start.it",
        url: "/start-it",
        externalUrl: "https://alt-start-it.cloudzz.dev",
        description: "A modern networking platform connecting startup founders, developers, and investors",
        tagline: "Building the future together",
        year: "2025",
        event: "Zadar Smart City Hackathon",
    },
];

export default function HackathonProjects() {
    return (
        <section className="py-20 px-4 relative z-10">
            <div className="max-w-6xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-bold mb-12 text-center text-terminal-green"
                >
                    <span className="text-terminal-amber">{">"}</span> Hackathon_Projects
                </motion.h2>

                <div className="grid grid-cols-1 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                        >
                            <GlassCard className="p-8 hover:scale-[1.02] transition-transform duration-300">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                                    <div>
                                        <h3 className="text-2xl md:text-3xl font-bold text-terminal-green mb-2">
                                            {project.name}
                                        </h3>
                                        <p className="text-terminal-amber font-mono text-sm">
                                            {project.event} • {project.year}
                                        </p>
                                    </div>
                                    <div className="flex gap-4">
                                        <Link
                                            href={project.url}
                                            className="cursor-hover px-6 py-2 bg-terminal-green/10 border border-terminal-green/30 rounded-lg text-terminal-green font-semibold hover:bg-terminal-green/20 transition-colors"
                                        >
                                            View Details
                                        </Link>
                                        <a
                                            href={project.externalUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="cursor-hover px-6 py-2 bg-terminal-amber/10 border border-terminal-amber/30 rounded-lg text-terminal-amber font-semibold hover:bg-terminal-amber/20 transition-colors"
                                        >
                                            Live Demo ↗
                                        </a>
                                    </div>
                                </div>
                                <p className="text-terminal-gray/80 text-lg mb-2">
                                    {project.description}
                                </p>
                                <p className="text-terminal-green/60 italic">
                                    "{project.tagline}"
                                </p>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
