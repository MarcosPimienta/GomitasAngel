import { HighlightLayer, StandardMaterial, Vector3, Color3, Space, Matrix, type Scene, MeshBuilder, Mesh, Camera, InstancedMesh, ActionManager, ExecuteCodeAction, } from "@babylonjs/core";

let selectedIndex: number = 0;
let selectedCandiesForIles: (number | null)[] = [null, null, null, null, null, null];
let allCandiesReference: { id: number; name: string }[] = [];

interface Ile {
  id: number | string;
  object?: Mesh | InstancedMesh;
}

function ileCone(scene:Scene, initialVisibility: boolean): Mesh {
  const highlightLayer = new HighlightLayer("highlight", scene);
  const cone: Mesh = MeshBuilder.CreateCylinder("cone", {height: 0.15, diameterTop: 0, diameterBottom: 0.2, tessellation: 8, subdivisions: 24}, scene);
  highlightLayer.addMesh(cone, new Color3(0.40, 0.78, 0.78), true);
  highlightLayer.innerGlow = true;
  highlightLayer.outerGlow = true;
  let mat2 = new StandardMaterial("mat1", scene);
  cone.material = mat2;
  mat2.alpha = 1;
  mat2.disableLighting = true;
  mat2.emissiveColor = new Color3(0.40, 0.78, 0.78);
  cone.rotation.x = Math.PI;
  cone.rotate(new Vector3(1, 1, 1), 180 * Math.PI, Space.WORLD);
  cone.translate(new Vector3(-1.56, 0.5, 1.5), 1, Space.WORLD);
  cone.isVisible = initialVisibility;

  return cone;
}

function ileLoad(scene: Scene) {
  const iles: Ile[] = [];
  const plane: any = MeshBuilder.CreatePlane('parent', { size: 1, width: 0.6, height: 2.7, sideOrientation: 2 });
  let mat1 = new StandardMaterial("mat1", scene);
  mat1.alpha = 0;
  plane.material = mat1;
  plane.rotation.x = Math.PI / 2;
  plane.rotate(new Vector3(1, 1, 1), 90 * Math.PI, Space.WORLD);
  plane.translate(new Vector3(-1.56, 0.3, 0), 1, Space.WORLD)
  plane.setEnabled(false);

  for (let i = 0; i < 6; i++) {
    iles.push({
      id: i,
      object: plane.createInstance(`plane${i}`)
    });
  }

  const coordinates = [
    new Vector3(-1.6, 0.3, 0),
    new Vector3(-0.95, 0.3, 0),
    new Vector3(-0.32, 0.3, 0),
    new Vector3(0.32, 0.3, 0),
    new Vector3(0.95, 0.3, 0),
    new Vector3(1.6, 0.3, 0)
  ];

  // Update the translation of each ile
  for (let i = 0; i < iles.length; i++) {
    iles[i].object!.position = coordinates[i];
  }

  return iles;
}

function ileSelect( index: number, cone: Mesh){

  let ilePositions: Array<number> = [
    -1.6,
    -0.95,
    -0.32,
    0.32,
    0.95,
    1.6,
  ];
  cone.position.x = ilePositions[index];

  return index;
}

function setCandyForIle(ileIndex: number, candyId: number) {
  selectedCandiesForIles[ileIndex] = candyId;
}

function setupHighlighting(scene: Scene, iles: Ile[], isBoxOpen: Ref<boolean>) {
  // Define the bounding box color
  const boundingBoxColor = new Color3(0.40, 0.78, 0.78);

  iles.forEach(ile => {
    if (ile.object instanceof Mesh || ile.object instanceof InstancedMesh) {
      ile.object.actionManager = ile.object.actionManager || new ActionManager(scene);

      // On mouse enter
      ile.object.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPointerOverTrigger, () => {
        scene.hoverCursor = "pointer";
        if (ile.object && isBoxOpen.value) {
          ile.object.showBoundingBox = true;
          // Change the bounding box color
          scene.getBoundingBoxRenderer().frontColor = boundingBoxColor;
          scene.getBoundingBoxRenderer().backColor = boundingBoxColor;
        }
      }));
      // On mouse exit
      ile.object.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPointerOutTrigger, () => {
        if (ile.object) {
          ile.object.showBoundingBox = false;
        }
      }));
    }
  });
}

function mouseListener(scene: Scene, Iles: Ile[], camera: Camera, cone: Mesh, onIleSelected: (index: number) => void){
  scene.onPointerDown = function castRay(){
    let ray = scene.createPickingRay(scene.pointerX, scene.pointerY, Matrix.Identity(), camera, false);
    let hit: any = scene.pickWithRay(ray);
    Iles.find(elem=>{
      if(elem.object?.id === hit?.pickedMesh?.id){
        selectedIndex = hit?.pickedMesh?.uniqueId -10;
        ileMouseSelect(Iles, selectedIndex, cone, onIleSelected);
        setIndex(selectedIndex);

        return selectedIndex;
      }
    })
  }
}

function setAllCandiesReference(candies: { id: number; name: string }[]) {
  allCandiesReference = candies;
}

function ileMouseSelect(Iles: Ile[], index: number, cone: Mesh, onIleSelected: (index: number) => void) {

  // Log the selected candy for the given Ile
  const selectedCandyForIle = selectedCandiesForIles[index];
  const candyDetails = allCandiesReference.find(c => c.id === selectedCandyForIle);

  if (selectedCandyForIle !== null) {
    console.log(`Ile ${index} has candy with ID: ${selectedCandyForIle}`);
  } else {
    console.log(`Ile ${index} has no candy selected.`);
  }
  ileSelect(index, cone);
  onIleSelected(index);

  if (candyDetails) {
    console.log(`Ile ${index} has candy: ${candyDetails.name}`);
  } else {
    console.log(`Ile ${index} has no candy selected.`);
  }

  return index;
}

function setIndex(index: number){
  selectedIndex = index;
}

function getIndex():number{
  return selectedIndex;
}

export { ileSelect, ileMouseSelect, ileLoad, ileCone, mouseListener, setupHighlighting, setIndex, setCandyForIle, getIndex, setAllCandiesReference };
