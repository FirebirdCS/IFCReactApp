import { Building } from "../../types";
import {addDoc, collection, getFirestore, onSnapshot, query, where } from "firebase/firestore";
import { getApp } from "firebase/app";
import { User } from "firebase/auth";

export class MapDatabase {
    private readonly buildings = "buildings";
    async add(building: Building){
        const dbInstance = getFirestore(getApp());
        const {lat,lng,userId, name} = building;
        const result = await addDoc(collection(dbInstance, this.buildings), {
            lat, lng, userId, name
        });
        return result.id;
    }
    async getBuildings(user: User){
        const dbInstance = getFirestore(getApp());
        const q = query(
            collection(dbInstance, this.buildings),
            where("userId", "==", user.uid)
        );
        return new Promise<Building[]>((resolve)=> {
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const result: Building[] = [];
                snapshot.docs.forEach((doc) => {
                    result.push({...(doc.data() as Building), uid: doc.id})
                });
                unsubscribe();
                resolve(result);
            })
        })
    }
}