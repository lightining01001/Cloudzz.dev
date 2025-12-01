"use client";

import { motion } from "framer-motion";
import OpenStreetMap from "./Terminal/AsciiMap";
import GlassCard from "./GlassCard";

export default function MapSection() {
    return (
        <section className="py-20 px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
                <GlassCard>
                    <h2 className="text-3xl font-bold mb-8 text-terminal-green flex items-center gap-2">
                        <span className="text-terminal-amber">{">"}</span> Hackathon_Location
                    </h2>

                    <div className="space-y-4">
                        <p className="text-lg text-terminal-gray">
                            Providurova palača, Zadar
                        </p>

                        <div className="mt-6">
                            <OpenStreetMap />
                        </div>

                        <p className="text-xs sm:text-sm text-terminal-gray/60 mt-4 text-center">
                            Interactive map • ● marks the hackathon venue
                        </p>
                    </div>
                </GlassCard>
            </div>
        </section>
    );
}
