import {
  Engine,
  ArcRotateCamera,
  Vector3,
  HemisphericLight,
  AnimationGroup,
  Scene
} from "@babylonjs/core";
import "@babylonjs/inspector";
import * as BABYLON from "babylonjs";
import "babylonjs-loaders";
import * as CandyLoader from "./CandyLoader";
import { switcherOp } from "./IleController";

function exposeAnim(animSelector: number, candiesInstance: CandyLoader.Candy, scene: Scene){
  CandyLoader.candiesPlay(animSelector, candiesInstance, scene);
};

const createScene = function (canvas:HTMLCanvasElement){
  const engine = new Engine(canvas);
  const scene = new Scene(engine);
  const ileState: any = [
    { state: false, empty: true, anim: 1 },
    { state: false, empty: true, anim: 1  },
    { state: false, empty: true, anim: 1  },
    { state: false, empty: true, anim: 1  },
    { state: false, empty: true, anim: 1  },
    { state: false, empty: true, anim: 1  },
  ];
  const animState: any = [
    { state: false },
    { state: false },
    { state: false },
    { state: false },
    { state: false },
    { state: false },
  ];
  let ileSelector:number = 0;
  let sceneAnim:number = 0;
  let animFwd : boolean = true;
  let animSelector:number = 0;

  let candiesInstances: CandyLoader.Candy[] = CandyLoader.candiesLoader(scene, new Vector3(-1.56, 0, 0),animFwd, animSelector);
  //exposeAnim(animSelector, candiesInstances[0], scene);
  //CandyLoader.candiesPlay( animSelector, candiesInstances[0], scene);
  //cloneCandies(scene, new Vector3(-1.56, 0, 0));

  /* scene.onKeyboardObservable.add((kbInfo) => {
    switch (kbInfo.type) {
      case BABYLON.KeyboardEventTypes.KEYDOWN:
        if (kbInfo.event.key == "ArrowUp") {
          animFwd = false;
          if (animSelector > 0) {
            animSelector--;
          }
          console.log("KEY DOWN: ", kbInfo.event.key);
        } else if (kbInfo.event.key == "ArrowDown") {
          animFwd = true;
          if (animSelector < 6) {
            animSelector++;
          }
          console.log("KEY DOWN: ", kbInfo.event.key);
        }
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
        //switcherOp(ileState, ileSelector, animSelector, scene);
        console.log(scene);
        break;
    }
    //CandyLoader.candiesLoader(scene, new Vector3(-1.56, 0, 0),animFwd, animSelector);
    CandyLoader.candiesPlay(animFwd, animSelector, candiesInstances[0], scene);
  }); */
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
  CandyLoader.boxController(["CandyBox"], "./", "CandyBox.gltf", scene);


  new HemisphericLight("light", Vector3.Up(), scene);

   /*switcherOp(ileState, ileSelector, animSelector, scene); */
  scene.debugLayer.show({
    embedMode: true,
  });
  engine.runRenderLoop(() => {
    scene.render();
  });
  return {scene, engine, candiesInstances}
};

export { createScene, exposeAnim };