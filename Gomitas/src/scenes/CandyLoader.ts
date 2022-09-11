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
      let Animations/* [ChocoMellows, LifeSavers, Oranges, Ribbons, Strawberries, Worms] */ =
        meshGroups.animationGroups;
      candyParent.translate(ilePos, 1, BABYLON.Space.WORLD);
        Animations[0].stop();
        Animations[0].reset();
        Animations[0].start(false, 1, 0);
      if(animSelector == 1){
        Animations[1].stop();
        Animations[1].reset();
        Animations[1].start(false, 1, 0);
      }
      if(animSelector == 2){
        Animations[2].stop();
        Animations[2].reset();
        Animations[2].start(false, 1, 0);
      }
      console.log(Animations);
      /* LifeSavers.play(false);
      Oranges.play(false);
      Ribbons.play(false);
      Strawberries.play(false);
      Worms.play(false); */
    }
  }
}

export { boxController, candiesLoader };
