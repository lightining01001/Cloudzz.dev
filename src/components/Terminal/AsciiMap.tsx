"use client";

import dynamic from 'next/dynamic';

// Dynamically import the map component with no SSR
const MapComponent = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] rounded-lg overflow-hidden flex items-center justify-center bg-terminal-light/50">
      <div className="text-xs font-mono text-terminal-green animate-pulse">
        LOADING MAP...
      </div>
    </div>
  ),
});

export default function OpenStreetMap() {
  return <MapComponent />;
}
