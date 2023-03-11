import { userAuth } from "../core/user/user-auth";
import { mapHandler } from "../core/map/map-handler";
import { Action } from "./actions";

export const executeCore = (action: Action) => {
    if(action.type === "LOGIN"){
        userAuth.Login(action);
    }
    if(action.type === "LOGOUT"){
        userAuth.Logout();
    }
    if(action.type === "START_MAP"){
        const {container} = action.payload;
        mapHandler.start(container);
    }
    if(action.type === "REMOVE_MAP"){
        mapHandler.remove();
    }
    if(action.type === "ADD_BUILDING"){
        mapHandler.addBuilding(action.payload);
    }
}