// Do not edit.
import { ShaderStore } from "@babylonjs/core/Engines/shaderStore.js";
import "@babylonjs/core/Shaders/ShadersInclude/bonesDeclaration.js";
import "@babylonjs/core/Shaders/ShadersInclude/bakedVertexAnimationDeclaration.js";
import "@babylonjs/core/Shaders/ShadersInclude/instancesDeclaration.js";
import "@babylonjs/core/Shaders/ShadersInclude/clipPlaneVertexDeclaration.js";
import "@babylonjs/core/Shaders/ShadersInclude/fogVertexDeclaration.js";
import "@babylonjs/core/Shaders/ShadersInclude/lightFragmentDeclaration.js";
import "@babylonjs/core/Shaders/ShadersInclude/lightUboDeclaration.js";
import "@babylonjs/core/Shaders/ShadersInclude/instancesVertex.js";
import "@babylonjs/core/Shaders/ShadersInclude/bonesVertex.js";
import "@babylonjs/core/Shaders/ShadersInclude/bakedVertexAnimation.js";
import "@babylonjs/core/Shaders/ShadersInclude/clipPlaneVertex.js";
import "@babylonjs/core/Shaders/ShadersInclude/fogVertex.js";
import "@babylonjs/core/Shaders/ShadersInclude/shadowsVertex.js";
import "@babylonjs/core/Shaders/ShadersInclude/vertexColorMixing.js";
const name = "triplanarVertexShader";
const shader = `precision highp float;attribute vec3 position;#ifdef NORMAL
attribute vec3 normal;#endif
#ifdef VERTEXCOLOR
attribute vec4 color;#endif
#include<bonesDeclaration>
#include<bakedVertexAnimationDeclaration>
#include<instancesDeclaration>
uniform mat4 view;uniform mat4 viewProjection;#ifdef DIFFUSEX
varying vec2 vTextureUVX;#endif
#ifdef DIFFUSEY
varying vec2 vTextureUVY;#endif
#ifdef DIFFUSEZ
varying vec2 vTextureUVZ;#endif
uniform float tileSize;#ifdef POINTSIZE
uniform float pointSize;#endif
varying vec3 vPositionW;#ifdef NORMAL
varying mat3 tangentSpace;#endif
#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
varying vec4 vColor;#endif
#include<clipPlaneVertexDeclaration>
#include<fogVertexDeclaration>
#include<__decl__lightFragment>[0..maxSimultaneousLights]
#define CUSTOM_VERTEX_DEFINITIONS
void main(void){#define CUSTOM_VERTEX_MAIN_BEGIN
#include<instancesVertex>
#include<bonesVertex>
#include<bakedVertexAnimation>
vec4 worldPos=finalWorld*vec4(position,1.0);gl_Position=viewProjection*worldPos;vPositionW=vec3(worldPos);#ifdef DIFFUSEX
vTextureUVX=worldPos.zy/tileSize;#endif
#ifdef DIFFUSEY
vTextureUVY=worldPos.xz/tileSize;#endif
#ifdef DIFFUSEZ
vTextureUVZ=worldPos.xy/tileSize;#endif
#ifdef NORMAL
vec3 xtan=vec3(0,0,1);vec3 xbin=vec3(0,1,0);vec3 ytan=vec3(1,0,0);vec3 ybin=vec3(0,0,1);vec3 ztan=vec3(1,0,0);vec3 zbin=vec3(0,1,0);vec3 normalizedNormal=normalize(normal);normalizedNormal*=normalizedNormal;vec3 worldBinormal=normalize(xbin*normalizedNormal.x+ybin*normalizedNormal.y+zbin*normalizedNormal.z);vec3 worldTangent=normalize(xtan*normalizedNormal.x+ytan*normalizedNormal.y+ztan*normalizedNormal.z);worldTangent=(world*vec4(worldTangent,0.0)).xyz;worldBinormal=(world*vec4(worldBinormal,0.0)).xyz;vec3 worldNormal=(world*vec4(normalize(normal),0.0)).xyz;tangentSpace[0]=worldTangent;tangentSpace[1]=worldBinormal;tangentSpace[2]=worldNormal;#endif
#include<clipPlaneVertex>
#include<fogVertex>
#include<shadowsVertex>[0..maxSimultaneousLights]
#include<vertexColorMixing>
#if defined(POINTSIZE) && !defined(WEBGPU)
gl_PointSize=pointSize;#endif
#define CUSTOM_VERTEX_MAIN_END
}`;
// Sideeffect
ShaderStore.ShadersStore[name] = shader;
/** @internal */
export const triplanarVertexShader = { name, shader };
//# sourceMappingURL=triplanar.vertex.js.map