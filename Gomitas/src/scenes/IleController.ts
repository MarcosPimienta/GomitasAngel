import * as BABYLON from "babylonjs";
import "babylonjs-loaders";
import { candiesLoader } from "./CandyLoader";

let ileState:boolean[] = [false, false, false, false, false, false];

  function candiesPosition(
    xPosition: number,
    yPosition: number,
    zPosition: number
  ) {
    return new BABYLON.Vector3(xPosition, yPosition, zPosition);
  }

  function switcher(ileState:boolean[], ileSelector: number){
    if (ileSelector == 0){
      ileState[ileSelector] = true;
    }
    if (ileSelector == 1){
      ileState[ileSelector] = true;
    }
    if (ileSelector == 2){
      ileState[ileSelector] = true;
    }
    if (ileSelector == 3){
      ileState[ileSelector] = true;
    }
    if (ileSelector == 4){
      ileState[ileSelector] = true;
    }
    if (ileSelector == 5){
      ileState[ileSelector] = true;
    }
  }

  function ileController(scene:BABYLON.Scene) {
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
  }

export { ileController };
