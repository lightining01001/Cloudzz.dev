"use client";

import { Mail } from "lucide-react";
import GlassCard from "./GlassCard";

export default function Contact() {
    return (
        <section className="py-20 px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
                <GlassCard>
                    <h2 className="text-3xl font-bold mb-6 text-terminal-green flex items-center justify-center gap-3">
                        <Mail className="w-8 h-8 text-terminal-amber" />
                        <span><span className="text-terminal-amber">./</span>contact_us</span>
                    </h2>

                    <p className="text-lg text-terminal-gray mb-8">
                        Ready to collaborate or just want to say hi?
                        <br />
                        Our inbox is always open.
                    </p>

                    <a
                        href="mailto:team@cloudzz.dev"
                        className="inline-flex items-center gap-2 bg-terminal-green text-white px-8 py-3 rounded-full font-bold hover:bg-terminal-green/90 transition-colors hover:scale-105 transform duration-200"
                    >
                        <Mail className="w-5 h-5" />
                        team@cloudzz.dev
                    </a>
                </GlassCard>

                <footer className="mt-20 text-sm text-terminal-gray/40 font-mono">
                    <p className="mb-2">Built with ♥, a little AI and a lot of caffeine • Powered by Next.js</p>
                    <p>© {new Date().getFullYear()} Cloudzz Hackathon Team — Zadar. All rights reserved.</p>
                </footer>
            </div>
        </section>
    );
}
