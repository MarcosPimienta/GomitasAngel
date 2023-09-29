import { Scene, DynamicTexture } from "@babylonjs/core";

function createTextTexture(scene: Scene, text: string) {
  const textureResolution = 512;

  // Create a dynamic texture
  const dynamicTexture = new DynamicTexture(
    "dynamic texture",
    textureResolution,
    scene,
    true
  );

  // Get the 2D drawing context of the dynamic texture
  const ctx = dynamicTexture.getContext();

  // Clear the context with a transparent color
  ctx.clearRect(0, 0, textureResolution, textureResolution);

  // Set the font properties
  ctx.font = "bold 44px Arial";
  ctx.fillStyle = "white";

  // Cast the context to the standard CanvasRenderingContext2D type to access textAlign and textBaseline properties
  const standardCtx = ctx as CanvasRenderingContext2D;
  standardCtx.textAlign = "center";
  standardCtx.textBaseline = "middle";

  // Draw the text at the center of the texture
  ctx.fillText(text, textureResolution / 2, textureResolution / 2);

  // Update the texture so the new drawing is visible
  dynamicTexture.update();

  return dynamicTexture;
};

export { createTextTexture };

