"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export default function GlobalConnectionSystem() {
    const [trunkPath, setTrunkPath] = useState("");
    const [branchPaths, setBranchPaths] = useState<string[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll();

    // Map scroll progress to tracer movement
    // 0.0 - 0.1: Fade in
    // 0.1 - 0.4: Move down trunk
    // 0.4 - 0.8: Move down branches

    const trunkProgress = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
    const branchProgress = useTransform(scrollYProgress, [0.4, 0.8], [0, 1]);

    const trunkOpacity = useTransform(scrollYProgress, [0, 0.1, 0.35, 0.4], [0, 1, 1, 0]);
    const branchOpacity = useTransform(scrollYProgress, [0.35, 0.4, 0.8, 0.9], [0, 1, 1, 0]);

    useEffect(() => {
        const calculatePaths = () => {
            const heroTitle = document.getElementById("hero-title");
            const memberCards = [
                document.getElementById("member-card-0"),
                document.getElementById("member-card-1"),
                document.getElementById("member-card-2"),
            ];

            if (!heroTitle || !containerRef.current) return;

            const containerRect = containerRef.current.getBoundingClientRect();
            const scrollY = window.scrollY;

            // Start Point: Bottom Center of Hero Title
            const heroRect = heroTitle.getBoundingClientRect();
            const startX = heroRect.left + heroRect.width / 2 - containerRect.left;
            const startY = heroRect.bottom + 20 + scrollY - (containerRect.top + scrollY);

            // Hub Point: Above the middle member card
            // We'll use the middle card (index 1) to determine the X and Y of the hub
            const middleCard = memberCards[1];
            let hubX = startX;
            let hubY = startY + 500; // Default fallback

            if (middleCard) {
                const cardRect = middleCard.getBoundingClientRect();
                hubX = cardRect.left + cardRect.width / 2 - containerRect.left;
                // Place hub somewhat above the cards
                hubY = (cardRect.top + scrollY - (containerRect.top + scrollY)) - 150;
            }

            // Calculate Trunk Path (Hero -> Hub)
            // Simple curve
            const trunkCp1Y = startY + (hubY - startY) * 0.5;
            const trunkPathStr = `M ${startX} ${startY} C ${startX} ${trunkCp1Y}, ${hubX} ${trunkCp1Y}, ${hubX} ${hubY}`;
            setTrunkPath(trunkPathStr);

            // Calculate Branch Paths (Hub -> Each Card)
            const newBranchPaths = memberCards.map((card) => {
                if (!card) return "";
                const cardRect = card.getBoundingClientRect();
                const endX = cardRect.left + cardRect.width / 2 - containerRect.left;
                const endY = cardRect.top - 20 + scrollY - (containerRect.top + scrollY);

                // Curve from Hub to Card
                const cp1Y = hubY + (endY - hubY) * 0.5;

                return `M ${hubX} ${hubY} C ${hubX} ${cp1Y}, ${endX} ${cp1Y}, ${endX} ${endY}`;
            });

            setBranchPaths(newBranchPaths.filter(p => p !== ""));
        };

        calculatePaths();
        window.addEventListener("resize", calculatePaths);

        // Recalculate after a delay to ensure layout is settled
        const timeout = setTimeout(calculatePaths, 1000);

        return () => {
            window.removeEventListener("resize", calculatePaths);
            clearTimeout(timeout);
        };
    }, []);

    return (
        <div ref={containerRef} className="absolute inset-0 pointer-events-none z-0 overflow-visible">
            <svg className="w-full h-full overflow-visible">
                <defs>
                    <linearGradient id="neonGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="var(--terminal-green)" stopOpacity="0" />
                        <stop offset="20%" stopColor="var(--terminal-green)" stopOpacity="0.3" />
                        <stop offset="80%" stopColor="var(--terminal-green)" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="var(--terminal-green)" stopOpacity="0" />
                    </linearGradient>

                    <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Trunk Line */}
                <motion.path
                    d={trunkPath}
                    fill="none"
                    stroke="url(#neonGradient)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5 }}
                />

                {/* Trunk Tracer */}
                <motion.circle
                    r="4"
                    fill="#fff"
                    filter="url(#neonGlow)"
                    style={{
                        offsetPath: `path("${trunkPath}")`,
                        offsetDistance: trunkProgress,
                        opacity: trunkOpacity,
                        scale: 1.5
                    }}
                >
                    {/* Trailing glow effect */}
                    <div className="absolute inset-0 bg-terminal-green blur-md opacity-50" />
                </motion.circle>


                {/* Branch Lines */}
                {branchPaths.map((path, index) => (
                    <g key={index}>
                        <motion.path
                            d={path}
                            fill="none"
                            stroke="url(#neonGradient)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                        />

                        {/* Branch Tracer */}
                        <motion.circle
                            r="4"
                            fill="#fff"
                            filter="url(#neonGlow)"
                            style={{
                                offsetPath: `path("${path}")`,
                                offsetDistance: branchProgress,
                                opacity: branchOpacity,
                                scale: 1.5
                            }}
                        />
                    </g>
                ))}
            </svg>
        </div>
    );
}
