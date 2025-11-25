"use client";

import { useEffect, useState } from "react";

// Mock data for Zadar since we don't have an API key yet
const MOCK_WEATHER = {
    temp: 22,
    condition: "Sunny",
    humidity: 45,
    wind: 12,
};

export default function WeatherWidget() {
    const [weather, setWeather] = useState(MOCK_WEATHER);

    // In a real implementation, we would fetch from OpenWeatherMap here
    // useEffect(() => { ... }, []);

    return (
        <div className="border border-terminal-gray/30 p-4 rounded bg-white/50 backdrop-blur-sm">
            <div className="text-xs text-terminal-gray mb-1">WEATHER_ZADAR</div>
            <div className="flex items-center gap-4">
                <div className="text-4xl">☀️</div>
                <div>
                    <div className="font-mono text-2xl font-bold text-terminal-green">
                        {weather.temp}°C
                    </div>
                    <div className="text-sm text-terminal-gray font-mono">
                        {weather.condition}
                    </div>
                </div>
            </div>
            <div className="mt-2 text-xs font-mono text-terminal-gray/80 grid grid-cols-2 gap-2">
                <div>HUM: {weather.humidity}%</div>
                <div>WIND: {weather.wind}km/h</div>
            </div>
        </div>
    );
}
