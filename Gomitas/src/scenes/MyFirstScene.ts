import {
  Engine,
  Scene,
  ArcRotateCamera,
  Vector3,
  MeshBuilder,
  StandardMaterial,
  Color3,
  HemisphericLight,
  SceneLoader,
} from "@babylonjs/core";
import * as BABYLON from "babylonjs";
import "babylonjs-loaders";
import { boxController, candiesLoader } from "./CandyLoader";
import { switcherOp } from "./IleController";

const createScene = (canvas) => {
  const engine = new Engine(canvas);
  const scene = new BABYLON.Scene(engine);
  let ileState:boolean[] = [false, false, false, false, false, false];
  let ileSelector:number = 0;

  scene.onKeyboardObservable.add((kbInfo) => {
    switch (kbInfo.type) {
      case BABYLON.KeyboardEventTypes.KEYDOWN:
        if(kbInfo.event.key == "ArrowLeft"){
          if(ileSelector > 0){
            ileSelector--;
          }
          console.log("KEY DOWN: ", kbInfo.event.key);
        }
        else if(kbInfo.event.key == "ArrowRight"){
          if(ileSelector < ileState.length - 1 ){
            ileSelector++;
          }
          console.log("KEY DOWN: ", kbInfo.event.key);
        }
        switcherOp(ileState, ileSelector);
        break;
    }
  });

  const camera = new ArcRotateCamera(
    "camera1",
    0,
    0,
    0,
    new Vector3(0, 5, 10),
    scene
  );
  camera.setTarget(Vector3.Zero());
  camera.attachControl(canvas, true);

  new HemisphericLight("light", Vector3.Up(), scene);

  function candiesPosition(
    xPosition: number,
    yPosition: number,
    zPosition: number
  ) {
    return new BABYLON.Vector3(xPosition, yPosition, zPosition);
  }

  boxController(["CandyBox"], "./", "CandyBox.gltf", scene);
  const candyIle0 = candiesLoader(
    [
      "LifeSavers",
      "ChocoMellows",
      "Oranges",
      "Ribbons",
      "Strawberries",
      "Worms",
    ],
    "./",
    "Candies.glb",
    scene,
    candiesPosition(-1.56, 0, 0)
  );
  const candyIle1 = candiesLoader(
    [
      "LifeSavers",
      "ChocoMellows",
      "Oranges",
      "Ribbons",
      "Strawberries",
      "Worms",
    ],
    "./",
    "Candies.glb",
    scene,
    candiesPosition(-0.93, 0, 0)
  );
  const candyIle2 = candiesLoader(
    [
      "LifeSavers",
      "ChocoMellows",
      "Oranges",
      "Ribbons",
      "Strawberries",
      "Worms",
    ],
    "./",
    "Candies.glb",
    scene,
    candiesPosition(-0.31, 0, 0)
  );
  const candyIle3 = candiesLoader(
    [
      "LifeSavers",
      "ChocoMellows",
      "Oranges",
      "Ribbons",
      "Strawberries",
      "Worms",
    ],
    "./",
    "Candies.glb",
    scene,
    candiesPosition(0.31, 0, 0)
  );
  const candyIle4 = candiesLoader(
    [
      "LifeSavers",
      "ChocoMellows",
      "Oranges",
      "Ribbons",
      "Strawberries",
      "Worms",
    ],
    "./",
    "Candies.glb",
    scene,
    candiesPosition(0.93, 0, 0)
  );
  const candyIle5 = candiesLoader(
    [
      "LifeSavers",
      "ChocoMellows",
      "Oranges",
      "Ribbons",
      "Strawberries",
      "Worms",
    ],
    "./",
    "Candies.glb",
    scene,
    candiesPosition(1.56, 0, 0)
  );

  engine.runRenderLoop(() => {
    scene.render();
  });
};

export { createScene };
