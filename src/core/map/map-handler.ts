import { User} from "firebase/auth";
import { MapScene } from "./map-scene";

export const mapHandler  = {
    map: null as MapScene | null,
    async start (container: HTMLDivElement, user: User){
        if(!this.map){
            console.log("Map started")
            this.map = new MapScene(container);
            await this.map.getAllBuildings(user);
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