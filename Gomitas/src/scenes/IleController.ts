import * as BABYLON from "babylonjs";
import "babylonjs-loaders";
import { candiesLoader } from "./CandyLoader";

  function candiesPosition(
    xPosition: number,
    yPosition: number,
    zPosition: number
  ) {
    return new BABYLON.Vector3(xPosition, yPosition, zPosition);
  }

  function switcherOp(ileState:boolean[], ileSelector: number){
    for (let i = 0; i < ileState.length; i++){
      ileState[i] = i == ileSelector;
    }
    console.log(ileState);
  }

  function ileController(scene:BABYLON.Scene, candyState:boolean) {
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

export { ileController, switcher, switcherOp };
