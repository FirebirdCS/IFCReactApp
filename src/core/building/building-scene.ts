import { Events } from "./../../middleware/event-handler";
import { Floorplan, Property } from "./../../types";
import * as OBC from "openbim-components";
import * as THREE from "three";
import { BuildingDb } from "./building-db";
import { Building } from "../../types";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial";
import { downloadZip } from "client-zip";
import { unzip } from "unzipit";

export class BuildingScene {
    database = new BuildingDb();
    private components: OBC.Components;
    private fragments: OBC.Fragments;
    private floorplans: Floorplan[] = [];    
    private whiteMaterial = new THREE.MeshBasicMaterial({ color: "white" });
    private properties: { [fragID: string]: any } = {};
    private showGrid = false;


    get container(){
        const domElement = this.components.renderer.get().domElement;
        return domElement.parentElement as HTMLDivElement;
    }

    private sceneEvents: { name: any; action: any }[] = [];
    private events: Events;
    

    constructor(container: HTMLDivElement, building: Building, events: Events){
        this.events = events;
        this.components = new OBC.Components();
        const sceneComponent = new OBC.SimpleScene(this.components);
        const scene = sceneComponent.get();
        scene.background = null;
        const directionalLight = new THREE.DirectionalLight();
        directionalLight.position.set(5,10,3);
        directionalLight.intensity = 0.5;
        scene.add(directionalLight);
        const ambientLight = new THREE.AmbientLight();
        ambientLight.intensity = 0.5;
        scene.add(ambientLight);
        this.components.scene = sceneComponent;
        this.components.renderer = new OBC.SimpleRenderer(
            this.components,
            container
        );
        const camera = new OBC.OrthoPerspectiveCamera(this.components);
        this.components.camera = camera;
        this.components.raycaster = new OBC.SimpleRaycaster(this.components);
        this.components.init();
        const dimensions = new OBC.SimpleDimensions(this.components);
        this.components.tools.add(dimensions);
        const clipper = new OBC.EdgesClipper(this.components, OBC.EdgesPlane);
        this.components.tools.add(clipper);
        const thinLineMaterial = new LineMaterial({
            color: 0x000000,
            linewidth: 0.001,
        });
        clipper.styles.create("thin_lines", [], thinLineMaterial);
        const floorNav = new OBC.PlanNavigator(clipper, camera);
        this.components.tools.add(floorNav);
        const grid = new OBC.SimpleGrid(this.components);
        grid.visible = this.showGrid;
        this.components.tools.add(grid);
        this.fragments = new OBC.Fragments(this.components);
        this.components.tools.add(this.fragments);
        this.fragments.highlighter.active = true;
        const selectMat = new THREE.MeshBasicMaterial({ color: 0x1976d2 });
        const preselectMat = new THREE.MeshBasicMaterial({color: 0x1976d2, opacity: 0.5, transparent: true,})
        this.fragments.highlighter.add("selection", [selectMat]);
        this.fragments.highlighter.add("preselection", [preselectMat]);
        
        this.loadAllModels(building);
        this.fragments.exploder.groupName = "floor";
        this.setupEvents();

    }
    dispose(){
        this.components.dispose();
        this.properties = {};
        this.toggleEvents(false);
        this.whiteMaterial.dispose();
        (this.components as any) = null;
        (this.fragments as any) = null;
    }
    
    private setupEvents = () => {
        this.sceneEvents = [
            {name: "mouseup", action: this.updateCulling},
            {name: "wheel", action: this.updateCulling},
            {name: "mousemove", action: this.preselect},
            {name: "click", action: this.select},
            { name: "keydown", action: this.createClippingPlane },
            { name: "keydown", action: this.createDimension },
            { name: "keydown", action: this.deleteClippingPlaneOrDimension },
            
        ];
        this.toggleEvents(true);
    }

    private toggleEvents(active: Boolean){
        for(const event of this.sceneEvents){
            if(active){
                window.addEventListener(event.name, event.action);
            } else{
                window.removeEventListener(event.name, event.action);
            }
        }
    }

    explode(active: boolean) {
        const exploder = this.fragments.exploder;
        if (active) {
          exploder.explode();
        } else {
          exploder.reset();
        }
      }
 
    activateGrid(active: boolean){
      const grid = this.components.tools.get("SimpleGrid") as OBC.SimpleGrid;
      const mesh = grid.get();
      mesh.visible = false;
      if (!this.showGrid) {
        grid.visible = true;
        this.showGrid = true;
      } else {
        grid.visible = false;
        this.showGrid = false;
      }

    }

    toggleClippingPlanes(active: boolean) {
        const clipper = this.getClipper();
        if (clipper) {
          clipper.enabled = active;
        }
    }
    
    toggleDimensions(active: boolean) {
        const dimensions = this.getDimensions();
        if (dimensions) {
          dimensions.enabled = active;
        }
    }

    toggleFloorplan(active: boolean, floorplan?: Floorplan) {
        const floorNav = this.getFloorNav();
        if (!this.floorplans.length) return;
        if (active && floorplan) {
          this.toggleGrid(false);
          this.toggleEdges(true);
          floorNav.goTo(floorplan.id);
          this.fragments.materials.apply(this.whiteMaterial);
        } else {
          this.toggleGrid(true);
          this.toggleEdges(false);
          this.fragments.materials.reset();
          floorNav.exitPlanView();
        }
      }


    private createClippingPlane = (event: KeyboardEvent) => {
        if (event.code === "KeyP") {
          const clipper = this.getClipper();
          if (clipper) {
            clipper.create();
          }
        }
    }; 

    private createDimension = (event: KeyboardEvent) => {
        if (event.code === "KeyD") {
          const dims = this.getDimensions();
          if (dims) {
            dims.create();
          }
        }
    };

    private getClipper() {
        return this.components.tools.get("EdgesClipper") as OBC.EdgesClipper;
    }
    
    private getDimensions() {
        return this.components.tools.get(
          "SimpleDimensions"
        ) as OBC.SimpleDimensions;
    }

    private deleteClippingPlaneOrDimension = (event: KeyboardEvent) => {
        if (event.code === "Delete") {
          const dims = this.getDimensions();
          dims.delete();
          const clipper = this.getClipper();
          clipper.delete();
        }
      };
    

    private updateCulling = () =>{
        this.fragments.culler.needsUpdate = true;
    }


    async convertIfcToFragments(ifc: File){
        let fragments = new OBC.Fragments(this.components);
        fragments.ifcLoader.settings.optionalCategories.length = 0;
        fragments.ifcLoader.settings.wasm = {
            path: "../../",
            absolute: false
        };
        fragments.ifcLoader.settings.webIfc ={
            COORDINATE_TO_ORIGIN: true,
            USE_FAST_BOOLS: true
        }
        const url = URL.createObjectURL(ifc) as any;
        const model = await fragments.ifcLoader.load(url);
        const file = await this.serializeFragments(model);
        fragments.dispose();
        (fragments as any) = null;
        return file as File;
    }


    private toggleGrid(visible: boolean) {
        const grid = this.components.tools.get("SimpleGrid") as OBC.SimpleGrid;
        const mesh = grid.get();
        mesh.visible = false;

      }
    private getFloorNav() {
        return this.components.tools.get("PlanNavigator") as OBC.PlanNavigator;
    }
    
    private toggleEdges(visible: boolean) {
        const edges = Object.values(this.fragments.edges.edgesList);
        const scene = this.components.scene.get();
        for (const edge of edges) {
          if (visible) scene.add(edge);
          else edge.removeFromParent();
        }
    }

    private async serializeFragments(model: OBC.FragmentGroup){
        const files = [];
        for(const frag of model.fragments){
            const file = await frag.export();
            files.push(file.geometry, file.data);
        }
        files.push(new File([JSON.stringify(model.properties)], 'properties.json'));
        files.push(new File([JSON.stringify(model.levelRelationships)], 'levels-relationship.json'));
        files.push(new File([JSON.stringify(model.itemTypes)], 'model-types.json'));
        files.push(new File([JSON.stringify(model.allTypes)], 'all-types.json'));
        files.push(new File([JSON.stringify(model.floorsProperties)], 'levels-properties.json'));
        files.push(new File([JSON.stringify(model.coordinationMatrix)], 'coordination-matrix.json'));
        files.push(new File([JSON.stringify(model.expressIDFragmentIDMap)], 'express-fragment-map.json'));
        return downloadZip(files).blob();
    }

    private async loadAllModels(building: Building){
        const modelsURLs = await this.database.getModels(building); 
        for(const url of modelsURLs){
            const {entries} = await unzip(url);
            const fileNames = Object.keys(entries);

            const properties = await entries["properties.json"].json();
            const allTypes = await entries["all-types.json"].json();
            const modelTypes = await entries["model-types.json"].json();
            const levelsProperties = await entries["levels-properties.json"].json();
            const levelsRelationship = await entries[
            "levels-relationship.json"
            ].json();          



            const levelOffset = 1.5;
            const floorNav = this.getFloorNav();

            if (this.floorplans.length === 0) {
                for (const levelProps of levelsProperties) {
                  const elevation = levelProps.SceneHeight + levelOffset;
        
                  this.floorplans.push({
                    id: levelProps.expressID,
                    name: levelProps.Name.value,
                  });
        
                  // Create floorplan
                  await floorNav.create({
                    id: levelProps.expressID,
                    ortho: true,
                    normal: new THREE.Vector3(0, -1, 0),
                    point: new THREE.Vector3(0, elevation, 0),
                  });
                }
                this.events.trigger({
                  type: "UPDATE_FLOORPLANS",
                  payload: this.floorplans,
                });
            }
            for(let i = 0; i < fileNames.length; i++){
                const name = fileNames[i];
                if (!name.includes('.glb')) continue;
    
                const geometryName = fileNames[i];
                const geometry = await entries[geometryName].blob();
                const geometryURL = URL.createObjectURL(geometry);
    
                const dataName = geometryName.substring(0, geometryName.indexOf('.glb')) + '.json';
                const dataBlob = await entries[dataName].blob();
    
                const dataURL = URL.createObjectURL(dataBlob);
    
                const fragment = await this.fragments.load(geometryURL, dataURL);
                // fragment.mesh.position.y = 3.5;

                this.properties[fragment.id] = properties;

                const data = await entries[dataName].json();

                const lines = this.fragments.edges.generate(fragment);
                lines.removeFromParent();
        
                // Set up clipping edges
        
                const styles = this.getClipper().styles.get();
                const thinStyle = styles["thin_lines"];
                thinStyle.meshes.push(fragment.mesh);
               
                const groups = { category: {}, floor: {} } as any;

                const floorNames = {} as any;
                for (const levelProps of levelsProperties) {
                floorNames[levelProps.expressID] = levelProps.Name.value;
                }

                for (const id of data.ids) {
                // Get the category of the items

                const categoryExpressID = modelTypes[id];
                const category = allTypes[categoryExpressID];
                if (!groups.category[category]) {
                    groups.category[category] = [];
                }
                groups.category[category].push(id);


                const floorExpressID = levelsRelationship[id];
                const floor = floorNames[floorExpressID];
                if (!groups["floor"][floor]) {
                    groups["floor"][floor] = [];
                }
                groups["floor"][floor].push(id);
            }
            this.fragments.groups.add(fragment.id, groups);
        }
            this.fragments.culler.needsUpdate = true;
            this.fragments.highlighter.update();
        }
    }

    private preselect = () => {
        this.fragments.highlighter.highlight("preselection");
    }

    private select = () => {
      const result = this.fragments.highlighter.highlight("selection");
      if (result) {
        const allProps = this.properties[result.fragment.id];
        const props = allProps[result.id];
        if (props) {
          const formatted: Property[] = [];
          for (const name in props) {
            let value = props[name];
            if (!value) value = "Unknown";
            if (value.value) value = value.value;
            if (typeof value === "number") value = value.toString();
            formatted.push({ name, value });
          }
          return this.events.trigger({
            type: "UPDATE_PROPERTIES",
            payload: formatted,
          });
        }
      }
      this.events.trigger({ type: "UPDATE_PROPERTIES", payload: [] });
    }
   
};