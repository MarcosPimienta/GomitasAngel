import { HighlightLayer, StandardMaterial, Vector3, Color3, Space, Matrix, type Scene, MeshBuilder, Mesh, Camera } from "@babylonjs/core";
import { objectToString } from "@vue/shared";

interface Ile {
  id: number | string;
  object?: Mesh;
}

function ileCone(scene:Scene): Mesh{
  const highlightLayer = new HighlightLayer("highlight", scene);
      const cone: Mesh = MeshBuilder.CreateCylinder("cone", {height: 0.15, diameterTop: 0, diameterBottom: 0.2, tessellation: 8, subdivisions: 24}, scene);
      highlightLayer.addMesh(cone, Color3.White());
      let mat2 = new StandardMaterial("mat1", scene);
      cone.material = mat2;
      mat2.alpha = 0;
      cone.rotation.x = Math.PI;
      cone.rotate(new Vector3(1, 1, 1), 180 * Math.PI, Space.WORLD);
      cone.translate(new Vector3(-1.56, 0.5, 1.5), 1, Space.WORLD);

      return cone;
}

function ileLoad(scene: Scene){
  const iles :Ile[] = [];
  const plane: any = MeshBuilder.CreatePlane('parent',{size: 1, width: 0.5, height: 2.7, sideOrientation: 2});
  let mat1 = new StandardMaterial("mat1", scene);
  mat1.alpha = 0;
  plane.material = mat1;
  plane.rotation.x = Math.PI/2;
  plane.rotate(new Vector3(1, 1, 1), 90 * Math.PI, Space.WORLD);
  plane.translate(new Vector3(-1.56, 0.3, 0), 1, Space.WORLD)
  plane.setEnabled(false);

  iles.push(
      { id: 0,
        object: plane.createInstance(`plane${0}`),
      },
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
      iles[0].object?.translate(new Vector3(0, 0, 0), 1, Space.WORLD);
      iles[1].object?.translate(new Vector3(0.64, 0, 0), 1, Space.WORLD);
      iles[2].object?.translate(new Vector3(1.28, 0., 0), 1, Space.WORLD);
      iles[3].object?.translate(new Vector3(1.88, 0, 0), 1, Space.WORLD);
      iles[4].object?.translate(new Vector3(2.5, 0, 0), 1, Space.WORLD);
      iles[5].object?.translate(new Vector3(3.15, 0, 0), 1, Space.WORLD);

    return iles;
  }

function ileSelect( index: number, cone: Mesh){
  console.log(index);
  let ilePositions: Array<number> = [
    -1.56,
    -0.93,
    -0.31,
    0.31,
    0.93,
    1.56,
  ];
  cone.position.x = ilePositions[index];
}

function mouseListener(scene: Scene, Iles: Ile[], camera: Camera, cone: Mesh){
  scene.onPointerDown = function castRay(){
    let ray = scene.createPickingRay(scene.pointerX, scene.pointerY, Matrix.Identity(), camera, false);
    let hit: any = scene.pickWithRay(ray);
    Iles.find(elem=>{
      if(elem.object?.id === hit?.pickedMesh?.id){
        let selectedIndex = hit?.pickedMesh?.uniqueId -10;
        ileMouseSelect(Iles, selectedIndex, cone)
      }
    })
  }
}

function ileMouseSelect(Iles: Ile[], index: number, cone: Mesh){
  Iles.findIndex((mesh) => {
    if (mesh.id === index){
      console.log('Hi ' + mesh.id);
    }
  })
  ileSelect(index, cone);
  return index;
}

export { ileSelect, ileMouseSelect, ileLoad, ileCone, mouseListener };

