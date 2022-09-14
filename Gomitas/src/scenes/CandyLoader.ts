import { AnimationGroup, SceneLoader, Vector3, Space, type ISceneLoaderAsyncResult, Scene } from "@babylonjs/core";
import { objectToString } from "@vue/shared";


interface Candy {
  id: number | string;
  name: string;
  object: ISceneLoaderAsyncResult;
  mesh: string;
  animation?: AnimationGroup;
  repeat?: boolean;
  ilePos: Vector3;
}

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

let POSITION: Vector3 = new Vector3(0, 0, 0);

const config: CandyConfig[] = [{
  id: 0,
  name: "",
  path: "./",
  file: "Candies.glb",
  row_position: new Vector3(0, 0, 0),
}]

const candiesInstances: Candy[] = [];

function candiesLoader(scene: Scene, position: Vector3){
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
    } catch (error) {

  }
  candiesInstances.forEach((candy) => {
    candy.object.meshes[0].translate(candy.ilePos, 1, Space.WORLD);
  })
  })
  console.log("HI");
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

export { boxController, candiesLoader };
