import { getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { deleteDoc, doc, getFirestore, updateDoc } from "firebase/firestore";
import { Action } from "../../middleware/actions";
import { Events } from "../../middleware/event-handler";
import { Building } from "../../types";

export const databaseHandler = {
    Login: (action: Action) => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth,provider);
    },
    Logout: () =>{
        const auth = getAuth();
        signOut(auth);
    },
    deleteBuilding: async (building: Building, events: Events) => {
        const dbInstance = getFirestore(getApp());
        await deleteDoc(doc(dbInstance, "buildings", building.uid));
        events.trigger({type: "CLOSE_BUILDING"});
    },
    updateBuilding: async (building: Building) => {
        const dbInstance = getFirestore(getApp());
        await updateDoc(doc(dbInstance, "buildings", building.uid), {
            ...building,
        });
    }
};