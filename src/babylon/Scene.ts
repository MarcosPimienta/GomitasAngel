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

const createScene = function (canvas: HTMLCanvasElement, onIleSelected: (index: number) => void, isBoxOpen: Ref<boolean>): Promise<SceneReturnType> {
  return new Promise((resolve, reject) => {
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

    let ilesCone = IleSelector.ileCone(scene, (visible) => {
      isBoxOpen.value = visible;
    });

    let iles = IleSelector.ileLoad(scene);

    IleSelector.mouseListener(scene, iles, camera, ilesCone, onIleSelected);
    IleSelector.setupHighlighting(scene, iles);

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

    let box = CandyLoader.boxController(["CandyBox"], "./3d-models/", "CandyBox.gltf", scene);
    let knot = CandyLoader.knotController(["Cinta"], "./3d-models/", "Nudo_Cinta.gltf", scene);

    let light = new HemisphericLight("light", new Vector3(0, 10, 0), scene);
    let spotlight = new SpotLight("spotLight", new Vector3(0, 6, 0), new Vector3(0, -45, 0), Math.PI * 2, 2, scene);
    spotlight.intensity = 100;

    // Wait for everything in the scene to be ready
    scene.executeWhenReady(() => {
      const result: SceneReturnType = {
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

      resolve(result);
    });

    engine.runRenderLoop(() => {
      scene.render();
    });
  });
};

export { createScene };