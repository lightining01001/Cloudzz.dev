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
            className="relative group flex justify-center"
        >
            <motion.pre
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-mono text-[10px] md:text-xs leading-none text-terminal-green whitespace-pre overflow-hidden relative z-10 text-center mx-auto"
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
                    repeatDelay: 2
                }}
                className="absolute top-0 left-1/2 -translate-x-1/2 font-mono text-[10px] md:text-xs leading-none text-terminal-amber whitespace-pre overflow-hidden opacity-50 mix-blend-screen pointer-events-none text-center"
            >
                {ART_FRAMES[frame]}
            </motion.pre>
        </motion.div>
    );
}
