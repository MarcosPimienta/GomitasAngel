import {
  Engine,
  ArcRotateCamera,
  Vector3,
  Color3,
  Color4,
  HemisphericLight,
  Scene,
} from "@babylonjs/core";
import "@babylonjs/inspector";
import "babylonjs-loaders";
import * as CandyLoader from "./CandyLoader";
import * as IleSelector from "./IleSelector"

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
  let box = CandyLoader.boxController(["CandyBox"], "./", "CandyBox.gltf", scene);

  //load cone for selection display
  let ilesCone = IleSelector.ileCone(scene);

  //load iles for selection and loading
  let iles = IleSelector.ileLoad(scene);

  //allows mouse to select within BabylonJS Scene with coordinates
  IleSelector.mouseListener(scene, iles, camera, ilesCone);

  //adds light into BabylonJS Scene
  let light = new HemisphericLight("light", new Vector3(0, 5, 0), scene);
  //let light2 = new HemisphericLight("light", new Vector3(2, -1, 0), scene);

  scene.clearColor = new Color4(0.91, 0.96, 0.97, 1);

  scene.debugLayer.show({
    embedMode: true,
  });

  engine.runRenderLoop(() => {
    scene.render();
  });
  return {scene, engine, candiesInstances, ilesCone}
};

export { createScene };