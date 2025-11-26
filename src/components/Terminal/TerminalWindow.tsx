"use client";

import { motion } from "framer-motion";
import FakeShell from "../FakeShell";
import AsciiArt from "./AsciiArt";
import AsciiClock from "./AsciiClock";
import WeatherWidget from "./WeatherWidget";
import HackathonCountdownWidget from "./HackathonCountdownWidget";

import TerminalParticles from "./TerminalParticles";

export default function TerminalWindow() {
    return (
        <section className="min-h-screen py-12 sm:py-16 md:py-20 px-4 flex items-center justify-center relative z-10">
            <motion.div
                initial={{ opacity: 0, scaleY: 0.01, scaleX: 0.8 }}
                whileInView={{ opacity: 1, scaleY: 1, scaleX: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                    duration: 0.6,
                    ease: "circOut",
                    opacity: { duration: 0.2 }
                }}
                className="w-full max-w-5xl bg-white/80 dark:bg-black/80 backdrop-blur-xl rounded-lg shadow-2xl border border-terminal-gray/20 overflow-hidden flex flex-col min-h-[780px] sm:min-h-[730px] md:h-[680px] relative group"
            >
                {/* CRT Overlay Effect */}
                <div className="absolute inset-0 pointer-events-none z-50 opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
                <div className="absolute inset-0 pointer-events-none z-50 opacity-20 radial-gradient-crt" />

                {/* Terminal Header */}
                <div className="bg-terminal-gray/5 border-b border-terminal-gray/10 p-2 sm:p-3 flex items-center justify-between relative z-20">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500" />
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500" />
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500" />
                    </div>
                    <div className="text-[10px] sm:text-xs font-mono text-terminal-gray/60">
                        user@cloudzz-zadar:~
                    </div>
                    <div className="w-8 sm:w-10" /> {/* Spacer for centering */}
                </div>

                {/* Terminal Body */}
                <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
                    {/* Background Particles */}
                    <TerminalParticles />

                    {/* Left Panel: Shell */}
                    <div className="flex-1 bg-white/50 dark:bg-black/50 p-2 border-r border-terminal-gray/10 relative z-10 min-h-[400px] md:min-h-0">
                        <FakeShell />
                    </div>

                    {/* Right Panel: Widgets */}
                    <div className="w-full md:w-80 bg-white/40 dark:bg-black/40 p-4 sm:p-6 flex flex-col gap-4 sm:gap-6 relative z-10 overflow-y-auto">
                        <div className="flex justify-center">
                            <AsciiArt />
                        </div>
                        <div className="space-y-3 sm:space-y-4">
                            <AsciiClock />
                            <WeatherWidget />
                            <HackathonCountdownWidget />
                        </div>

                        <div className="mt-auto pt-4 sm:pt-6 border-t border-terminal-gray/10">
                            <div className="text-[10px] sm:text-xs font-mono text-terminal-gray/50 text-center">
                                SYSTEM STATUS: ONLINE
                                <br />
                                UPTIME: 99.9%
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
