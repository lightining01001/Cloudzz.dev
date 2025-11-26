import { VectorTile } from '@mapbox/vector-tile';
import Protobuf from 'pbf';

// Zadar, Croatia coordinates - Providurova palača
const ZADAR_LAT = 44.1158;
const ZADAR_LON = 15.2251;
const DEFAULT_ZOOM = 14;

interface Point {
    x: number;
    y: number;
}

interface TileCoord {
    x: number;
    y: number;
    z: number;
}

export class AsciiMapRenderer {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private centerLat: number;
    private centerLon: number;
    private zoom: number;
    private offsetX: number = 0;
    private offsetY: number = 0;
    private tileCache: Map<string, VectorTile> = new Map();
    private charWidth: number = 8;
    private charHeight: number = 16;
    private isDarkMode: boolean = true;

    constructor(canvas: HTMLCanvasElement, isDarkMode: boolean = true) {
        this.canvas = canvas;
        const context = canvas.getContext('2d');
        if (!context) {
            throw new Error('Could not get 2D context from canvas');
        }
        this.ctx = context;
        this.centerLat = ZADAR_LAT;
        this.centerLon = ZADAR_LON;
        this.zoom = DEFAULT_ZOOM;
        this.isDarkMode = isDarkMode;

        // Set up canvas styling
        this.ctx.font = '16px "Space Mono", monospace';
        this.ctx.textBaseline = 'top';

        // Measure actual character dimensions
        const metrics = this.ctx.measureText('█');
        this.charWidth = metrics.width;
    }

    // Convert lat/lon to Web Mercator tile coordinates
    private latLonToTile(lat: number, lon: number, zoom: number): TileCoord {
        const n = Math.pow(2, zoom);
        const x = Math.floor((lon + 180) / 360 * n);
        const latRad = lat * Math.PI / 180;
        const y = Math.floor((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2 * n);
        return { x, y, z: zoom };
    }

    // Convert lat/lon to pixel coordinates
    private latLonToPixel(lat: number, lon: number): Point {
        const scale = Math.pow(2, this.zoom);
        const worldSize = 256 * scale;

        const x = (lon + 180) / 360 * worldSize;
        const latRad = lat * Math.PI / 180;
        const y = (1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2 * worldSize;

        return { x, y };
    }

    // Convert pixel to screen coordinates
    private pixelToScreen(pixel: Point): Point {
        const centerPixel = this.latLonToPixel(this.centerLat, this.centerLon);
        const canvasCenterX = this.canvas.width / 2;
        const canvasCenterY = this.canvas.height / 2;

        return {
            x: pixel.x - centerPixel.x + canvasCenterX + this.offsetX,
            y: pixel.y - centerPixel.y + canvasCenterY + this.offsetY
        };
    }

    // Fetch vector tile from OSM
    private async fetchTile(tileCoord: TileCoord): Promise<VectorTile | null> {
        const key = `${tileCoord.z}/${tileCoord.x}/${tileCoord.y}`;

        // Check cache first
        if (this.tileCache.has(key)) {
            return this.tileCache.get(key)!;
        }

        try {
            // Using OpenMapTiles demo server (free, no auth required)
            // Alternative sources if this fails:
            // - https://tiles.openfreemap.org/planet/${z}/${x}/${y}.pbf
            // - https://demotiles.maplibre.org/tiles/v3/${z}/${x}/${y}.pbf
            const url = `https://demotiles.maplibre.org/tiles/v3/${tileCoord.z}/${tileCoord.x}/${tileCoord.y}.pbf`;

            console.log(`Fetching tile: ${key} from ${url}`);

            const response = await fetch(url);
            if (!response.ok) {
                console.warn(`Failed to fetch tile ${key}: ${response.status} ${response.statusText}`);
                return null;
            }

            const arrayBuffer = await response.arrayBuffer();
            const pbf = new Protobuf(arrayBuffer);
            const tile = new VectorTile(pbf);

            console.log(`Successfully loaded tile ${key}, layers:`, Object.keys(tile.layers));

            // Cache the tile
            this.tileCache.set(key, tile);

            return tile;
        } catch (error) {
            console.error(`Error fetching tile ${key}:`, error);
            return null;
        }
    }

    // Get ASCII character based on feature type
    private getAsciiChar(featureType: string, layerName: string): string {
        // Map feature types to ASCII characters
        if (layerName === 'water' || featureType === 'water') {
            return '~';
        }
        if (layerName === 'building' || layerName === 'buildings') {
            return '█';
        }
        if (layerName === 'roads' || layerName === 'transportation') {
            return '·';
        }
        if (layerName === 'landuse') {
            return '░';
        }
        return ' ';
    }

    // Get color for ASCII character
    private getCharColor(layerName: string): string {
        if (this.isDarkMode) {
            switch (layerName) {
                case 'water': return '#00bcd4';
                case 'building':
                case 'buildings': return '#a3a3a3';
                case 'roads':
                case 'transportation': return '#e5e5e5';
                case 'landuse': return '#00ff9d40';
                default: return '#666666';
            }
        } else {
            switch (layerName) {
                case 'water': return '#0ea5e9';
                case 'building':
                case 'buildings': return '#475569';
                case 'roads':
                case 'transportation': return '#1e293b';
                case 'landuse': return '#8b5cf640';
                default: return '#999999';
            }
        }
    }

    // Clear canvas
    private clearCanvas() {
        this.ctx.fillStyle = this.isDarkMode ? '#0a0a0a' : '#f0f4f8';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    // Render ASCII grid
    public async render() {
        this.clearCanvas();

        // Calculate visible tiles
        const tileCoord = this.latLonToTile(this.centerLat, this.centerLon, this.zoom);

        // For simplicity, render a 3x3 grid of tiles centered on the location
        const tilesToRender = [];
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                tilesToRender.push({
                    x: tileCoord.x + dx,
                    y: tileCoord.y + dy,
                    z: this.zoom
                });
            }
        }

        // Fetch and render tiles
        for (const tile of tilesToRender) {
            await this.renderTile(tile);
        }

        // Render the hackathon marker
        this.renderMarker();
    }

    // Render a single tile with ASCII characters
    private async renderTile(tileCoord: TileCoord) {
        const tile = await this.fetchTile(tileCoord);
        if (!tile) return;

        // Calculate character grid dimensions
        const cols = Math.floor(this.canvas.width / this.charWidth);
        const rows = Math.floor(this.canvas.height / this.charHeight);

        // Create a grid to accumulate features
        const grid: Map<string, { char: string; color: string; priority: number }> = new Map();

        // Layer priority (higher = rendered on top)
        const layerPriority: { [key: string]: number } = {
            'landuse': 1,
            'water': 2,
            'roads': 3,
            'transportation': 3,
            'buildings': 4,
            'building': 4
        };

        // Process each layer in the tile
        for (const layerName in tile.layers) {
            const layer = tile.layers[layerName];
            const priority = layerPriority[layerName] || 0;

            for (let i = 0; i < layer.length; i++) {
                const feature = layer.feature(i);
                const geom = feature.loadGeometry();

                // Convert geometry to screen coordinates and render
                for (const ring of geom) {
                    for (const point of ring) {
                        // Convert tile coordinate to world coordinate
                        const scale = Math.pow(2, this.zoom);
                        const tileSize = 256;
                        const worldX = (tileCoord.x + point.x / 4096) * tileSize;
                        const worldY = (tileCoord.y + point.y / 4096) * tileSize;

                        // Convert to lat/lon
                        const lon = worldX / tileSize / scale * 360 - 180;
                        const n = Math.PI - 2 * Math.PI * worldY / tileSize / scale;
                        const lat = 180 / Math.PI * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));

                        // Convert to screen coordinates
                        const pixel = this.latLonToPixel(lat, lon);
                        const screen = this.pixelToScreen(pixel);

                        // Convert to character grid position
                        const gridX = Math.floor(screen.x / this.charWidth);
                        const gridY = Math.floor(screen.y / this.charHeight);

                        if (gridX >= 0 && gridX < cols && gridY >= 0 && gridY < rows) {
                            const key = `${gridX},${gridY}`;
                            const featureClass = (feature.properties && typeof feature.properties === 'object' && 'class' in feature.properties)
                                ? String(feature.properties.class)
                                : '';
                            const char = this.getAsciiChar(featureClass, layerName);
                            const color = this.getCharColor(layerName);

                            // Only update if this layer has higher priority
                            const existing = grid.get(key);
                            if (!existing || priority > existing.priority) {
                                grid.set(key, { char, color, priority });
                            }
                        }
                    }
                }
            }
        }

        // Render the grid
        for (const [key, { char, color }] of grid.entries()) {
            const [gridX, gridY] = key.split(',').map(Number);
            this.ctx.fillStyle = color;
            this.ctx.fillText(char, gridX * this.charWidth, gridY * this.charHeight);
        }
    }

    // Render the hackathon location marker
    private renderMarker() {
        const markerPixel = this.latLonToPixel(ZADAR_LAT, ZADAR_LON);
        const markerScreen = this.pixelToScreen(markerPixel);

        // Draw a glowing marker
        const markerChar = '●';
        const markerColor = this.isDarkMode ? '#00ff9d' : '#0ea5e9';

        // Draw glow effect
        this.ctx.shadowBlur = 20;
        this.ctx.shadowColor = markerColor;
        this.ctx.fillStyle = markerColor;

        // Center the marker character
        const markerX = markerScreen.x - this.charWidth / 2;
        const markerY = markerScreen.y - this.charHeight / 2;

        this.ctx.fillText(markerChar, markerX, markerY);

        // Reset shadow
        this.ctx.shadowBlur = 0;
    }

    // Pan the map
    public pan(dx: number, dy: number) {
        this.offsetX += dx;
        this.offsetY += dy;
    }

    // Update theme
    public setTheme(isDarkMode: boolean) {
        this.isDarkMode = isDarkMode;
    }

    // Clear tile cache
    public clearCache() {
        this.tileCache.clear();
    }
}
