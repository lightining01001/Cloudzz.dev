"use client";

import { motion } from "framer-motion";

const members = [
    {
        name: "Leon",
        role: "Full Stack Developer",
        quote: "Software is cool but have you ever had a Radio... yk I love software",
    },
    {
        name: "Roko",
        role: "Frontend Wizard",
        quote: "Vibe coding since day one",
    },
    {
        name: "Frane",
        role: "Backend Engineer",
        quote: "We are so back baby",
    },
];

export default function Members() {
    return (
        <section className="py-20 px-4 relative z-10">
            <div className="max-w-6xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold mb-12 text-center text-terminal-green"
                >
                    <span className="text-terminal-amber">ls</span> ./team_members
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {members.map((member, index) => (
                        <motion.div
                            key={member.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="glass-card p-8 rounded-xl hover:scale-105 transition-transform duration-300"
                        >
                            <div className="w-16 h-16 bg-terminal-green/10 rounded-full flex items-center justify-center mb-6 mx-auto text-2xl font-bold text-terminal-green border border-terminal-green/20">
                                {member.name[0]}
                            </div>

                            <h3 className="text-xl font-bold text-center mb-2">{member.name}</h3>
                            <p className="text-sm text-terminal-amber text-center mb-6 font-mono">{member.role}</p>

                            <div className="relative">
                                <span className="absolute -top-2 -left-2 text-4xl text-terminal-gray/10">"</span>
                                <p className="text-center text-terminal-gray/80 italic relative z-10">
                                    {member.quote}
                                </p>
                                <span className="absolute -bottom-4 -right-2 text-4xl text-terminal-gray/10">"</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
