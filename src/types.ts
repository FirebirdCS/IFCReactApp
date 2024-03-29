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
    models: Model[];
}

export interface Model{
    name: string;
    id: string;
}

export interface LngLat {
    lng: number;
    lat: number;
}

export interface Tool{
    name: string;
    active: boolean;
    icon: any;
    action: (...args: any) => void;
}

export interface Floorplan {
    name: string;
    id: string;
}

export interface Property {
    name: string;
    value: string;
  }

