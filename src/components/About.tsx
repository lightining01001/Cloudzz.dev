"use client";

import { motion } from "framer-motion";

export default function About() {
    return (
        <section className="py-20 px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="glass p-8 md:p-12 rounded-2xl"
                >
                    <h2 className="text-3xl font-bold mb-8 text-terminal-green flex items-center gap-2">
                        <span className="text-terminal-amber">{">"}</span> About_Us
                    </h2>

                    <div className="space-y-6 text-lg text-terminal-gray">
                        <p>
                            We are a team of passionate developers from Zadar, driven by the thrill of hackathons and the challenge of building innovative solutions under tight deadlines.
                        </p>

                        <ul className="space-y-4 mt-6">
                            {[
                                "Rapid prototyping & deployment",
                                "Full-stack development expertise",
                                "Creative problem solving",
                                "Coffee-fueled coding sessions"
                            ].map((item, index) => (
                                <li key={index} className="flex items-center gap-3">
                                    <span className="text-terminal-green">./</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
