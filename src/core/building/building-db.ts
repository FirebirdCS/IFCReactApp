import { getApp } from "firebase/app";
import { Building } from "../../types";
import { FirebaseStorage, getDownloadURL, getStorage, ref } from "firebase/storage";
import { ModelDatabase } from "./dexie-utils";

export class BuildingDb {
    private db = new ModelDatabase();
    async getModels(building: Building){
        await this.db.open();
        const appInstance = getApp();
        const storage = getStorage(appInstance);
        const urls: string[] = [];
        for(const model of building.models){
            const url =  await this.getModelURL(storage, model.id);
            urls.push(url);
        }
        this.db.close();
        return urls;
    }

    async clearCache(building: Building){
        await this.db.open();
        for(const model of building.models){
            localStorage.removeItem(model.id);
        }
        await this.db.delete();
        this.db = new ModelDatabase();
        this.db.close();
    }

    async deleteModelsCache(ids: string[]){
        await this.db.open();
        for(const id of ids){
            if(this.isModelCached(id)){
                localStorage.removeItem(id);
                await this.db.models.where("id").equals(id).delete();
            }
        }
        this.db.close();
    }

    private async getModelURL(storage: FirebaseStorage, id: string){
        if(this.isModelCached(id)){
            return this.getModelFromLocalCache(id);
        } else {
            return this.getModelFromFirebase(storage, id)
        }
    }

    private async getModelFromFirebase(storage: FirebaseStorage, id: string){
        const fileRef = ref(storage, id);
        const fileUrl = await getDownloadURL(fileRef);
        await this.cacheModel(id, fileUrl);
        return fileUrl;
    }

    private async getModelFromLocalCache(id: string){
        const found = await this.db.models.where("id").equals(id).toArray();
        const file = found[0].file;
        return URL.createObjectURL(file);
    }

    private isModelCached(id: string){
       const stored = localStorage.getItem(id);
       return stored !== null;
    }

    private async cacheModel(id: string, url: string){
        const time = performance.now().toString();
        localStorage.setItem(id, time);
        const rawData = await fetch(url);
        const file = await rawData.blob();
        await this.db.models.add({
            id,
            file
        });
    }
}