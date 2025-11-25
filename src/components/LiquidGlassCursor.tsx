"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function LiquidGlassCursor() {
    const [isMobile, setIsMobile] = useState(false);

    const cursorX = useMotionValue(0);
    const cursorY = useMotionValue(0);

    const cursorXSpring = useSpring(cursorX, { damping: 20, stiffness: 200 });
    const cursorYSpring = useSpring(cursorY, { damping: 20, stiffness: 200 });

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);

        const updateCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        window.addEventListener('mousemove', updateCursor);

        return () => {
            window.removeEventListener('mousemove', updateCursor);
            window.removeEventListener('resize', checkMobile);
        };
    }, [cursorX, cursorY]);

    if (isMobile) return null;

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9999]"
            style={{
                x: cursorXSpring,
                y: cursorYSpring,
            }}
        >
            {/* ASCII arrow cursor */}
            <svg width="24" height="24" viewBox="0 0 24 24" className="text-terminal-green">
                <path
                    d="M3 3 L3 18 L10 13 L14 21 L16 20 L12 12 L21 12 Z"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    opacity="0.9"
                />
            </svg>
        </motion.div>
    );
}
