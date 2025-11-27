"use client";

import { useEffect, useRef } from "react";

export default function StormCloud() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        console.log("StormCloud mounted");
        const canvas = canvasRef.current;
        if (!canvas) return;

        const gl = canvas.getContext("webgl");
        if (!gl) {
            console.error("WebGL not supported");
            return;
        }

        // Vertex Shader
        const vsSource = `
            attribute vec4 aVertexPosition;
            void main() {
                gl_Position = aVertexPosition;
            }
        `;

        // Fragment Shader
        const fsSource = `
            precision mediump float;

            uniform vec2 u_resolution;
            uniform float u_time;
            uniform float u_scroll;
            uniform float u_seed;
            uniform float u_lightning;

            // Pseudo-random hash
            float hash(vec2 p) {
                return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
            }

            // 2D Noise
            float noise(vec2 p) {
                vec2 i = floor(p);
                vec2 f = fract(p);
                f = f * f * (3.0 - 2.0 * f);
                float a = hash(i);
                float b = hash(i + vec2(1.0, 0.0));
                float c = hash(i + vec2(0.0, 1.0));
                float d = hash(i + vec2(1.0, 1.0));
                return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
            }

            // Fractal Brownian Motion for Clouds
            float fbm(vec2 p) {
                float v = 0.0;
                float a = 0.5;
                for (int i = 0; i < 5; i++) {
                    v += a * noise(p);
                    p *= 2.0;
                    a *= 0.5;
                }
                return v;
            }

            // FBM for Lightning (Sharper, more jagged)
            float fbmLightning(vec2 p) {
                float v = 0.0;
                float a = 0.5;
                for (int i = 0; i < 6; i++) {
                    v += a * abs(noise(p) * 2.0 - 1.0); // Turbulence
                    p *= 2.0;
                    a *= 0.5;
                }
                return v;
            }



            // Procedural Cityscape
            float cityscape(vec2 uv, float verticalShift) {
                float y = 0.0;
                // Layer 1 (Background)
                float x1 = floor(uv.x * 15.0);
                float h1 = hash(vec2(x1, 12.0)) * 0.25;
                // Apply vertical shift: subtract shift from height threshold
                if (uv.y < h1 - verticalShift) y += 0.5; 
                
                // Layer 2 (Foreground)
                float x2 = floor(uv.x * 10.0 + 0.5);
                float h2 = hash(vec2(x2, 45.0)) * 0.4;
                // Thin antennas
                if (fract(uv.x * 10.0 + 0.5) > 0.4 && fract(uv.x * 10.0 + 0.5) < 0.6 && uv.y < h2 + 0.1 - verticalShift) y += 0.8;
                // Main building body
                if (uv.y < h2 - verticalShift) y = 1.0;
                
                return y;
            }

            void main() {
                vec2 uv = gl_FragCoord.xy / u_resolution.xy;
                // Correct aspect ratio
                uv.x *= u_resolution.x / u_resolution.y;

                // Scroll influence
                float scrollFactor = clamp(u_scroll, 0.0, 1.0);
                
                // Cloud movement
                vec2 q = uv;
                q.x += 0.01 * u_time; 
                q.y += 0.005 * u_time; 

                // Basic Cloud Layer
                // Increased frequency for better detail on small screens
                float cloud = fbm(q * 8.0 + fbm(q * 8.0));
                
                // Increased base density for mobile visibility
                float density = mix(0.6, 0.9, scrollFactor); 
                float cloudCover = smoothstep(0.3, density, cloud);

                // Colors
                vec3 skyColor = mix(vec3(0.05, 0.1, 0.2), vec3(0.0, 0.0, 0.05), scrollFactor);
                vec3 cloudColor = mix(vec3(0.2, 0.25, 0.3), vec3(0.1, 0.1, 0.15), scrollFactor);
                
                vec3 color = mix(skyColor, cloudColor, cloudCover);

                // Rain Layer - Start at Team Members (0.25)
                if (scrollFactor > 0.25) {
                    vec2 rainUV = uv;
                    rainUV.y += u_time * 2.0;
                    rainUV.x += u_time * 0.1;
                    rainUV.y *= 20.0;
                    float rainNoise = noise(rainUV * vec2(50.0, 1.0));
                    float rain = smoothstep(0.8 + (0.15 * (1.0 - scrollFactor)), 1.0, rainNoise);
                    color += vec3(0.4, 0.5, 0.6) * rain * 0.3 * scrollFactor;
                }

                // Cityscape Layer (Silhouettes)
                // Calculate vertical shift for rising effect
                // At scroll 0, shift is 0.3 (buildings hidden). At scroll 0.15, shift is 0.0 (buildings fully up).
                float verticalShift = (1.0 - smoothstep(0.0, 0.15, scrollFactor)) * 0.3;
                
                // Pass shift to cityscape (we need to update the function signature first, or just inline the shift logic here)
                // Actually, let's update the cityscape function to use the shift.
                // But since I can't easily change the function signature in this replace block without changing the whole file structure,
                // I will modify the cityscape function call to include the shift in the UV or modify the function itself in a separate block.
                // Wait, I can replace the whole main and cityscape function if needed, or just the main part and use a uniform-like approach?
                // No, let's just update the cityscape function in a separate call or do it all here if I include the function.
                // I'll assume I update the function in the next step or do it now.
                // Let's do the lightning part first here and the cityscape call.
                
                // I will update the cityscape function to take 'verticalShift' instead of 'scroll' or in addition.
                // For now, let's assume I'll update the function.
                float buildings = cityscape(uv, verticalShift); 
                
                // Visibility is now controlled by the physical rise, so we can simplify the mixing
                color = mix(color, vec3(0.02, 0.02, 0.05), buildings);

                // Vignette (apply before lightning so lightning glows through?)
                float vignette = 1.0 - length(gl_FragCoord.xy / u_resolution.xy - 0.5) * 1.0;
                color *= vignette;

                // Realistic Lightning Bolts (Render LAST to be on top)
                if (u_lightning > 0.0) {
                    // 1. Global Flash (Ambient) - boosted
                    color += vec3(0.8, 0.9, 1.0) * u_lightning * 0.2; 
                    
                    // 2. The Bolt
                    vec2 boltUV = uv;
                    
                    // Random Angle (Skew)
                    float angle = (hash(vec2(u_seed, 2.0)) - 0.5) * 1.5; 
                    boltUV.x += boltUV.y * angle;
                    
                    // Position
                    boltUV.x -= 0.5 + (hash(vec2(u_seed, 1.0)) - 0.5) * 2.0; 
                    
                    // Distort the line
                    float boltDistortion = fbmLightning(vec2(boltUV.y * 15.0, u_time)) * 0.05;
                    float boltWidth = abs(boltUV.x + boltDistortion);
                    
                    // Glow intensity - significantly boosted
                    float boltIntensity = 0.004 / max(boltWidth, 0.0001); 
                    
                    // Mask: Fade out at bottom (behind buildings?), keep top strong
                    // Less fade at bottom now to ensure visibility
                    boltIntensity *= smoothstep(0.0, 0.1, boltUV.y); 
                    
                    // Add electric color - super bright
                    vec3 boltColor = vec3(0.8, 0.9, 1.0) * boltIntensity * u_lightning * 4.0; 
                    
                    // Add to scene
                    color += boltColor;
                }



                gl_FragColor = vec4(color, 1.0);
            }
        `;

        // Compile Shaders
        const compileShader = (source: string, type: number) => {
            const shader = gl.createShader(type);
            if (!shader) return null;
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error("Shader compile error:", gl.getShaderInfoLog(shader));
                gl.deleteShader(shader);
                return null;
            }
            return shader;
        };

        const vertexShader = compileShader(vsSource, gl.VERTEX_SHADER);
        const fragmentShader = compileShader(fsSource, gl.FRAGMENT_SHADER);

        if (!vertexShader || !fragmentShader) return;

        const program = gl.createProgram();
        if (!program) return;
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error("Program link error:", gl.getProgramInfoLog(program));
            return;
        }

        gl.useProgram(program);

        // Buffers
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        const positions = [
            -1.0, 1.0,
            1.0, 1.0,
            -1.0, -1.0,
            1.0, -1.0,
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

        const positionAttributeLocation = gl.getAttribLocation(program, "aVertexPosition");
        gl.enableVertexAttribArray(positionAttributeLocation);
        gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

        // Uniforms
        const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
        const timeLocation = gl.getUniformLocation(program, "u_time");
        const scrollLocation = gl.getUniformLocation(program, "u_scroll");
        const lightningLocation = gl.getUniformLocation(program, "u_lightning");
        const seedLocation = gl.getUniformLocation(program, "u_seed");

        let startTime = performance.now();
        let lightningIntensity = 0;
        let nextLightningTime = Math.random() * 3000 + 2000;
        let currentSeed = Math.random() * 100.0;

        const render = (time: number) => {
            resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement);
            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

            gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);
            gl.uniform1f(timeLocation, (time - startTime) * 0.001);
            gl.uniform1f(seedLocation, currentSeed);

            // Scroll calculation (0 to 1 based on page height)
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const scrollFraction = maxScroll > 0 ? window.scrollY / maxScroll : 0;
            gl.uniform1f(scrollLocation, scrollFraction);

            // Lightning Logic - Start at Terminal (0.5)
            // UPDATE: User requested lightning ONLY when scrolled down more (Terminal section).
            if (time > startTime + nextLightningTime && scrollFraction > 0.5) {
                lightningIntensity = 1.0;
                nextLightningTime = time + Math.random() * 3000 + 1000; // More frequent: 1-4s
                currentSeed = Math.random() * 100.0; // New random position for this strike
            }

            if (lightningIntensity > 0) {
                lightningIntensity -= 0.1; // Fade out
                if (lightningIntensity < 0) lightningIntensity = 0;
            }
            gl.uniform1f(lightningLocation, lightningIntensity);

            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
            requestAnimationFrame(render);
        };

        requestAnimationFrame(render);

        // Helper
        function resizeCanvasToDisplaySize(canvas: HTMLCanvasElement) {
            const dpr = window.devicePixelRatio || 1;
            const displayWidth = Math.floor(canvas.clientWidth * dpr);
            const displayHeight = Math.floor(canvas.clientHeight * dpr);

            if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
                canvas.width = displayWidth;
                canvas.height = displayHeight;
            }
        }

        return () => {
            // Cleanup if needed
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-80"
            style={{ width: "100vw", height: "100vh" }}
        />
    );
}
