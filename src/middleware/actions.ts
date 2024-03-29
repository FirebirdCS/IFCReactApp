export const ActionList = [
"LOGIN" ,
"UPDATE_USER", 
 "LOGOUT",
 "START_MAP" ,
 "REMOVE_MAP" ,
 "ADD_BUILDING" ,
 "OPEN_BUILDING" ,
 "CLOSE_BUILDING" ,
 "UPDATE_BUILDING",
 "DELETE_BUILDING",
 "UPLOAD_MODEL",
 "DELETE_MODEL",
 "START_BUILDING",
 "CLOSE_BUILDING",
 "EXPLODE_MODEL",
 "TOGGLE_CLIPPER",
 "TOGGLE_DIMENSIONS",
 "TOGGLE_FLOORPLAN",
 "UPDATE_FLOORPLANS",
 "UPDATE_PROPERTIES",
 "DESACTIVATE_GRID",
 "ACTIVATE_GRID"
] as const;


export type ActionType =  typeof ActionList[number];
export interface Action {
    type: ActionType;
    payload?: any;
}