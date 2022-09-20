import { AnimationGroup, SceneLoader, Vector3, Space, type ISceneLoaderAsyncResult, Scene } from "@babylonjs/core";
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
  name: string;
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
  name: "",
  path: "./",
  file: "Candies.glb",
  row_position: new Vector3(0, 0, 0),
}]

function cloneCandies(scene: Scene, position: Vector3, candiesInstances: Candy[]) {
  const candies: Candy[] = candiesInstances;
  console.log(candiesInstances);
  candies.forEach((candy) => {
    console.log(candy);
    let cloneParent = candy.object.meshes[0]
    cloneParent.isVisible = true;
    const clone = cloneParent.clone(
      candy.name,
      cloneParent.parent
    );
    console.log(clone);
    if (clone) {
      clone.translate(position, 1, Space.WORLD);
      clone.isVisible = true;
    }
  });
}

function candiesPlay(index: number, candiesMesh: Candy, scene: Scene){
    let candyParent = candiesMesh.object.meshes[0];
    candyParent.translate(candiesMesh.ilePos, 1, Space.WORLD);
    const animations = candiesMesh.object.animationGroups;

    scene.stopAllAnimations();
    scene.animationGroups[0].play(false);
    animations[index].play(false);
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
      })
      cloneCandies(scene, new Vector3(-0.93, 0, 0), candiesInstances);
      cloneCandies(scene, new Vector3(-0.31, 0, 0), candiesInstances);
      cloneCandies(scene, new Vector3(0.31, 0, 0), candiesInstances);
      cloneCandies(scene, new Vector3(0.93, 0, 0), candiesInstances);
      cloneCandies(scene, new Vector3(1.56, 0, 0), candiesInstances);
    } catch (error) {

  }
    candiesPlay( 1, candiesInstances[0], scene);
})
  return candiesInstances
}

// const path = `static/models/${candy.name}.glb`;

function boxController(
  meshNames: string[],
  meshPath: string,
  meshFile: string,
  scene: BABYLON.Scene
) {
  BABYLON.SceneLoader.ImportMesh(
    meshNames,
    meshPath,
    meshFile,
    scene,
    function (newMeshes, particleSystems, skeletons, animationGroups) {
      const box = animationGroups[0];
      const ls = newMeshes[0];
      ls.translate(new BABYLON.Vector3(0, 0, 0), 1, BABYLON.Space.WORLD);
      box.play(false);
    }
  );
}

/* async function candiesLoader(
  meshNames: string,
  meshPath: string,
  meshFile: string,
  candiesID: number,
  scene: BABYLON.Scene,
  ilePos: BABYLON.Vector3,
) {
  if (animGate.state) {
    if (animGate.empty) {

      const meshGroups: BABYLON.ISceneLoaderAsyncResult =
        await BABYLON.SceneLoader.ImportMeshAsync(
          meshNames,
          meshPath,
          meshFile,
          scene
        );
      const candyParent = meshGroups.meshes[0];
      let [ChocoMellows, LifeSavers, Oranges, Ribbons, Strawberries, Worms] =
        meshGroups.animationGroups;
        candyParent.translate(ilePos, 1, BABYLON.Space.WORLD);
        ChocoMellows.play(false);
        LifeSavers.stop();
        Oranges.stop();
        Ribbons.stop();
        Strawberries.stop();
        Worms.stop();
    }
  }
} */

export { boxController, cloneCandies, candiesLoader };
