"use client";

import { useEffect, useState } from "react";

// Zadar coordinates: 44.1194° N, 15.2314° E
const WEATHER_API_URL =
    "https://api.open-meteo.com/v1/forecast?latitude=44.1194&longitude=15.2314&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m";

// WMO Weather interpretation codes (WW)
// https://open-meteo.com/en/docs
const getWeatherInfo = (code: number) => {
    if (code === 0) return { condition: "Clear", icon: "☀️" };
    if (code === 1) return { condition: "Mainly Clear", icon: "🌤️" };
    if (code === 2) return { condition: "Partly Cloudy", icon: "⛅" };
    if (code === 3) return { condition: "Overcast", icon: "☁️" };
    if (code >= 45 && code <= 48) return { condition: "Fog", icon: "🌫️" };
    if (code >= 51 && code <= 55) return { condition: "Drizzle", icon: "🌦️" };
    if (code >= 56 && code <= 57) return { condition: "Freezing Drizzle", icon: "🌨️" };
    if (code >= 61 && code <= 65) return { condition: "Rain", icon: "🌧️" };
    if (code >= 66 && code <= 67) return { condition: "Freezing Rain", icon: "🌨️" };
    if (code >= 71 && code <= 77) return { condition: "Snow", icon: "❄️" };
    if (code >= 80 && code <= 82) return { condition: "Rain Showers", icon: "🌧️" };
    if (code >= 85 && code <= 86) return { condition: "Snow Showers", icon: "❄️" };
    if (code >= 95 && code <= 99) return { condition: "Thunderstorm", icon: "⛈️" };
    return { condition: "Unknown", icon: "❓" };
};

interface WeatherData {
    temp: number;
    condition: string;
    icon: string;
    humidity: number;
    wind: number;
}

export default function WeatherWidget() {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchWeather = async () => {
        try {
            const response = await fetch(WEATHER_API_URL);
            if (!response.ok) throw new Error("Failed to fetch weather");
            const data = await response.json();

            const current = data.current;
            const weatherInfo = getWeatherInfo(current.weather_code);

            setWeather({
                temp: Math.round(current.temperature_2m),
                condition: weatherInfo.condition,
                icon: weatherInfo.icon,
                humidity: current.relative_humidity_2m,
                wind: Math.round(current.wind_speed_10m),
            });
            setError(false);
        } catch (err) {
            console.error("Error fetching weather:", err);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWeather();
        // Update every hour
        const interval = setInterval(fetchWeather, 60 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return (
            <div className="border border-terminal-gray/30 p-4 rounded bg-white/50 backdrop-blur-sm animate-pulse">
                <div className="h-4 w-24 bg-terminal-gray/20 rounded mb-2"></div>
                <div className="h-10 w-full bg-terminal-gray/20 rounded mb-2"></div>
                <div className="h-4 w-full bg-terminal-gray/20 rounded"></div>
            </div>
        );
    }

    if (error || !weather) {
        return (
            <div className="border border-terminal-gray/30 p-4 rounded bg-white/50 backdrop-blur-sm">
                <div className="text-xs text-terminal-gray mb-1">WEATHER_ZADAR</div>
                <div className="text-terminal-red text-sm">Unavailable</div>
            </div>
        );
    }

    return (
        <div className="border border-terminal-gray/30 p-4 rounded bg-white/50 backdrop-blur-sm transition-all hover:bg-white/60">
            <div className="text-xs text-terminal-gray mb-1">WEATHER_ZADAR</div>
            <div className="flex items-center gap-4">
                <div className="text-4xl" role="img" aria-label={weather.condition}>
                    {weather.icon}
                </div>
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
