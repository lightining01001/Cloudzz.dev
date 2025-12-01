"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import DotClock from "./DotClock";

// Target date: December 2, 2025 (Zadar Hackathon start)
const TARGET_DATE = new Date("2025-12-02T10:00:00");

export default function CountdownWidget() {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const update = () => {
            const now = new Date();
            const diff = TARGET_DATE.getTime() - now.getTime();
            if (diff <= 0) {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);
            setTimeLeft({ days, hours, minutes, seconds });
        };
        update();
        const intervalId = setInterval(update, 1000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <motion.div
            className="mt-2 text-lg md:text-xl font-mono text-terminal-green flex items-center gap-2 md:gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Nothing Phone-style dot clock */}
            <DotClock />
            <span className="font-bold tracking-wide">
                {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
            </span>
        </motion.div>
    );
}
