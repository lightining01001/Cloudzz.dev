"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ParticlesBackground from "@/components/ParticlesBackground";

export default function NotFound() {
    return (
        <main className="min-h-screen relative overflow-hidden flex items-center justify-center">
            <ParticlesBackground />

            <div className="relative z-10 px-4 max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="glass p-8 md:p-12 rounded-2xl text-center"
                >
                    {/* 404 Header */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mb-8"
                    >
                        <h1 className="text-8xl md:text-9xl font-bold font-mono text-terminal-green mb-4">
                            404
                        </h1>
                        <div className="text-sm font-mono text-terminal-amber mb-2">
                            ERROR: PAGE_NOT_FOUND
                        </div>
                    </motion.div>

                    {/* Message */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="space-y-6 mb-8"
                    >
                        <p className="text-lg md:text-xl text-terminal-gray font-mono leading-relaxed">
                            Well this is embarrassing but the page you are looking for isn't available or maybe you shouldn't even be here...
                        </p>

                        <p className="text-terminal-green font-mono">
                            -Cloudzz
                        </p>
                    </motion.div>

                    {/* Home Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 glass-card px-6 py-3 rounded-lg font-mono text-terminal-green hover:bg-terminal-green/10 transition-all duration-300 border border-terminal-green/30 hover:border-terminal-green group"
                        >
                            <span className="text-terminal-amber group-hover:translate-x-[-4px] transition-transform">{">"}</span>
                            <span>RETURN_HOME</span>
                            <span className="text-terminal-amber group-hover:translate-x-[4px] transition-transform">{"_"}</span>
                        </Link>
                    </motion.div>

                    {/* Terminal-style footer */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        className="mt-12 pt-6 border-t border-terminal-gray/20"
                    >
                        <div className="text-xs font-mono text-terminal-gray/60">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <span className="text-terminal-green">●</span>
                                <span>SYSTEM STATUS: ONLINE</span>
                            </div>
                            <div>
                                Tip: Check the URL or head back to safety
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </main>
    );
}
