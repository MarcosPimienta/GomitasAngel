import { Effect, ShaderMaterial, Vector3, MeshBuilder } from "@babylonjs/core";

// Vertex shader for basic vertex positions
const vertexShader = `precision highp float;
attribute vec3 position;
uniform mat4 worldViewProjection;
void main(void) {
    gl_Position = worldViewProjection * vec4(position, 1.0);
}`;

// Fragment shader for animated background
const fragmentShader = `precision highp float;
uniform float time; // A time value that updates each frame
void main(void) {
    // Simple color animation over time
    float red = sin(time) * 0.5 + 0.5;
    float green = sin(time + 2.0) * 0.5 + 0.5;
    float blue = sin(time + 4.0) * 0.5 + 0.5;
    gl_FragColor = vec4(red, green, blue, 1.0);
}`;

const createAnimatedBackground = (scene) => {
  // Create a shader material
  const shaderMaterial = new ShaderMaterial(
    "shaderMaterial",
    scene,
    {
      vertex: vertexShader,
      fragment: fragmentShader,
    },
    {
      attributes: ["position"],
      uniforms: ["worldViewProjection", "time"],
    }
  );

  // Create a full-screen plane for the background
  const backgroundPlane = MeshBuilder.CreatePlane("backgroundPlane", { size: 100, width: 100, height: 100 });
  backgroundPlane.material = shaderMaterial;
  backgroundPlane.position = new Vector3(0, 0, -10); // Move it back in the Z so it's behind other objects

  // Update the time uniform each frame
  let startTime = Date.now();
  scene.registerBeforeRender(() => {
    let currentTime = Date.now();
    shaderMaterial.setFloat("time", (currentTime - startTime) / 1000);
  });
};

// Call this function in your createScene function
export { createAnimatedBackground };