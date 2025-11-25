"use client";

import CountdownWidget from "./CountdownWidget";
import { motion } from "framer-motion";

export default function HackathonCountdownWidget() {
    return (
        <motion.div
            className="border border-terminal-gray/30 p-4 rounded bg-white/50 dark:bg-black/50 backdrop-blur-sm mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <div className="text-xs text-terminal-gray mb-1">HACKATHON</div>
            <div className="font-mono text-sm text-terminal-green">Providurova palača, Zadar</div>
            <div className="font-mono text-sm text-terminal-green mb-2">December 2, 2025</div>
            <CountdownWidget />
        </motion.div>
    );
}
