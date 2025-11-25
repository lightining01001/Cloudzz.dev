"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

interface Particle {
    x: number;
    y: number;
    dx: number;
    dy: number;
    size: number;
    layer: 1 | 2;
}

export default function ParticlesBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const { theme } = useTheme();

    // Refs for colors to use inside animation loop without dependency issues
    const colorsRef = useRef({
        color1: "rgba(0, 163, 0, 0.3)",
        color2: "rgba(0, 163, 0, 0.1)"
    });

    useEffect(() => {
        const isDark = theme === "dark" || theme === "system"; // Default to dark for system
        // Light Mode: Blue/Purple | Dark Mode: Green/Teal
        const c1 = isDark ? "rgba(0, 255, 157, 0.4)" : "rgba(14, 165, 233, 0.4)";
        const c2 = isDark ? "rgba(0, 188, 212, 0.2)" : "rgba(139, 92, 246, 0.2)";

        colorsRef.current = { color1: c1, color2: c2 };
    }, [theme]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        const initParticles = () => {
            particles = [];
            const numberOfParticles = Math.floor((canvas.width * canvas.height) / 10000);

            for (let i = 0; i < numberOfParticles; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    dx: (Math.random() - 0.5) * 0.5,
                    dy: (Math.random() - 0.5) * 0.5,
                    size: Math.random() * 2 + 1,
                    layer: Math.random() > 0.7 ? 2 : 1, // 30% in layer 2 (mouse follow)
                });
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((particle) => {
                // Update position
                particle.x += particle.dx;
                particle.y += particle.dy;

                // Bounce off edges
                if (particle.x < 0 || particle.x > canvas.width) particle.dx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.dy *= -1;

                // Mouse interaction
                const dx = mouseRef.current.x - particle.x;
                const dy = mouseRef.current.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // Layer 1: Repel (Standard)
                if (particle.layer === 1) {
                    const maxDistance = 150;
                    if (distance < maxDistance) {
                        const force = (maxDistance - distance) / maxDistance;
                        const directionX = (dx / distance) * force * 2;
                        const directionY = (dy / distance) * force * 2;
                        particle.x -= directionX;
                        particle.y -= directionY;
                    }
                }
                // Layer 2: Attract/Follow (New)
                else {
                    const maxDistance = 300;
                    if (distance < maxDistance && distance > 10) {
                        const force = (maxDistance - distance) / maxDistance;
                        // Gentle attraction
                        particle.x += (dx / distance) * force * 0.5;
                        particle.y += (dy / distance) * force * 0.5;
                    }
                }

                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = particle.layer === 1 ? colorsRef.current.color1 : colorsRef.current.color2;

                // Add glow for layer 2
                if (particle.layer === 2) {
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = colorsRef.current.color2;
                } else {
                    ctx.shadowBlur = 0;
                }

                ctx.fill();
                ctx.shadowBlur = 0; // Reset
            });

            // Draw connections (only for layer 1 to keep it clean)
            particles.forEach((particleA, index) => {
                if (particleA.layer !== 1) return;

                for (let j = index + 1; j < particles.length; j++) {
                    const particleB = particles[j];
                    if (particleB.layer !== 1) continue;

                    const dx = particleA.x - particleB.x;
                    const dy = particleA.y - particleB.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = colorsRef.current.color1.replace("0.4)", `${0.1 - distance / 1000})`);
                        ctx.lineWidth = 1;
                        ctx.moveTo(particleA.x, particleA.y);
                        ctx.lineTo(particleB.x, particleB.y);
                        ctx.stroke();
                    }
                }
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener("resize", resizeCanvas);
        window.addEventListener("mousemove", handleMouseMove);

        resizeCanvas();
        animate();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none transition-opacity duration-1000"
        />
    );
}
