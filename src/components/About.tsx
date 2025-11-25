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
                            Hi, we are 3 teenagers from Zadar and we enjoy basically everything tech, and hackathons fall into that spectrum.
                        </p>

                        <ul className="space-y-4 mt-6">
                            {[
                                "We love trying out new things",
                                "We enjoy coding and learning along the way",
                                "We love to hear new tips and tricks",
                                "Besides coding, we love hardware and CTFs"
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
