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
] as const;


export type ActionType =  typeof ActionList[number];
export interface Action {
    type: ActionType;
    payload?: any;
}