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
  animGate: any,
  animSelector: number
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
      ChocoMellows.stop();
      if(animSelector == 0){
        ChocoMellows.stop();
        ChocoMellows.reset();
        ChocoMellows.start(false, 1, 1, 30);
      }
      if(animSelector == 1){
        LifeSavers.stop();
        LifeSavers.reset();
        LifeSavers.start(false, 1, 1, 30);
      }
      if(animSelector == 2){
        Oranges.stop();
        Oranges.reset();
        Oranges.start(false, 1, 1, 30);
      }
      console.log(ChocoMellows);
      /* LifeSavers.play(false);
      Oranges.play(false);
      Ribbons.play(false);
      Strawberries.play(false);
      Worms.play(false); */
      animGate.empty = false;
    }
  }
}

export { boxController, candiesLoader };
