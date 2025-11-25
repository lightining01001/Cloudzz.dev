"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const COMMANDS = [
    { cmd: "init_cloudzz_protocol", output: "Initializing secure connection..." },
    { cmd: "load_modules --all", output: "Modules loaded: [REACT] [NEXT.JS] [TAILWIND] [FRAMER]" },
    { cmd: "ping zadar.server", output: "Pong! Latency: 1ms" },
    { cmd: "whoami", output: "User: Guest | Role: Observer" },
    { cmd: "cat team_status.txt", output: "Status: READY TO DEPLOY" },
];

export default function FakeShell() {
    const [lines, setLines] = useState<{ cmd: string; output: string }[]>([]);
    const [currentCmdIndex, setCurrentCmdIndex] = useState(0);
    const [typingCmd, setTypingCmd] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (currentCmdIndex >= COMMANDS.length) return;

        const targetCmd = COMMANDS[currentCmdIndex].cmd;
        let charIndex = 0;

        const typeInterval = setInterval(() => {
            if (charIndex <= targetCmd.length) {
                setTypingCmd(targetCmd.slice(0, charIndex));
                charIndex++;
            } else {
                clearInterval(typeInterval);
                setTimeout(() => {
                    setLines((prev) => [...prev, COMMANDS[currentCmdIndex]]);
                    setTypingCmd("");
                    setCurrentCmdIndex((prev) => prev + 1);
                }, 500); // Delay before executing next command
            }
        }, 100); // Typing speed

        return () => clearInterval(typeInterval);
    }, [currentCmdIndex]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [lines, typingCmd]);

    return (
        <div className="font-mono text-sm md:text-base h-full flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-2" ref={scrollRef}>
                {lines.map((line, index) => (
                    <div key={index}>
                        <div className="flex items-center gap-2 text-terminal-green">
                            <span>$</span>
                            <span>{line.cmd}</span>
                        </div>
                        <div className="text-terminal-gray pl-4 mb-2">{line.output}</div>
                    </div>
                ))}

                {currentCmdIndex < COMMANDS.length && (
                    <div className="flex items-center gap-2 text-terminal-green">
                        <span>$</span>
                        <span>{typingCmd}</span>
                        <motion.span
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ repeat: Infinity, duration: 0.8 }}
                            className="w-2 h-4 bg-terminal-green inline-block"
                        />
                    </div>
                )}

                {currentCmdIndex >= COMMANDS.length && (
                    <div className="flex items-center gap-2 text-terminal-green">
                        <span>$</span>
                        <motion.span
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ repeat: Infinity, duration: 0.8 }}
                            className="w-2 h-4 bg-terminal-green inline-block"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
