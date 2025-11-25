"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";

export default function Contact() {
    return (
        <section className="py-20 px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass p-12 rounded-2xl"
                >
                    <h2 className="text-3xl font-bold mb-6 text-terminal-green">
                        <span className="text-terminal-amber">./</span>contact_us
                    </h2>

                    <p className="text-lg text-terminal-gray mb-8">
                        Ready to collaborate or just want to say hi?
                        <br />
                        Our inbox is always open.
                    </p>

                    <a
                        href="mailto:team@cloudzz.dev"
                        className="inline-flex items-center gap-2 bg-terminal-green text-white px-8 py-3 rounded-full font-bold hover:bg-terminal-green/90 transition-colors hover:scale-105 transform duration-200"
                        suppressHydrationWarning
                    >
                        <Mail className="w-5 h-5" />
                        team@cloudzz.dev
                    </a>
                </motion.div>

                <footer className="mt-20 text-sm text-terminal-gray/40 font-mono">
                    © {new Date().getFullYear()} Cloudzz Hackathon Team — Zadar. All rights reserved.
                </footer>
            </div>
        </section>
    );
}
