"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="w-10 h-10" />; // Placeholder to prevent hydration mismatch
    }

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="fixed top-6 right-6 z-50 p-2 rounded-full glass border border-terminal-gray/20 text-terminal-gray hover:bg-terminal-gray/5 transition-colors"
            aria-label="Toggle theme"
        >
            <div className="relative w-6 h-6">
                <motion.div
                    initial={false}
                    animate={{
                        scale: theme === "dark" ? 0 : 1,
                        opacity: theme === "dark" ? 0 : 1,
                        rotate: theme === "dark" ? 90 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <Sun className="w-5 h-5" />
                </motion.div>
                <motion.div
                    initial={false}
                    animate={{
                        scale: theme === "dark" ? 1 : 0,
                        opacity: theme === "dark" ? 1 : 0,
                        rotate: theme === "dark" ? 0 : -90,
                    }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <Moon className="w-5 h-5" />
                </motion.div>
            </div>
        </motion.button>
    );
}
