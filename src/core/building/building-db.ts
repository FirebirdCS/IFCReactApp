import { getApp } from "firebase/app";
import { Building } from "../../types";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

export class BuildingDb {
    async getModels(building: Building){
        const appInstance = getApp();
        const storage = getStorage(appInstance);
        const urls: string[] = [];
        for(const model of building.models){
            const fileRef = ref(storage, model.id);
            const fileUrl = await getDownloadURL(fileRef);
            urls.push(fileUrl);
        }
        return urls;
    }
}