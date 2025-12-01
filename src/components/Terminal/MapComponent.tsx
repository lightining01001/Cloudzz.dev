"use client";

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Providurova palača coordinates
const ZADAR_LAT = 44.1158;
const ZADAR_LON = 15.2251;

const MARKER_HTML = `
<div style="
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  filter: drop-shadow(0 0 8px currentColor);
  color: #00ff9d;
  animation: pulse 3s ease-in-out infinite;
">●</div>
`;

const POPUP_HTML = `
<div style="font-family: 'Space Mono', monospace; text-align: center;">
<strong style="color: #00ff9d;">Cloudzz Hackathon</strong><br/>
Providurova palača<br/>
<small>44.1158°N, 15.2251°E</small>
</div>
`;

export default function MapComponent() {
    const { resolvedTheme } = useTheme();
    const mapRef = useRef<L.Map | null>(null);
    const tileLayerRef = useRef<L.TileLayer | null>(null);

    useEffect(() => {
        if (mapRef.current) return; // Map already initialized

        // Initialize map
        const map = L.map('map', {
            center: [ZADAR_LAT, ZADAR_LON],
            zoom: 16,
            zoomControl: true,
            scrollWheelZoom: true,
        });

        mapRef.current = map;

        // Custom marker icon (green/cyan pin matching your theme)
        const customIcon = L.divIcon({
            className: 'custom-marker',
            html: MARKER_HTML,
            iconSize: [32, 32],
            iconAnchor: [16, 16],
        });

        // Add marker at hackathon location
        const marker = L.marker([ZADAR_LAT, ZADAR_LON], { icon: customIcon }).addTo(map);

        // Add popup
        marker.bindPopup(POPUP_HTML).openPopup();

        // Cleanup
        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []);

    // Update tiles when theme changes
    useEffect(() => {
        if (!mapRef.current) return;

        const isDarkMode = resolvedTheme === 'dark';

        // Remove existing tile layer
        if (tileLayerRef.current) {
            mapRef.current.removeLayer(tileLayerRef.current);
        }

        // Add appropriate tile layer based on theme
        const tileLayer = isDarkMode
            ? L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
                attribution: '© OpenStreetMap contributors © CARTO',
                maxZoom: 19,
                subdomains: 'abcd',
            })
            : L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors',
                maxZoom: 19,
            });

        tileLayer.addTo(mapRef.current);
        tileLayerRef.current = tileLayer;

    }, [resolvedTheme]);

    return (
        <div
            id="map"
            className="w-full h-[400px] rounded-lg overflow-hidden"
            style={{ background: 'var(--terminal-light)' }}
        />
    );
}
