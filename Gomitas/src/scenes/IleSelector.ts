import { HighlightLayer, StandardMaterial, SceneLoader, Vector3, Color3, Space, GizmoManager, UtilityLayerRenderer, type Scene, MeshBuilder, CreatePlane, RotationGizmo, InstancedMesh, Mesh } from "@babylonjs/core";
import { objectToString } from "@vue/shared";

interface Ile {
  id: number | string;
  object?: Mesh;
}

const iles: Ile[] = [];

function ileLoad( position: Vector3, rotation: number, scene: Scene){
  const highlightLayer = new HighlightLayer("highlight", scene);
  const plane: any = MeshBuilder.CreatePlane('select',{size: 1, width: 0.5, height: 2.5, sideOrientation: 2});
  highlightLayer.addMesh(plane, Color3.Green());
  let mat1 = new StandardMaterial("mat1", scene);
  mat1.alpha = 0;
  plane.material = mat1;
  plane.rotation.x = Math.PI/2;
  plane.rotate(new Vector3(1, 1, 1), rotation * Math.PI, Space.WORLD);
  plane.translate(position, 1, Space.WORLD);


  iles.push(
      { id: 1,
        object: plane.createInstance(`plane${1}`),
      },
      { id: 2,
        object: plane.createInstance(`plane${2}`),
      },
      { id: 3,
        object: plane.createInstance(`plane${3}`),
      },
      { id: 4,
        object: plane.createInstance(`plane${4}`),
      },
      { id: 5,
        object: plane.createInstance(`plane${5}`),
      },
    )
      iles[0].object?.translate(new Vector3(0.64, 0, 0), 1, Space.WORLD);
      iles[1].object?.translate(new Vector3(1.28, 0, 0), 1, Space.WORLD);
      iles[2].object?.translate(new Vector3(1.88, 0, 0), 1, Space.WORLD);
      iles[3].object?.translate(new Vector3(2.5, 0, 0), 1, Space.WORLD);
      iles[4].object?.translate(new Vector3(3.15, 0, 0), 1, Space.WORLD);
  return iles;
}

function ileSelect( position: Vector3, rotation: number, scene: Scene){

}

export { ileSelect, ileLoad };

