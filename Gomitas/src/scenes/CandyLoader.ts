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

function candiesLoader(
  meshNames: string,
  meshPath: string,
  meshFile: string,
  scene: BABYLON.Scene,
  ilePos: BABYLON.Vector3,
  animGate: boolean,
) {
  if (animGate){
    BABYLON.SceneLoader.ImportMesh(
      meshNames,
      meshPath,
      meshFile,
      scene,
      function (newMeshes, particleSystems, skeletons, animationGroups) {
        //Animation groups that comes from a .glb file
        const ChocoMellows = animationGroups[0];
        const LifeSavers = animationGroups[1];
        const Oranges = animationGroups[2];
        const Ribbons = animationGroups[3];
        const Strawberries = animationGroups[4];
        const Worms = animationGroups[5];
        const candyParent = newMeshes[0];
        candyParent.translate(ilePos, 1, BABYLON.Space.WORLD);
        ChocoMellows.play(false);
      }
    );
  }
}


export { boxController, candiesLoader };
