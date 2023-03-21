export interface GisParameters {
    container: HTMLDivElement;
    accessToken: string | any;
    zoom: number;
    pitch: number;
    center: [number,number];
    bearing: number;
    buildings: Building[];
}

export interface Building {
    uid: string;
    userId: string;
    lat: number;
    lng: number;
    name: string;
}

export interface LngLat {
    lng: number;
    lat: number;
}