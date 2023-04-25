import { Building } from '../../types';
import { BuildingScene } from './building-scene';
export const buildingHandler = {
    viewer: null as BuildingScene | null,
    start(container: HTMLDivElement, building: Building) {
        if(!this.viewer){
            this.viewer = new BuildingScene(container, building);
        }
    },
    remove(){
        if(this.viewer){
            console.log("Viewer removed");
            this.viewer.dispose();
            this.viewer = null;
        }
    },
    async convertIfcToFragments(ifc: File){
        if(!this.viewer){
            throw new Error("Viewer not active");
        }
        return this.viewer.convertIfcToFragments(ifc);
    },
    async deleteModels(id: string[]){
        if(this.viewer){
            await this.viewer.database.deleteModelsCache(id);
        }
    },
    async refreshModels(building: Building){
        if(this.viewer){
            const container = this.viewer.container;
            this.viewer.dispose();
            this.viewer = null;
            this.viewer = new BuildingScene(container,building);
        }
    },
    explode(active: boolean) {
        if (this.viewer) {
          this.viewer.explode(active);
        }
      },
};