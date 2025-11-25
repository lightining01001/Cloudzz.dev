"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef, useEffect } from "react";

const members = [
    {
        name: "Leon",
        role: "Full Stack Developer",
        quote: "Software is cool but have you ever had a Radio... yk I love software",
    },
    {
        name: "Roko",
        role: "Frontend Wizard",
        quote: "Vibe coding since day one",
    },
    {
        name: "Frane",
        role: "Backend Engineer",
        quote: "We are so back baby",
    },
];

const NOISE_STRING = Array(600).fill(0).map(() => Math.random() > 0.5 ? "1" : "0").join("");



const MemberCard = ({ member, index }: { member: typeof members[0], index: number }) => {
    const [glitchActive, setGlitchActive] = useState(false);
    const [showTerminal, setShowTerminal] = useState(false);
    const [terminalText, setTerminalText] = useState("");
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        setGlitchActive(true);

        // Glitch lasts 250ms, then show terminal
        timeoutRef.current = setTimeout(() => {
            setGlitchActive(false);
            setShowTerminal(true);
        }, 250);
    };

    const handleMouseLeave = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        // Hide terminal immediately
        setShowTerminal(false);

        // Trigger exit glitch
        setGlitchActive(true);

        // Glitch lasts 350ms then disappears
        timeoutRef.current = setTimeout(() => {
            setGlitchActive(false);
        }, 350);
    };

    // Typewriter effect for terminal text
    useEffect(() => {
        if (showTerminal) {
            const targetText = `> loading ${member.name.toLowerCase()}.profile...\n> quote: "${member.quote.substring(0, 25)}..."`;
            let i = 0;
            setTerminalText("");
            const interval = setInterval(() => {
                setTerminalText(targetText.slice(0, i));
                i++;
                if (i > targetText.length) clearInterval(interval);
            }, 30);
            return () => clearInterval(interval);
        }
    }, [showTerminal, member]);

    const CardContent = () => (
        <>
            <div className="w-16 h-16 bg-terminal-green/10 rounded-full flex items-center justify-center mb-6 mx-auto text-2xl font-bold text-terminal-green border border-terminal-green/20">
                {member.name[0]}
            </div>

            <h3 className="text-xl font-bold text-center mb-2">{member.name}</h3>
            <p className="text-sm text-terminal-amber text-center mb-6 font-mono">{member.role}</p>

            <div className="relative">
                <span className="absolute -top-2 -left-2 text-4xl text-terminal-gray/10">"</span>
                <p className="text-center text-terminal-gray/80 italic relative z-10">
                    {member.quote}
                </p>
                <span className="absolute -bottom-4 -right-2 text-4xl text-terminal-gray/10">"</span>
            </div>
        </>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            id={`member-card-${index}`}
            className="glass-card p-8 rounded-xl hover:scale-105 transition-transform duration-300 relative overflow-hidden group min-h-[300px]"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Main Content */}
            <div className={`transition-opacity duration-100 ${glitchActive ? "opacity-50" : "opacity-100"}`}>
                <CardContent />
            </div>

            {/* Glitch Layers */}
            {glitchActive && (
                <>
                    {/* Red Shift Layer */}
                    <div className="absolute inset-0 p-8 glitch-layer-1 bg-background/80 text-red-500 mix-blend-screen z-20 pointer-events-none">
                        <CardContent />
                    </div>
                    {/* Blue Shift Layer */}
                    <div className="absolute inset-0 p-8 glitch-layer-2 bg-background/80 text-blue-500 mix-blend-screen z-20 pointer-events-none">
                        <CardContent />
                    </div>
                    {/* ASCII Noise Overlay */}
                    <div className="absolute inset-0 z-30 opacity-30 pointer-events-none overflow-hidden font-mono text-[10px] break-all leading-none text-terminal-green mix-blend-overlay">
                        {NOISE_STRING}
                    </div>
                    {/* Static Burst */}
                    <div className="absolute inset-0 bg-white/20 z-40 animate-pulse pointer-events-none" />
                </>
            )}

            {/* Terminal Overlay */}
            <div className={`absolute inset-0 bg-black/95 z-40 flex items-center justify-center p-4 transition-opacity duration-300 ${showTerminal ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                <div className="font-mono text-terminal-green text-sm whitespace-pre-wrap">
                    {terminalText}
                    <span className="animate-pulse">_</span>
                </div>
            </div>
        </motion.div>
    );
};

export default function Members() {
    return (
        <section className="py-20 px-4 relative z-10">
            <div className="max-w-6xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold mb-12 text-center text-terminal-green"
                >
                    <span className="text-terminal-amber">ls</span> ./team_members
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {members.map((member, index) => (
                        <MemberCard key={member.name} member={member} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
