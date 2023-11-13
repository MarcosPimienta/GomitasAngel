import {
  Engine,
  ArcRotateCamera,
  Vector3,
  HemisphericLight,
  SpotLight,
  Scene,
  VideoDome
} from "@babylonjs/core";
import "@babylonjs/inspector";
import "babylonjs-loaders";
import * as CandyLoader from "./CandyLoader";
import * as IleSelector from "./IleSelector"

const createScene = function (canvas:HTMLCanvasElement, onIleSelected: (index: number) => void, isBoxOpen: Ref<boolean>) {
  console.log('createScene called');

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
  camera.setTarget(new Vector3(0, 1, 0));
  camera.attachControl(canvas, true);
  //camera.minZ = 0.1;
  //load cone for selection display
  let ilesCone = IleSelector.ileCone(scene, (visible) => {
    isBoxOpen.value = visible; // Set the visibility of the cone based on the box's open state
  });

  //load iles for selection and loading
  let iles = IleSelector.ileLoad(scene);

  //allows mouse to select within BabylonJS Scene with coordinates
  IleSelector.mouseListener(scene, iles, camera, ilesCone, onIleSelected);

  let videoDome = new VideoDome(
    "videoDome",
    ["./video/Main360.mp4"],
    {
        resolution: 32,
        clickToPlay: true,
    },
    scene
  );

  videoDome.rotation.y = 30;

  //load candy box with open animation
  let box = CandyLoader.boxController(["CandyBox"], "./3d-models/", "CandyBox.gltf", scene);
  // load knot with animation
  let knot = CandyLoader.knotController(["Cinta"], "./3d-models/", "Nudo_Cinta.gltf", scene);
  //console.log(box,);

  //adds light into BabylonJS Scene
  let light = new HemisphericLight("light", new Vector3(0, 10, 0), scene);
  //let light2 = new HemisphericLight("light2", new Vector3(2, -1, 0), scene);
  let spotlight = new SpotLight("spotLight", new Vector3(0, 6, 0), new Vector3(0, -45, 0), Math.PI * 2, 2, scene);
  spotlight.intensity = 100;

  /* scene.clearColor = new Color4(0.76, 0.93, 0.92); */

  /* scene.debugLayer.show({
    embedMode: true,
  }); */

  engine.runRenderLoop(() => {
    scene.render();
  });
  const result = {
    scene,
    engine,
    candiesInstances,
    ilesCone,
    knot,
    updateText: box.updateText,
    updateMsg: box.updateMsg
  };
  console.log('createScene executed');
  console.log('Box:', box);
  console.log('Box updateText:', box.updateText);
  console.log('createScene is returning:', result);
    return result;
};

export { createScene };