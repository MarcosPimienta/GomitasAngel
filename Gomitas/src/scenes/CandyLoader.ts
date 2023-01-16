import { AnimationGroup, SceneLoader, Vector3, Color3, PBRMetallicRoughnessMaterial, Texture, Space, type ISceneLoaderAsyncResult, Scene } from "@babylonjs/core";
import { objectToString } from "@vue/shared";

//This will handle the instance to be imported
interface Candy {
  id: number | string;
  name: string;
  object: ISceneLoaderAsyncResult;
  mesh: string;
  animation?: AnimationGroup;
  repeat?: boolean;
  ilePos: Vector3;
}

//This handles the configuration of the imported Candy above and its values inside the scene
interface CandyConfig {
  id: number;
  name: string[];
  path: string;
  file: string;
  row_position: Vector3;
}


const candies: Candy[] = [
  // {
  //   id: 0,
  //   name: "ChocoMellows",
  //   path: "./",
  //   object: null,
  //   mesh: "ChocoMellows",
  //   animation: null,
  // },
]

//let POSITION: Vector3 = new Vector3(0, 0, 0);

interface CandyObject {
  id: number;
  name: string;
  visible: boolean;
  position: Vector3;
  rotation?: Vector3;
  scale?: Vector3;
  material?: string;
  animation?: AnimationGroup;
}

const config: CandyConfig[] = [{
  id: 0,
  name: ['ChocoMellows', 'LifeSavers', 'Oranges', 'Ribbons', 'Strawberries', 'Worms'],
  path: "./",
  file: "Candies.glb",
  row_position: new Vector3(0, 0, 0),
}]

function candiesPlay( index: number, candiesMesh: Candy, scene: Scene, newIndex: string){
    const animations = candiesMesh.object.animationGroups;
    const meshes = candiesMesh.object.transformNodes;
    const meshIndex = meshes.findIndex((item)=> item.id == newIndex);

    meshes.forEach((mesh)=>{
        mesh.setEnabled(false);
      })

      animations.forEach((anim)=>{
        anim.reset();
      })

      meshes[meshIndex].setEnabled(true);
      animations[index].play(false);
}

function animationHandler(Candies: Candy[]){
  Candies.forEach((Candy)=>{
    const meshes = Candy.object.transformNodes;
    meshes.forEach((mesh)=>{
        mesh.setEnabled(false);
      })
    Candy.object.animationGroups.forEach((anim)=>{
      anim.reset();
      anim.stop();
    })
  })
}

function candiesLoader(scene: Scene, position: Vector3){
  const candiesInstances: Candy[] = [];
  config.forEach(async (candy) => {
  try {
        candiesInstances.push({
        id: candy.id,
        name: candy.file,
        object: await SceneLoader.ImportMeshAsync(
          candy.name,
          candy.path,
          candy.file,
          scene,
        ),
        mesh: "",
        ilePos: position,
      },
      {
        id: candy.id,
        name: candy.file,
        object: await SceneLoader.ImportMeshAsync(
          candy.name,
          candy.path,
          candy.file,
          scene,
        ),
        mesh: "",
        ilePos: position,
      },
      {
        id: candy.id,
        name: candy.file,
        object: await SceneLoader.ImportMeshAsync(
          candy.name,
          candy.path,
          candy.file,
          scene,
        ),
        mesh: "",
        ilePos: position,
      },
      {
        id: candy.id,
        name: candy.file,
        object: await SceneLoader.ImportMeshAsync(
          candy.name,
          candy.path,
          candy.file,
          scene,
        ),
        mesh: "",
        ilePos: position,
      },
      {
        id: candy.id,
        name: candy.file,
        object: await SceneLoader.ImportMeshAsync(
          candy.name,
          candy.path,
          candy.file,
          scene,
        ),
        mesh: "",
        ilePos: position,
      },
      {
        id: candy.id,
        name: candy.file,
        object: await SceneLoader.ImportMeshAsync(
          candy.name,
          candy.path,
          candy.file,
          scene,
        ),
        mesh: "",
        ilePos: position,
      })
      console.log(candiesInstances);
      candiesInstances[5].object.meshes[0].translate(new Vector3(1.56, 0, 0), 1, Space.WORLD);
      candiesInstances[4].object.meshes[0].translate(new Vector3(0.93, 0, 0), 1, Space.WORLD);
      candiesInstances[3].object.meshes[0].translate(new Vector3(0.31, 0, 0), 1, Space.WORLD);
      candiesInstances[2].object.meshes[0].translate(new Vector3(-0.31, 0, 0), 1, Space.WORLD);
      candiesInstances[1].object.meshes[0].translate(new Vector3(-0.93, 0, 0), 1, Space.WORLD);
      candiesInstances[0].object.meshes[0].translate(position, 1, Space.WORLD);
      animationHandler(candiesInstances);
    } catch (error) {
  }
})
  return candiesInstances
}

// const path = `static/models/${candy.name}.glb`;

function boxController(
  meshNames: string[],
  meshPath: string,
  meshFile: string,
  scene: Scene
) {
  SceneLoader.ImportMesh(
    meshNames,
    meshPath,
    meshFile,
    scene,
    function (newMeshes, particleSystems, skeletons, animationGroups) {
      const boxTexture = new Texture("/textures/GrungeTexture.jpeg", scene);
      //material creation
      const material = new PBRMetallicRoughnessMaterial("boxMaterial", scene);
      /* material.baseTexture = boxTexture;
      material.baseTexture.getAlphaFromRGB = true; */
      material.baseColor = new Color3(0.79, 0.78, 0.55);
      material.metallic = 0;
      for (let i = 0; i < newMeshes.length; i++){
        newMeshes[i].material = material;
      }
      const box = animationGroups[0];
      const ls = newMeshes[0];
      ls.translate(new Vector3(0, 0, 0), 1, Space.WORLD);
      box.play(false);
    }
  );
}

export { boxController, candiesLoader, candiesPlay };  export type { Candy };

