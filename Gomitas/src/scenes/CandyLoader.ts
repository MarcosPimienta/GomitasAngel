import { AnimationGroup, SceneLoader, Vector3, Tools, Space, DynamicTexture, Engine, PBRMaterial, Texture, type ISceneLoaderAsyncResult, Scene, StandardMaterial } from "@babylonjs/core";


//This is my GUI engine
let engine: Engine;

//This will handle the instance to be imported
interface Candy {
  id: number | string;
  name: string;
  object: ISceneLoaderAsyncResult;
  mesh: string;
  animation?: AnimationGroup;
  repeat?: boolean;
  ilePos: Vector3;
}

//This handles the configuration of the imported Candy above and its values inside the scene
interface CandyConfig {
  id: number;
  name: string[];
  path: string;
  file: string;
  row_position: Vector3;
}

//let POSITION: Vector3 = new Vector3(0, 0, 0);

interface CandyObject {
  id: number;
  name: string;
  visible: boolean;
  position: Vector3;
  rotation?: Vector3;
  scale?: Vector3;
  material?: string;
  animation?: AnimationGroup;
}

const config: CandyConfig[] = [{
  id: 0,
  name: ['ChocoMellows', 'Cables', 'LifeSavers', 'Ribbons', 'Strawberries', 'Worms'],
  path: "./",
  file: "Gummies.gltf",
  row_position: new Vector3(0, 0, 0),
}]

function resetAllAnimations(candiesInstances: Candy[]) {
  candiesInstances.forEach(candyInstance => {
    if (candyInstance.object) {
      // Reset animations
      if (candyInstance.object.animationGroups) {
        candyInstance.object.animationGroups.forEach(anim => {
          anim.reset();
        });
      }

      if (candyInstance.object.transformNodes) {
        candyInstance.object.transformNodes.forEach(mesh => {
          mesh.setEnabled(false);
        });
      }
    }
  });
}

function candiesPlay( index: number, candiesMesh: Candy, scene: Scene, newIndex: string){
    const animations = candiesMesh.object.animationGroups;
    const meshes = candiesMesh.object.transformNodes;
    const meshIndex = meshes.findIndex((item)=> item.id == newIndex);

    meshes.forEach((mesh)=>{
        mesh.setEnabled(false);
      })

      animations.forEach((anim)=>{
        anim.reset();
      })

      meshes[meshIndex].setEnabled(true);
      animations[index].play(false);
}

function animationHandler(Candies: Candy[]){
  Candies.forEach((Candy)=>{
    const meshes = Candy.object.transformNodes;
    meshes.forEach((mesh)=>{
        mesh.setEnabled(false);
      })
    Candy.object.animationGroups.forEach((anim)=>{
      anim.reset();
      anim.stop();
    })
  })
}

function createTextTexture(scene: Scene, text: string, engine: Engine) {
  const textureResolution = 512;

  // Create a dynamic texture
  const dynamicTexture = new DynamicTexture(
    "dynamic texture",
    {width: textureResolution, height: textureResolution},
    scene,
    true
  );

  // Get the 2D drawing context of the dynamic texture
  const ctx = dynamicTexture.getContext() as CanvasRenderingContext2D;

  // Clear the context with a transparent color
  ctx.clearRect(0, 0, textureResolution, textureResolution);

  // Set the font properties
  ctx.font = "bold 44px Arial";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Update function to change text
  const updateText = (newText: string) => {
    ctx.clearRect(0, 0, textureResolution, textureResolution); // Clear previous text
    ctx.fillText(newText, textureResolution / 2, textureResolution / 2); // Draw new text
    dynamicTexture.update(); // Update the texture
  };

  updateText(text); // Initial update

  return {
    dynamicTexture,
    updateText
  };
};

function candiesLoader(scene: Scene, position: Vector3){
  const candiesInstances: Candy[] = [];
  config.forEach(async (candy) => {
  try {
        candiesInstances.push({
        id: candy.id,
        name: candy.file,
        object: await SceneLoader.ImportMeshAsync(
          candy.name,
          candy.path,
          candy.file,
          scene,
        ),
        mesh: "",
        ilePos: position,
      },
      {
        id: candy.id,
        name: candy.file,
        object: await SceneLoader.ImportMeshAsync(
          candy.name,
          candy.path,
          candy.file,
          scene,
        ),
        mesh: "",
        ilePos: position,
      },
      {
        id: candy.id,
        name: candy.file,
        object: await SceneLoader.ImportMeshAsync(
          candy.name,
          candy.path,
          candy.file,
          scene,
        ),
        mesh: "",
        ilePos: position,
      },
      {
        id: candy.id,
        name: candy.file,
        object: await SceneLoader.ImportMeshAsync(
          candy.name,
          candy.path,
          candy.file,
          scene,
        ),
        mesh: "",
        ilePos: position,
      },
      {
        id: candy.id,
        name: candy.file,
        object: await SceneLoader.ImportMeshAsync(
          candy.name,
          candy.path,
          candy.file,
          scene,
        ),
        mesh: "",
        ilePos: position,
      },
      {
        id: candy.id,
        name: candy.file,
        object: await SceneLoader.ImportMeshAsync(
          candy.name,
          candy.path,
          candy.file,
          scene,
        ),
        mesh: "",
        ilePos: position,
      })
      console.log(candiesInstances);
      candiesInstances[5].object.meshes[0].translate(new Vector3(1.62, 0, 0), 1, Space.WORLD);
      candiesInstances[4].object.meshes[0].translate(new Vector3(0.98, 0, 0), 1, Space.WORLD);
      candiesInstances[3].object.meshes[0].translate(new Vector3(0.35, 0, 0), 1, Space.WORLD);
      candiesInstances[2].object.meshes[0].translate(new Vector3(-0.29, 0, 0), 1, Space.WORLD);
      candiesInstances[1].object.meshes[0].translate(new Vector3(-0.91, 0, 0), 1, Space.WORLD);
      candiesInstances[0].object.meshes[0].translate(position, 1, Space.WORLD);
      animationHandler(candiesInstances);
    } catch (error) {
  }
})
  return candiesInstances
}

// const path = `static/models/${candy.name}.glb`;

// Function to draw text with a custom font on the dynamic texture
const drawTextWithCustomFont = (
  dynamicTexture: DynamicTexture,
  text: string,
  positionY: number,
  font: string,
  textureResolution: number,
  maxWidth: number
) => {
  const textureContext = dynamicTexture.getContext();
  const x = 400;
  const y = positionY;

  textureContext.save();
  textureContext.translate(x, textureResolution - y);
  textureContext.scale(1, -1);

  // Clear the specific area where the text will be drawn
  const textHeight = parseInt(font.split(' ')[1], 10);  // Extracting font size from the font string
  textureContext.clearRect(0, 0, maxWidth, textHeight);

  // Draw text
  dynamicTexture.drawText(text, 0, 0, font, "white", null, true, true);
  textureContext.restore();

  // Reset the transformation to draw other elements normally
  textureContext.setTransform(1, 0, 0, 1, 0, 0);
  dynamicTexture.update();
};

// Updated drawText function to include maxWidth parameter
const drawText = (
  dynamicTexture: DynamicTexture,
  text: string,
  positionY: number,
  font: string,
  textureResolution: number,
  maxWidth: number
) => {
  if (document.fonts) {
    document.fonts.load(`1em ${font.split(' ')[2]}`).then(() => {
      drawTextWithCustomFont(dynamicTexture, text, positionY, font, textureResolution, maxWidth);
    });
  } else {
    drawTextWithCustomFont(dynamicTexture, text, positionY, font, textureResolution, maxWidth);
  }
};

const initializeDynamicTexture = (newMeshes: AbstractMesh[], scene: Scene) => {
  const innerCover = newMeshes.find((mesh) => mesh.name === "Inner_Cover");
  let dynamicTexture: DynamicTexture | null = null;

  if (innerCover && innerCover.material) {
      const pbrMaterial = innerCover.material as PBRMaterial;

      // Create a dynamic texture
      const textureResolution = 1024;
      dynamicTexture = new DynamicTexture("dynamic texture", textureResolution, scene);
      const textureContext = dynamicTexture.getContext();

      pbrMaterial.albedoTexture = dynamicTexture;

      const img = new Image();
      img.src = './textures/Outer_Box_Texture.png';

      img.onload = () => {
          // Add image to dynamic texture
          textureContext.drawImage(img, 0, 0, textureResolution, textureResolution);
          dynamicTexture?.update();
      };
  } else {
      console.log("Inner_Cover mesh or material not found");
  }

  return dynamicTexture;
};

// Storing the current values of both text fields
let currentText = "";
let currentMsg = "";

// Function to update the text on the dynamic texture
function updateText(dynamicTexture: DynamicTexture | null, newText: string) {
  if (!dynamicTexture) return;
  currentText = newText; // Update the current text
  drawText(dynamicTexture, currentText, 600, "bold 88px Simplicity", 1024, 600);// Also redraw the message to ensure it isn't cleared
}

// Function to update the message on the dynamic texture
function updateMsg(dynamicTexture: DynamicTexture | null, newMsg: string) {
  if (!dynamicTexture) return;
  currentMsg = newMsg; // Update the current message
  drawText(dynamicTexture, currentMsg, 750, "italic 68px Simplicity", 1024, 600);
}

// The main boxController function
function boxController(
meshNames: string[],
meshPath: string,
meshFile: string,
scene: Scene
) {
  let dynamicTexture: DynamicTexture | null = null;

  SceneLoader.ImportMesh(
      meshNames,
      meshPath,
      meshFile,
      scene,
      (newMeshes, particleSystems, skeletons, animationGroups) => {
          dynamicTexture = initializeDynamicTexture(newMeshes, scene);

           // Log the names of the animation groups
          if (animationGroups && animationGroups.length > 0) {
            console.log('Animation Groups:');
            animationGroups.forEach((group) => console.log(group.name));
          } else {
            console.log('No animation groups found.');
          }

          const box = newMeshes[0];
          const startBox = animationGroups[0];

          // Start the animation groups
          box.translate(new Vector3(0, 0, 0), 1, Space.WORLD);
          startBox.play(false);
      }
  );
  return {
    updateText: (newText: string) => updateText(dynamicTexture, newText), // Expose the updateText method
    updateMsg: (newText: string) => updateMsg(dynamicTexture, newText) // Expose the updateMessage method
  };
}

export { boxController, candiesLoader, candiesPlay, resetAllAnimations };  export type { Candy };

