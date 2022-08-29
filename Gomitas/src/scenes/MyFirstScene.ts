
import {
  Engine,
  Scene,
  ArcRotateCamera,
  Vector3,
  MeshBuilder,
  StandardMaterial,
  Color3,
  HemisphericLight,
  SceneLoader
} from "@babylonjs/core";
import * as BABYLON from 'babylonjs';
import { AnimationGroup } from "babylonjs";
import 'babylonjs-loaders';
const createScene = (canvas) => {
  const engine = new Engine(canvas);
  const scene = new BABYLON.Scene(engine);

  const camera = new ArcRotateCamera("camera1", 0, 10, 10, new Vector3(0, 5, -10), scene);
  camera.setTarget(Vector3.Zero());
  camera.attachControl(canvas, true);

  new HemisphericLight("light", Vector3.Up(), scene);

  BABYLON.SceneLoader.ImportMesh("CandyBox", "./", "CandyBox.gltf", scene, function (newMeshes, particleSystems, skeletons, animationGroups) {
    const box = animationGroups[0];
    box.play(false);
});
  BABYLON.SceneLoader.ImportMesh("", "./", "LifeSaversAnimation.glb", scene , function (newMeshes, particleSystems, skeletons, animationGroups) {
    const ls = newMeshes[0];
    const lifesaver = animationGroups[0];
    lifesaver.play(false);
    ls.translate(new BABYLON.Vector3(-1.57, 0, -0.95), 1, BABYLON.Space.WORLD);
});

  // const box = MeshBuilder.CreateBox("box", { size: 2 }, scene);
  /* const material = new StandardMaterial("box-material", scene);
  material.diffuseColor = Color3.Blue();
  box.material = material; */
  //console.log(box.currentFrame);
  //box.play();

  engine.runRenderLoop(() => {
    scene.render();
  });
};

export { createScene };
