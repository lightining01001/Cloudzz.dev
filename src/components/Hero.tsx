"use client";

import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="min-h-screen flex flex-col items-center justify-center relative z-10 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-center"
            >
                <h1 id="hero-title" className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 tracking-tighter leading-tight">
                    Cloudzz Hackathon Team
                    <span className="block text-terminal-green mt-2">— Zadar</span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-terminal-gray/80 max-w-2xl mx-auto font-medium px-4">
                    Innovating under pressure since Day 1
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 animate-bounce"
            >
                <div className="w-6 h-10 border-2 border-terminal-gray/30 rounded-full flex justify-center pt-2">
                    <div className="w-1 h-2 bg-terminal-green rounded-full animate-pulse" />
                </div>
            </motion.div>
        </section>
    );
}
