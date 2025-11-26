"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function DotClock() {
    const [time, setTime] = useState(new Date());

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        console.log("DotClock mounted");
        setMounted(true);
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    if (!mounted) return null;

    const hours = time.getHours() % 12;
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    // Calculate angles for clock hands
    const hourAngle = (hours * 30 + minutes * 0.5) * (Math.PI / 180);
    const minuteAngle = (minutes * 6 + seconds * 0.1) * (Math.PI / 180);
    const secondAngle = seconds * 6 * (Math.PI / 180);

    // 12 dots around the circle
    const dots = Array.from({ length: 12 }, (_, i) => {
        const angle = (i * 30) * (Math.PI / 180);
        const x = 24 + Math.sin(angle) * 20;
        const y = 24 - Math.cos(angle) * 20;
        return { x, y };
    });

    // Generate dots along a hand
    const generateHandDots = (angle: number, length: number, numDots: number) => {
        return Array.from({ length: numDots }, (_, i) => {
            const distance = (i / (numDots - 1)) * length;
            const x = 24 + Math.sin(angle) * distance;
            const y = 24 - Math.cos(angle) * distance;
            return { x, y };
        });
    };

    const hourDots = generateHandDots(hourAngle, 10, 6);
    const minuteDots = generateHandDots(minuteAngle, 16, 10);
    const secondDots = generateHandDots(secondAngle, 18, 12);

    return (
        <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            className="inline-block"
        >
            {/* Outer dots - smaller */}
            {dots.map((dot, i) => (
                <circle
                    key={i}
                    cx={dot.x}
                    cy={dot.y}
                    r="0.8"
                    className="fill-terminal-green/60"
                />
            ))}

            {/* Hour hand - multiple dots */}
            {hourDots.map((dot, i) => (
                <motion.circle
                    key={`hour-${i}`}
                    cx={dot.x}
                    cy={dot.y}
                    r="1"
                    className="fill-terminal-green"
                    animate={{ cx: dot.x, cy: dot.y }}
                    transition={{ duration: 0.5 }}
                />
            ))}

            {/* Minute hand - multiple dots */}
            {minuteDots.map((dot, i) => (
                <motion.circle
                    key={`minute-${i}`}
                    cx={dot.x}
                    cy={dot.y}
                    r="0.8"
                    className="fill-terminal-green"
                    animate={{ cx: dot.x, cy: dot.y }}
                    transition={{ duration: 0.5 }}
                />
            ))}

            {/* Second hand - multiple dots */}
            {secondDots.map((dot, i) => (
                <motion.circle
                    key={`second-${i}`}
                    cx={dot.x}
                    cy={dot.y}
                    r="0.6"
                    className="fill-terminal-green/80"
                    animate={{ cx: dot.x, cy: dot.y }}
                    transition={{ duration: 0.1 }}
                />
            ))}

            {/* Center dot */}
            <circle
                cx="24"
                cy="24"
                r="1.2"
                className="fill-terminal-green"
            />
        </svg>
    );
}
