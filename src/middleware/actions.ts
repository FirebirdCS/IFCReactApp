export type ActionType = "LOGIN" | "UPDATE_USER" | "LOGOUT";

export interface Action {
    type: ActionType;
    payload?: any;
}