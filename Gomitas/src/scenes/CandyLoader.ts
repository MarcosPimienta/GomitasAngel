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

/* function boxController(
  meshNames: string[],
  meshPath: string,
  meshFile: string,
  scene: Scene
) {
  // A variable to hold the dynamic texture so we can update it later
  let dynamicTexture:DynamicTexture;

  SceneLoader.ImportMesh(
    meshNames,
    meshPath,
    meshFile,
    scene,
    (newMeshes, particleSystems, skeletons, animationGroups) => {
      // Locate the Inner_Cover mesh
      const innerCover = newMeshes.find((mesh) => mesh.name === "Inner_Cover");
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
          dynamicTexture.update();
        };
      } else {
        console.log("Inner_Cover mesh or material not found");
      }

      const box = newMeshes[0];
      const startBox = animationGroups[0];

      // Start the animation groups
      box.translate(new Vector3(0, 0, 0), 1, Space.WORLD);
      startBox.play(false);
    }
  );

  let currentNameText = '';
  let currentMessageText = '';

  const updateText = (newText: string) => {
    currentNameText = newText;
    if (!dynamicTexture) return;

    const textureContext = dynamicTexture.getContext();
    const textureResolution = 1024;

    // Load the background image
    const img = new Image();
    img.src = './textures/Outer_Box_Texture.png';

    img.onload = () => {
      // Draw the background image onto the dynamic texture
      textureContext.drawImage(img, 0, 0, textureResolution, textureResolution);

      // Flip the canvas vertically
      textureContext.translate(0, textureResolution);
      textureContext.scale(1, -1);

      // Rotation
      const x = 400;
      const y = textureResolution - 400;
      const angleInRadians = Math.PI / 0;

      textureContext.translate(x, y);
      textureContext.rotate(-angleInRadians);
      textureContext.translate(-x, -y);

      // Ensure the custom font is loaded before drawing text with it
      const drawTextWithCustomFont = () => {
        const font = "bold 88px Simplicity";
        dynamicTexture.drawText(currentNameText, 350, 600, font, "white", null, true, true);

        // Reset the transformation to draw other elements normally
        textureContext.setTransform(1, 0, 0, 1, 0, 0);
        dynamicTexture.update();
      };

      if (document.fonts) {
        document.fonts.load('1em Simplicity').then(drawTextWithCustomFont);
      } else {
        drawTextWithCustomFont();
      }
    };
  };

  const updateMsg = (newText: string) => {
    currentMessageText = newText;
    if (!dynamicTexture) return;

    const textureContext = dynamicTexture.getContext();
    const textureResolution = 1024;

    // Load the background image
    const img = new Image();
    img.src = './textures/Outer_Box_Texture.png';

    img.onload = () => {
      // Draw the background image onto the dynamic texture
      textureContext.drawImage(img, 0, 0, textureResolution, textureResolution);

      // Flip the canvas vertically
      textureContext.translate(0, textureResolution);
      textureContext.scale(1, -1);

      // Rotation
      const x = 400;
      const y = textureResolution - 400;
      const angleInRadians = Math.PI / 0;

      textureContext.translate(x, y);
      textureContext.rotate(-angleInRadians);
      textureContext.translate(-x, -y);

      // Ensure the custom font is loaded before drawing text with it
      const drawTextWithCustomFont = () => {
        const font = "bold 88px Simplicity";
        dynamicTexture.drawText(currentMessageText, 350, 800, font, "white", null, true, true);

        // Reset the transformation to draw other elements normally
        textureContext.setTransform(1, 0, 0, 1, 0, 0);
        dynamicTexture.update();
      };

      if (document.fonts) {
        document.fonts.load('1em Simplicity').then(drawTextWithCustomFont);
      } else {
        drawTextWithCustomFont();
      }
    };
  };

  return {
    updateText,  // Expose the updateText method
    updateMsg  // Expose the updateMessage method
  };
} */

function boxController(
  meshNames: string[],
  meshPath: string,
  meshFile: string,
  scene: Scene
) {
  let dynamicTexture: DynamicTexture;
  let currentNameText = '';
  let currentMessageText = '';

  const textureResolution = 1024; // Added this line

  SceneLoader.ImportMesh(
    meshNames,
    meshPath,
    meshFile,
    scene,
    (newMeshes, particleSystems, skeletons, animationGroups) => {
      const innerCover = newMeshes.find((mesh) => mesh.name === "Inner_Cover");
      if (innerCover && innerCover.material) {
        const pbrMaterial = innerCover.material as PBRMaterial;
        dynamicTexture = new DynamicTexture("dynamic texture", textureResolution, scene);
        pbrMaterial.albedoTexture = dynamicTexture;

        const img = new Image();
        img.src = './textures/Outer_Box_Texture.png';

        img.onload = () => {
          dynamicTexture.getContext().drawImage(img, 0, 0, textureResolution, textureResolution);
          dynamicTexture.update();
        };
      } else {
        console.log("Inner_Cover mesh or material not found");
      }

      const box = newMeshes[0];
      const startBox = animationGroups[0];
      box.translate(new Vector3(0, 0, 0), 1, Space.WORLD);
      startBox.play(false);
    }
  );

  const redrawTexts = () => {
    if (!dynamicTexture) return;

    const textureContext = dynamicTexture.getContext();

    const img = new Image();
    img.src = './textures/Outer_Box_Texture.png';

    img.onload = () => {
      textureContext.drawImage(img, 0, 0, textureResolution, textureResolution);

      drawText(currentNameText, 600);
      drawText(currentMessageText, 800);
      dynamicTexture.update();
    };
  };

  const drawText = (text: string, positionY: number) => {
    if (!dynamicTexture) return;

    const textureContext = dynamicTexture.getContext();

    const x = 400;
    const y = positionY;

    const drawTextWithCustomFont = () => {
      const font = "bold 88px Simplicity";
      textureContext.save();
      textureContext.translate(x, textureResolution - y);
      textureContext.scale(1, -1);  // This line is added to flip the text
      dynamicTexture.drawText(text, 0, 0, font, "white", null, true, true);
      textureContext.restore();

      // Reset the transformation to draw other elements normally
      textureContext.setTransform(1, 0, 0, 1, 0, 0);
    };

    if (document.fonts) {
      document.fonts.load('1em Simplicity').then(drawTextWithCustomFont);
    } else {
      drawTextWithCustomFont();
    }
  };

  const updateText = (newText: string) => {
    currentNameText = newText;
    redrawTexts();
  };

  const updateMsg = (newText: string) => {
    currentMessageText = newText;
    redrawTexts();
  };

  return {
    updateText,
    updateMsg
  };
}

export { boxController, candiesLoader, candiesPlay, resetAllAnimations };  export type { Candy };

