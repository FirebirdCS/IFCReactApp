import { User } from "firebase/auth";
import { MapScene } from "./map-scene";

export const mapHandler  = {
    map: null as MapScene | null,
    start (container: HTMLDivElement){
        if(!this.map){
            console.log("Map started")
            this.map = new MapScene(container);
        }
    },
    remove(){
        if(this.map){
            console.log("Map removed")
            this.map.dispose();
            this.map = null;
        }
    },

    addBuilding(user: User){
        if(this.map){
            this.map.addBuilding(user);
        }
    }
}