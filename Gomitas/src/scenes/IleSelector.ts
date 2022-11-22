import { HighlightLayer, SceneLoader, Vector3, Space, GizmoManager, UtilityLayerRenderer, type Scene, MeshBuilder, CreatePlane, RotationGizmo } from "@babylonjs/core";
import { objectToString } from "@vue/shared";


function ilePlay( position: Vector3, rotation: number, scene: Scene){

  const plane = MeshBuilder.CreatePlane('select',{size: 1, width: 0.5, height: 1, sideOrientation: 2});
  plane.rotation.x = Math.PI/2;
  plane.rotate(new Vector3(1, 1, 1), rotation*Math.PI, Space.WORLD);
  plane.translate(position, 1, Space.WORLD);
}

export { ilePlay };

