import { User} from "firebase/auth";
import { Events } from "../../middleware/event-handler";
import { MapScene } from "./map-scene";

export const mapHandler  = {
    map: null as MapScene | null,
    async start (container: HTMLDivElement, user: User, events: Events){
        if(!this.map){
            this.map = new MapScene(container, events);
            await this.map.getAllBuildings(user);
        }
    },
    remove(){
        if(this.map){
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