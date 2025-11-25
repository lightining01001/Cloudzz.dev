"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ART_FRAMES = [
    `
   ____ _                 _ __________
  / ___| | ___  _   _  __| |__  /__  /
 | |   | |/ _ \\| | | |/ _\` | / /  / /
 | |___| | (_) | |_| | (_| |/ /_ / /_
  \\____|_|\\___/ \\__,_|\\__,_/____/____|
  `,
    `
   ____ _                 _ __________
  / ___| | ___  _   _  __| |__  /__  /
 | |   | |/ _ \\| | | |/ _\` | / /  / /
 | |___| | (_) | |_| | (_| |/ /_ / /_
  \\____|_|\\___/ \\__,_|\\__,_/____/____|
  `,
    `
   ____ _                 _ __________
  / ___| | ___  _   _  __| |__  /__  /
 | |   | |/ _ \\| | | |/ _\` | / /  / /
 | |___| | (_) | |_| | (_| |/ /_ / /_
  \\____|_|\\___/ \\__,_|\\__,_/____/____|
  `
];

export default function AsciiArt() {
    const [frame, setFrame] = useState(0);
    const { scrollYProgress } = useScroll();
    const glitchX = useTransform(scrollYProgress, [0, 1], [0, 10]);
    const glitchSkew = useTransform(scrollYProgress, [0, 1], [0, 5]);

    useEffect(() => {
        const interval = setInterval(() => {
            setFrame((prev) => (prev + 1) % ART_FRAMES.length);
        }, 800);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            style={{ x: glitchX, skewX: glitchSkew }}
            className="relative group"
        >
            <motion.pre
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-mono text-xs md:text-sm leading-none text-terminal-green whitespace-pre overflow-hidden relative z-10"
            >
                {ART_FRAMES[frame]}
            </motion.pre>

            {/* Glitch Layer */}
            <motion.pre
                animate={{
                    opacity: [0, 0.5, 0],
                    x: [-2, 2, -2],
                }}
                transition={{
                    repeat: Infinity,
                    duration: 0.2,
                    repeatDelay: Math.random() * 5
                }}
                className="absolute top-0 left-0 font-mono text-xs md:text-sm leading-none text-terminal-amber whitespace-pre overflow-hidden opacity-50 mix-blend-screen pointer-events-none"
            >
                {ART_FRAMES[frame]}
            </motion.pre>
        </motion.div>
    );
}
