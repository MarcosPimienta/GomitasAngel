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

function switcherOp(ileState: any, ileSelector: number, animSelector: number, scene: BABYLON.Scene) {
  for (let i = 0; i < ileState.length; i++) {
    ileState[i].state = i == ileSelector;
    switch (i) {
      case 0:
        /* candiesLoader(
          "",
          "./",
          "Candies.glb",
          scene,
          candiesPosition(-1.56, 0, 0),
          ileState[i],
          animSelector
        ); */
        break;
      case 1:
        /* candiesLoader(
          "",
          "./",
          "Candies.glb",
          scene,
          candiesPosition(-0.93, 0, 0),
          ileState[i],
          animSelector
        ); */
        break;
      case 2:
        /* candiesLoader(
          "",
          "./",
          "Candies.glb",
          scene,
          candiesPosition(-0.31, 0, 0),
          ileState[i],
          animSelector
        ); */
        break;
      case 3:
        /* candiesLoader(
          "",
          "./",
          "Candies.glb",
          scene,
          candiesPosition(0.31, 0, 0),
          ileState[i],
          animSelector
        ); */
        break;
      case 4:
        /* candiesLoader(
          "",
          "./",
          "Candies.glb",
          scene,
          candiesPosition(0.93, 0, 0),
          ileState[i],
          animSelector
        ); */
        break;
      case 5:
        /* candiesLoader(
          "",
          "./",
          "Candies.glb",
          scene,
          candiesPosition(1.56, 0, 0),
          ileState[i],
          animSelector
        ); */
        break;
      default:
      //default block statement;
    }
  }
  console.log(ileState);
  console.log(animSelector);
}

export { switcherOp };
