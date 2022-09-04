
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
import 'babylonjs-loaders';
import { boxController, candiesLoader } from "./CandyLoader";

const createScene = (canvas) => {
  const engine = new Engine(canvas);
  const scene = new BABYLON.Scene(engine);

  const camera = new ArcRotateCamera("camera1", 0, 0, 0, new Vector3(0, 5, 10), scene);
  camera.setTarget(Vector3.Zero());
  camera.attachControl(canvas, true);

  new HemisphericLight("light", Vector3.Up(), scene);

  boxController(["CandyBox"], "./", "CandyBox.gltf", scene);
  candiesLoader(["LifeSavers" , "ChocoMellows", "Oranges", "Ribbons", "Strawberries", "Worms"], "./", "Candies.glb", scene);

  engine.runRenderLoop(() => {
    scene.render();
  });
};

export { createScene };
