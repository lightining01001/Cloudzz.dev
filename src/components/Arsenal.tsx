"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import GlassCard from "./GlassCard";

const LOGOS = [
    {
        name: "C++",
        src: "/ISO_C++_Logo.svg.png",
        href: "https://isocpp.org/",
        className: "",
    },
    {
        name: "React",
        src: "/React-icon.svg.png",
        href: "https://react.dev/",
    },
    {
        name: "Next.js",
        src: "/nextjs-icon.svg",
        href: "https://nextjs.org/",
        className: "brightness-0 invert",
    },
    {
        name: "Vue.js",
        src: "/vue-js-logo-png_seeklogo-409843.png",
        href: "https://vuejs.org/",
    },
    {
        name: "ChatGPT",
        src: "/openai.svg",
        href: "https://openai.com/chatgpt",
        className: "brightness-0 invert",
    },
    {
        name: "C",
        src: "/C_Logo.png",
        href: "https://en.cppreference.com/w/c",
    },
    {
        name: "Linux",
        src: "/linux.png",
        href: "https://www.gnu.org/gnu/linux-and-gnu.html",
        className: "brightness-0 invert",
    },
    {
        name: "Google Gemini",
        src: "/gemini-google-icon-symbol-logo-free-png.webp",
        href: "https://deepmind.google/technologies/gemini/",
    },
    {
        name: "JetBrains",
        src: "/JetBrains_beam_logo.svg.png",
        href: "https://www.jetbrains.com/",
    },
    {
        name: "Tailwind CSS",
        src: "/tailwindcss.png",
        href: "https://tailwindcss.com/",
    },
];

// Duplicate logos once outside the component to avoid re-calculation on every render
const DOUBLED_LOGOS = [...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS];

export default function Arsenal() {
    const [text, setText] = useState("");
    const fullText = "Tools, languages, and engines that power our chaos.";

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setText(fullText.slice(0, i));
            i++;
            if (i > fullText.length) {
                clearInterval(interval);
            }
        }, 50);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-20 px-4 relative z-10 overflow-hidden">
            <div className="max-w-6xl mx-auto mb-12 text-center">
                <GlassCard className="p-8">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-terminal-green">
                        <span className="text-terminal-amber">{">"}</span> The_Arsenal
                    </h2>
                    <div className="h-6 font-mono text-terminal-gray/80 text-sm md:text-base">
                        {text}
                        <span className="animate-pulse">_</span>
                    </div>
                </GlassCard>
            </div>

            {/* Marquee Container */}
            <div className="max-w-5xl mx-auto relative rounded-3xl overflow-hidden">
                {/* Gradient Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[var(--background)] to-transparent z-20 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[var(--background)] to-transparent z-20 pointer-events-none" />

                {/* Glass Track */}
                <div className="glass py-6 border border-terminal-gray/10 rounded-3xl">
                    <div className="flex overflow-hidden">
                        <motion.div
                            className="flex gap-16 items-center px-16 whitespace-nowrap w-max will-change-transform"
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{
                                repeat: Infinity,
                                ease: "linear",
                                duration: 60,
                            }}
                        >
                            {/* All logos - duplicated for smooth loop */}
                            {DOUBLED_LOGOS.map((logo, index) => (
                                <a
                                    key={index}
                                    href={logo.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="cursor-hover flex flex-col items-center gap-4 transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(var(--terminal-green),0.5)] cursor-pointer z-30"
                                >
                                    <div className="relative w-16 h-16 flex items-center justify-center">
                                        <Image
                                            src={logo.src}
                                            alt={logo.name}
                                            width={64}
                                            height={64}
                                            className={`object-contain max-w-full max-h-full ${logo.className || ""}`}
                                            priority
                                        />
                                    </div>
                                </a>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
