import { buildingHandler } from '../core/building/building-handler';
import { databaseHandler } from "../core/db/db-handler";
import { mapHandler } from "../core/map/map-handler";
import { Action } from "./actions";
import { Events } from "./event-handler";

export const executeCore = async (action: Action, events: Events) => {
    if(action.type === "LOGIN"){
        return databaseHandler.Login(action);
    }
    if(action.type === "LOGOUT"){
        return databaseHandler.Logout();
    }
    if(action.type === "START_MAP"){
         const {container, user} = action.payload;
         return mapHandler.start(container, user, events);
    }
    if(action.type === "REMOVE_MAP" || action.type === "OPEN_BUILDING"){
        return mapHandler.remove();
    }
    if(action.type === "ADD_BUILDING"){
        return mapHandler.addBuilding(action.payload);
    }
    if(action.type === "DELETE_BUILDING"){
        return databaseHandler.deleteBuilding(action.payload, events);
    }
    if(action.type === "UPDATE_BUILDING"){
        return databaseHandler.updateBuilding(action.payload)
    }
    if(action.type === "UPLOAD_MODEL"){
        const {model,file,building} = action.payload;
        const zipFile = await buildingHandler.convertIfcToFragments(file);
        return databaseHandler.uploadModel(model,zipFile,building,events);
     }
    if(action.type === "DELETE_MODEL"){
        const {model,building} = action.payload;
        return databaseHandler.deleteModel(model,building, events);
     }
    if(action.type === "START_BUILDING"){
        const {container, building} = action.payload;
        return buildingHandler.start(container, building, events);
    }
    if(action.type === "CLOSE_BUILDING"){
        return buildingHandler.remove();
    }
    if (action.type === "EXPLODE_MODEL") {
        return buildingHandler.explode(action.payload);
    }
    if (action.type === "DESACTIVATE_GRID") {
        return buildingHandler.desactivateGrid(action.payload);
    }
    if (action.type === "ACTIVATE_GRID") {
        return buildingHandler.activateGrid(action.payload);
    }
    if (action.type === "TOGGLE_CLIPPER") {
        return buildingHandler.toggleClippingPlanes(action.payload);
    }
    if (action.type === "TOGGLE_DIMENSIONS") {
        return buildingHandler.toggleDimensions(action.payload);
    }
    if (action.type === "TOGGLE_FLOORPLAN") {
        const { active, floorplan } = action.payload;
       return buildingHandler.toggleFloorplan(active, floorplan);
    }

}