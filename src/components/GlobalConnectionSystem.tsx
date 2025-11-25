"use client";

import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useEffect, useState, useRef } from "react";

// Helper to get a point along an SVG path
function getPointAtLength(path: SVGPathElement | null, length: number) {
    if (!path) return { x: 0, y: 0 };
    try {
        const point = path.getPointAtLength(length);
        return { x: point.x, y: point.y };
    } catch {
        return { x: 0, y: 0 };
    }
}

export default function GlobalConnectionSystem() {
    const [linePaths, setLinePaths] = useState<string[]>([]);
    const [lineTracerPos, setLineTracerPos] = useState<Array<{ x: number; y: number }>>([]);

    const containerRef = useRef<HTMLDivElement>(null);
    const linePathRefs = useRef<(SVGPathElement | null)[]>([]);

    const { scrollYProgress } = useScroll();

    // Scroll mapping for the three lines
    const lineProgress = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
    const lineOpacity = useTransform(scrollYProgress, [0, 0.05, 0.45, 0.55], [0, 1, 1, 0]);

    // Update tracer positions based on scroll
    useMotionValueEvent(lineProgress, "change", (latest) => {
        const newPositions = linePathRefs.current.map((pathRef) => {
            if (pathRef) {
                const totalLength = pathRef.getTotalLength();
                return getPointAtLength(pathRef, totalLength * latest);
            }
            return { x: 0, y: 0 };
        });
        setLineTracerPos(newPositions);
    });

    useEffect(() => {
        const calculatePaths = () => {
            const heroTitle = document.getElementById("hero-title");
            const memberCards = [
                document.getElementById("member-card-0"), // Leon
                document.getElementById("member-card-1"), // Roko (middle)
                document.getElementById("member-card-2"), // Frane
            ];

            if (!heroTitle || !containerRef.current) return;

            const containerRect = containerRef.current.getBoundingClientRect();
            const scrollY = window.scrollY;

            // Start Point: Bottom Center of Hero Title
            const heroRect = heroTitle.getBoundingClientRect();
            const startX = heroRect.left + heroRect.width / 2 - containerRect.left;
            const startY = heroRect.bottom + 40 + scrollY - (containerRect.top + scrollY);

            // Create paths: curved for Leon & Frane, straight for Roko (middle)
            const newLinePaths = memberCards.map((card, idx) => {
                if (!card) {
                    console.warn(`Card ${idx} not found`);
                    return "";
                }

                const cardRect = card.getBoundingClientRect();
                const endX = cardRect.left + cardRect.width / 2 - containerRect.left;
                const endY = cardRect.top - 30 + scrollY - (containerRect.top + scrollY);

                // Middle card (Roko, index 1) gets a straight vertical line
                if (idx === 1) {
                    const path = `M ${startX} ${startY} L ${endX} ${endY}`;
                    console.log(`Generated STRAIGHT path for card ${idx} (Roko):`, { startX, startY, endX, endY });
                    return path;
                }

                // Other cards get smooth curves
                const distance = endY - startY;
                const cp1X = startX;
                const cp1Y = startY + distance * 0.3;
                const cp2X = endX;
                const cp2Y = startY + distance * 0.7;

                const path = `M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`;
                console.log(`Generated curved path for card ${idx}:`, { startX, startY, endX, endY });
                return path;
            });

            console.log(`Total paths created: ${newLinePaths.filter(p => p !== "").length}`);
            setLinePaths(newLinePaths.filter(p => p !== ""));
        };

        calculatePaths();
        window.addEventListener("resize", calculatePaths);

        const timeout1 = setTimeout(calculatePaths, 500);
        const timeout2 = setTimeout(calculatePaths, 1500);

        return () => {
            window.removeEventListener("resize", calculatePaths);
            clearTimeout(timeout1);
            clearTimeout(timeout2);
        };
    }, []);

    return (
        <div ref={containerRef} className="absolute inset-0 pointer-events-none z-0 overflow-visible">
            <svg className="w-full h-full overflow-visible">
                <defs>
                    <linearGradient id="neonGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="var(--terminal-green)" stopOpacity="0.05" />
                        <stop offset="30%" stopColor="var(--terminal-green)" stopOpacity="0.3" />
                        <stop offset="70%" stopColor="var(--terminal-green)" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="var(--terminal-green)" stopOpacity="0.05" />
                    </linearGradient>

                    <filter id="neonGlow" x="-100%" y="-100%" width="300%" height="300%">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>

                    {/* Glassmorphism ball filter with distortion */}
                    <filter id="glassDistortion" x="-100%" y="-100%" width="300%" height="300%">
                        {/* Displacement map for glass distortion effect */}
                        <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="1" result="turbulence" />
                        <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="5" xChannelSelector="R" yChannelSelector="G" result="displacement" />

                        {/* Blur for frosted glass effect */}
                        <feGaussianBlur in="displacement" stdDeviation="2" result="blur" />

                        {/* Glow around the ball */}
                        <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="glow1" />
                        <feGaussianBlur in="SourceAlpha" stdDeviation="8" result="glow2" />

                        <feMerge>
                            <feMergeNode in="glow2" />
                            <feMergeNode in="glow1" />
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>

                    {/* Glassmorphism gradient for the ball */}
                    <radialGradient id="glassGradient">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                        <stop offset="50%" stopColor="var(--terminal-green)" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="var(--terminal-green)" stopOpacity="0.2" />
                    </radialGradient>
                </defs>

                {/* Three Lines: Hero to Each Profile */}
                {linePaths.map((path, index) => (
                    <g key={index}>
                        {path && (
                            <>
                                <motion.path
                                    ref={(el) => {
                                        linePathRefs.current[index] = el;
                                    }}
                                    d={path}
                                    fill="none"
                                    stroke="var(--terminal-green)"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    filter="url(#neonGlow)"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 0.4 }}
                                    transition={{ duration: 2, delay: index * 0.2, ease: "easeInOut" }}
                                />

                                {/* Transparent Arrow Tracer - Skip middle line (index 1) */}
                                {index !== 1 && (
                                    <g transform={`translate(${lineTracerPos[index]?.x || 0}, ${lineTracerPos[index]?.y || 0})`}>
                                        {/* Outer glow */}
                                        <motion.circle
                                            r="14"
                                            fill="var(--terminal-green)"
                                            opacity="0.05"
                                            style={{ opacity: lineOpacity }}
                                        />

                                        {/* Arrow shape pointing down */}
                                        <motion.path
                                            d="M 0,-8 L 4,-3 L 1,-3 L 1,8 L -1,8 L -1,-3 L -4,-3 Z"
                                            fill="var(--terminal-green)"
                                            stroke="var(--terminal-green)"
                                            strokeWidth="0.5"
                                            opacity="0.4"
                                            filter="url(#glassDistortion)"
                                            style={{ opacity: lineOpacity }}
                                        />

                                        {/* Inner highlight for glass effect */}
                                        <motion.path
                                            d="M -0.5,-5 L 1,-3.5 L 0.5,-3.5 L 0.5,3 L -0.5,3 Z"
                                            fill="#ffffff"
                                            opacity="0.3"
                                            style={{ opacity: lineOpacity }}
                                        />
                                    </g>
                                )}
                            </>
                        )}
                    </g>
                ))}
            </svg>
        </div>
    );
}
