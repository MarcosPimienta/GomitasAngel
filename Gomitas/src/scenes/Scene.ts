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
  CandyLoader.boxController(["CandyBox"], "./", "CandyBox.gltf", scene);
  IleSelector.ileLoad(new Vector3(-1.57, 0, 0), 90, scene);
  new HemisphericLight("light", Vector3.Up(), scene);

  scene.debugLayer.show({
    embedMode: true,
  });
  engine.runRenderLoop(() => {
    scene.render();
  });
  return {scene, engine, candiesInstances}
};

export { createScene };