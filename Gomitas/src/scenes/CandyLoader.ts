import * as BABYLON from "babylonjs";
import "babylonjs-loaders";

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

async function candiesLoader(
  meshNames: string,
  meshPath: string,
  meshFile: string,
  scene: BABYLON.Scene,
  ilePos: BABYLON.Vector3,
  animGate: any
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
      const [ChocoMellows, LifeSavers, Oranges, Ribbons, Strawberries, Worms] =
        meshGroups.animationGroups;
      candyParent.translate(ilePos, 1, BABYLON.Space.WORLD);
      ChocoMellows.play(false);
      animGate.empty = false;
    }
  }
}

export { boxController, candiesLoader };
