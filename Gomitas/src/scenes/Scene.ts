import {
  Engine,
  ArcRotateCamera,
  Vector3,
  HemisphericLight,
  Scene,
} from "@babylonjs/core";
import "@babylonjs/inspector";
import "babylonjs-loaders";
import * as CandyLoader from "./CandyLoader";
import * as IleSelector from "./IleSelector"

let indexSelect: number =  IleSelector.selectedIndex;

const createScene = function (canvas:HTMLCanvasElement){
  const engine = new Engine(canvas);
  const scene = new Scene(engine);

  let candiesInstances: CandyLoader.Candy[] = CandyLoader.candiesLoader(scene, new Vector3(-1.56, 0, 0));

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

  //load candy box with open animation
  CandyLoader.boxController(["CandyBox"], "./", "CandyBox.gltf", scene);

  //load cone for selection display
  let ilesCone = IleSelector.ileCone(scene);

  //load iles for selection and loading
  let iles = IleSelector.ileLoad(scene);

  //allows mouse to select within BabylonJS Scene with coordinates
  IleSelector.mouseListener(scene, iles, camera, ilesCone);

  //adds light into BabylonJS Scene
  new HemisphericLight("light", Vector3.Up(), scene);

  scene.debugLayer.show({
    embedMode: true,
  });

  engine.runRenderLoop(() => {
    scene.render();
  });
  return {scene, engine, candiesInstances, indexSelect, ilesCone}
};

export { createScene, indexSelect };