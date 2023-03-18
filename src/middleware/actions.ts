export type ActionType = "LOGIN" | "UPDATE_USER" | "LOGOUT"  | "START_MAP" | "REMOVE_MAP" | "ADD_BUILDING" | "OPEN_BUILDING" | "CLOSE_BUILDING";

export interface Action {
    type: ActionType;
    payload?: any;
}