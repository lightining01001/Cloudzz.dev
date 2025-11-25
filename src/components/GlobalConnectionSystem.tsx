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
    const [isMobile, setIsMobile] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const linePathRefs = useRef<(SVGPathElement | null)[]>([]);

    const { scrollYProgress } = useScroll();

    // Scroll mapping for the three lines
    const lineProgress = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
    const lineOpacity = useTransform(scrollYProgress, [0, 0.05, 0.45, 0.55], [0, 1, 1, 0]);

    // Light pulse intensity - maintain throughout travel
    const lightIntensity = useTransform(lineProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

    // Stroke dash offset for fiber optic animation
    const strokeDashOffset = useTransform(lineProgress, (v) => 1100 - (v * 1100));

    // Detect mobile on mount
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

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

        // Avatar fill starts when arrows are arriving (at 70% progress)
        // and completes when they fully vanish (at 100%)
        const fillStart = 0.7;
        const fillProgress = Math.max(0, Math.min(1, (latest - fillStart) / (1 - fillStart)));
        const fillAmount = fillProgress * 100;

        const avatarFills = [
            document.getElementById("avatar-fill-leon"),
            document.getElementById("avatar-fill-roko"),
            document.getElementById("avatar-fill-frane"),
        ];

        avatarFills.forEach((fill) => {
            if (fill) {
                fill.style.clipPath = `circle(${fillAmount}% at 50% 50%)`;
            }
        });
    });

    useEffect(() => {
        const calculatePaths = () => {
            const heroTitle = document.getElementById("hero-title");
            const memberCards = [
                document.getElementById("member-card-0"), // Leon
                document.getElementById("member-card-1"), // Roko (middle)
                document.getElementById("member-card-2"), // Frane
            ];

            // Get avatar elements for precise targeting
            const avatars = [
                document.getElementById("avatar-leon"),
                document.getElementById("avatar-roko"),
                document.getElementById("avatar-frane"),
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

                // Target exactly at the avatar border
                const avatar = avatars[idx];
                let endX, endY;

                if (avatar) {
                    const avatarRect = avatar.getBoundingClientRect();
                    const avatarCenterX = avatarRect.left + avatarRect.width / 2 - containerRect.left;
                    const avatarCenterY = avatarRect.top + avatarRect.height / 2 + scrollY - (containerRect.top + scrollY);

                    // Calculate the radius of the avatar and stop the line exactly at the border
                    const avatarRadius = avatarRect.width / 2;
                    const offset = avatarRadius; // Stop exactly at the avatar edge

                    // Calculate the direction from start to avatar center
                    const dx = avatarCenterX - startX;
                    const dy = avatarCenterY - startY;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    // Stop the line exactly at the avatar border
                    endX = avatarCenterX - (dx / distance) * offset;
                    endY = avatarCenterY - (dy / distance) * offset;
                } else {
                    // Fallback to card position if avatar not found
                    const cardRect = card.getBoundingClientRect();
                    endX = cardRect.left + cardRect.width / 2 - containerRect.left;
                    endY = cardRect.top - 30 + scrollY - (containerRect.top + scrollY);
                }

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

    // Adjust sizes for mobile
    const arrowScale = isMobile ? 0.7 : 1;
    const glowRadius = isMobile ? 10 : 14;

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

                    {/* Simplified glass effect for Firefox compatibility */}
                    <filter id="glassDistortion" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="1" result="blur" />
                        <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="glow1" />
                        <feGaussianBlur in="SourceAlpha" stdDeviation="6" result="glow2" />
                        <feMerge>
                            <feMergeNode in="glow2" />
                            <feMergeNode in="glow1" />
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>

                    {/* Fiber optic light gradient */}
                    <linearGradient id="fiberLight" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="var(--terminal-green)" stopOpacity="0" />
                        <stop offset="30%" stopColor="var(--terminal-green)" stopOpacity="0.3" />
                        <stop offset="50%" stopColor="#00ff88" stopOpacity="1" />
                        <stop offset="70%" stopColor="var(--terminal-green)" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="var(--terminal-green)" stopOpacity="0" />
                    </linearGradient>

                    {/* Glow filter for the light pulse */}
                    <filter id="lightGlow" x="-200%" y="-200%" width="500%" height="500%">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feGaussianBlur stdDeviation="6" result="coloredBlur2" />
                        <feMerge>
                            <feMergeNode in="coloredBlur2" />
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Three Lines: Hero to Each Profile */}
                {linePaths.map((path, index) => (
                    // Render only the middle line on mobile, all lines on desktop
                    (!isMobile || index === 1) && (
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
                                    {/* Fiber Optic Light Pulse - Mobile: middle line only, Desktop: all lines */}
                                    {(isMobile ? index === 1 : true) && (
                                        <motion.path
                                            d={path}
                                            fill="none"
                                            stroke="url(#fiberLight)"
                                            strokeWidth={isMobile ? "4" : "6"}
                                            strokeLinecap="round"
                                            filter="url(#lightGlow)"
                                            strokeDasharray="100 1000"
                                            style={{
                                                strokeDashoffset: strokeDashOffset,
                                                opacity: lightIntensity
                                            }}
                                        />
                                    )}
                                </>
                            )}
                        </g>
                    )
                ))}
            </svg>
        </div>
    );
}
