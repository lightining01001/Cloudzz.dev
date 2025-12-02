"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ParticlesBackground from "@/components/ParticlesBackground";
import GlassCard from "@/components/GlassCard";

export default function StartItPage() {
    return (
        <main className="min-h-screen relative overflow-hidden bg-background">
            <ParticlesBackground />

            {/* Back Button */}
            <div className="fixed top-6 left-6 z-50">
                <Link
                    href="/"
                    className="cursor-hover glass px-4 py-2 rounded-lg text-terminal-green font-semibold hover:bg-terminal-green/10 transition-colors border border-terminal-green/30"
                >
                    ← Back
                </Link>
            </div>

            {/* Hero Section */}
            <section className="min-h-screen flex flex-col items-center justify-center relative z-10 px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center max-w-5xl mx-auto"
                >
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 text-terminal-green">
                        Start.it
                    </h1>
                    <p className="text-xl md:text-2xl text-terminal-amber mb-8">
                        Building the future together
                    </p>
                    <div className="flex gap-4 justify-center mb-12">
                        <a
                            href="https://alt-start-it.cloudzz.dev"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cursor-hover px-8 py-3 bg-terminal-green/20 border border-terminal-green rounded-lg text-terminal-green font-semibold hover:bg-terminal-green/30 transition-colors"
                        >
                            Visit Live Site ↗
                        </a>
                    </div>
                </motion.div>
            </section>

            {/* Description Section */}
            <section className="py-20 px-4 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <GlassCard className="p-8 md:p-12">
                            <h2 className="text-3xl font-bold text-terminal-green mb-6">
                                About the Project
                            </h2>
                            <div className="space-y-4 text-terminal-gray/80 text-lg">
                                <p>
                                    Start.it is a modern networking platform that connects startup founders, developers, and investors to collaborate and build the future together. It was developed at the <span className="text-terminal-amber font-semibold">Zadar Smart City Hackathon 2025</span> and is hosted on Leon's Raspberry Pi.
                                </p>
                                <p>
                                    The platform features role-based profiles, allowing developers to find gigs and co-founder opportunities, founders to pitch to investors and recruit talent, and investors to discover early-stage startups.
                                </p>
                                <p>
                                    With its premium glassmorphism UI and Dynamic Island navigation, Start.it provides a sleek, interactive experience for the startup ecosystem.
                                </p>
                                <div className="bg-terminal-amber/10 border border-terminal-amber/30 rounded-lg p-4 mt-6">
                                    <p className="text-terminal-amber font-semibold">
                                        ⚠️ Note: All data displayed on the platform is demo data for demonstration purposes.
                                    </p>
                                </div>
                            </div>
                        </GlassCard>
                    </motion.div>
                </div>
            </section>

            {/* Tech Stack Arsenal Section */}
            <section className="py-20 px-4 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold mb-12 text-center text-terminal-green"
                    >
                        <span className="text-terminal-amber">{">"}</span> Tech_Stack
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <GlassCard className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div>
                                    <h3 className="text-xl font-bold text-terminal-green mb-4">Frontend</h3>
                                    <ul className="space-y-2 text-terminal-gray/80">
                                        <li><span className="text-terminal-amber">•</span> Next.js 16 (App Router)</li>
                                        <li><span className="text-terminal-amber">•</span> React 18</li>
                                        <li><span className="text-terminal-amber">•</span> TypeScript</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-terminal-green mb-4">Styling</h3>
                                    <ul className="space-y-2 text-terminal-gray/80">
                                        <li><span className="text-terminal-amber">•</span> Tailwind CSS</li>
                                        <li><span className="text-terminal-amber">•</span> Framer Motion (animations)</li>
                                        <li><span className="text-terminal-amber">•</span> Glassmorphism design</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-terminal-green mb-4">Backend</h3>
                                    <ul className="space-y-2 text-terminal-gray/80">
                                        <li><span className="text-terminal-amber">•</span> Next.js API Routes</li>
                                        <li><span className="text-terminal-amber">•</span> NextAuth.js v5 (GitHub, Google OAuth + Magic Links)</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-terminal-green mb-4">Database</h3>
                                    <ul className="space-y-2 text-terminal-gray/80">
                                        <li><span className="text-terminal-amber">•</span> PostgreSQL</li>
                                        <li><span className="text-terminal-amber">•</span> Prisma ORM</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-terminal-green mb-4">UI Components</h3>
                                    <ul className="space-y-2 text-terminal-gray/80">
                                        <li><span className="text-terminal-amber">•</span> Headless UI</li>
                                        <li><span className="text-terminal-amber">•</span> Lucide Icons</li>
                                        <li><span className="text-terminal-amber">•</span> Recharts (data visualization)</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-terminal-green mb-4">Additional</h3>
                                    <ul className="space-y-2 text-terminal-gray/80">
                                        <li><span className="text-terminal-amber">•</span> React Hot Toast (notifications)</li>
                                        <li><span className="text-terminal-amber">•</span> Date-fns (date formatting)</li>
                                        <li><span className="text-terminal-amber">•</span> @auth/prisma-adapter</li>
                                        <li><span className="text-terminal-amber">•</span> bcrypt (password hashing)</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="border-t border-terminal-gray/20 pt-6">
                                <h3 className="text-xl font-bold text-terminal-green mb-4">Hosting</h3>
                                <p className="text-terminal-gray/80">
                                    <span className="text-terminal-amber">•</span> Self-hosted on Raspberry Pi
                                </p>
                            </div>
                        </GlassCard>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
