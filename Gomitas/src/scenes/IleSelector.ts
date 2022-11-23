import { HighlightLayer, SceneLoader, Vector3, Space, GizmoManager, UtilityLayerRenderer, type Scene, MeshBuilder, CreatePlane, RotationGizmo, InstancedMesh, Mesh } from "@babylonjs/core";
import { objectToString } from "@vue/shared";

interface Ile {
  id: number | string;
  object?: Mesh;
}

const iles: Ile[] = [];

function ileLoad( position: Vector3, rotation: number, scene: Scene){
  const plane: any = MeshBuilder.CreatePlane('select',{size: 1, width: 0.45, height: 1, sideOrientation: 2});
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
      iles[3].object?.translate(new Vector3(2.48, 0, 0), 1, Space.WORLD);
      iles[4].object?.translate(new Vector3(3.08, 0, 0), 1, Space.WORLD);
  return iles;
}

function ilePlay( position: Vector3, rotation: number, scene: Scene){

  
}

export { ilePlay, ileLoad };

