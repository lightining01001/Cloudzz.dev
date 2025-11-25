"use client";

import { useEffect, useState } from "react";

export default function AsciiClock() {
    const [time, setTime] = useState("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString("en-US", { hour12: false }));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="border border-terminal-gray/30 p-4 rounded bg-white/50 backdrop-blur-sm">
            <div className="text-xs text-terminal-gray mb-1">LOCAL_TIME</div>
            <div className="font-mono text-2xl md:text-4xl font-bold text-terminal-amber tracking-widest">
                {time}
            </div>
        </div>
    );
}
