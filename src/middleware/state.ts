import {User} from "firebase/auth";
import { Building, Floorplan,Property } from "../types";

export interface State{
    user: User | null;
    building: Building | null;
    floorplans: Floorplan[];
    properties: Property[];
}

export const initialState : State = {
    user: null,
    building: null,
    floorplans: [],
    properties: [],
}