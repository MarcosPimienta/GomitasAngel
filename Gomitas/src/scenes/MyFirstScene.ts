import {
  Engine,
  ArcRotateCamera,
  Vector3,
  HemisphericLight,
} from "@babylonjs/core";
import * as BABYLON from "babylonjs";
import "babylonjs-loaders";
import { boxController } from "./CandyLoader";
import { switcherOp } from "./IleController";

const createScene = (canvas) => {
  const engine = new Engine(canvas);
  const scene = new BABYLON.Scene(engine);
  const ileState: any = [
    { state: false, empty: true },
    { state: false, empty: true },
    { state: false, empty: true },
    { state: false, empty: true },
    { state: false, empty: true },
    { state: false, empty: true },
  ];
  let ileSelector = 0;

  scene.onKeyboardObservable.add((kbInfo) => {
    switch (kbInfo.type) {
      case BABYLON.KeyboardEventTypes.KEYDOWN:
        if (kbInfo.event.key == "ArrowLeft") {
          if (ileSelector > 0) {
            ileSelector--;
          }
          console.log("KEY DOWN: ", kbInfo.event.key);
        } else if (kbInfo.event.key == "ArrowRight") {
          if (ileSelector < ileState.length - 1) {
            ileSelector++;
          }
          console.log("KEY DOWN: ", kbInfo.event.key);
        }
        switcherOp(ileState, ileSelector, scene);
        console.log(scene);
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
  camera.inputs.remove(camera.inputs.attached.keyboard);

  new HemisphericLight("light", Vector3.Up(), scene);

  boxController(["CandyBox"], "./", "CandyBox.gltf", scene);
  switcherOp(ileState, ileSelector, scene);

  engine.runRenderLoop(() => {
    scene.render();
  });
};

export { createScene };
