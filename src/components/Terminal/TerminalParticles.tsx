"use client";

import { useEffect, useRef } from "react";

interface Particle {
    x: number;
    y: number;
    dx: number;
    dy: number;
    size: number;
    life: number;
}

export default function TerminalParticles() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        const particles: Particle[] = [];

        const resizeCanvas = () => {
            canvas.width = container.clientWidth;
            canvas.height = container.clientHeight;
        };

        const createParticle = (x: number, y: number) => {
            particles.push({
                x,
                y,
                dx: (Math.random() - 0.5) * 2,
                dy: (Math.random() - 0.5) * 2,
                size: Math.random() * 2 + 1,
                life: 1.0
            });
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Create particles near mouse
            if (Math.random() > 0.5) {
                createParticle(mouseRef.current.x, mouseRef.current.y);
            }

            // Update and draw particles
            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.x += p.dx;
                p.y += p.dy;
                p.life -= 0.02;

                if (p.life <= 0) {
                    particles.splice(i, 1);
                    continue;
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 255, 0, ${p.life * 0.5})`; // Terminal green
                ctx.fill();
            }

            // Connect particles
            particles.forEach((p1, i) => {
                particles.slice(i + 1).forEach(p2 => {
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 50) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(0, 255, 0, ${0.2 * (1 - dist / 50)})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                });
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        };

        const ro = new ResizeObserver(resizeCanvas);
        ro.observe(container);

        canvas.addEventListener("mousemove", handleMouseMove);
        resizeCanvas();
        animate();

        return () => {
            ro.disconnect();
            canvas.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div ref={containerRef} className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            <canvas ref={canvasRef} className="block" />
        </div>
    );
}
