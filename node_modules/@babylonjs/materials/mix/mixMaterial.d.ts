import type { Nullable } from "@babylonjs/core/types.js";
import type { Matrix } from "@babylonjs/core/Maths/math.vector.js";
import { Color3 } from "@babylonjs/core/Maths/math.color.js";
import type { IAnimatable } from "@babylonjs/core/Animations/animatable.interface.js";
import type { BaseTexture } from "@babylonjs/core/Materials/Textures/baseTexture.js";
import type { Texture } from "@babylonjs/core/Materials/Textures/texture.js";
import { PushMaterial } from "@babylonjs/core/Materials/pushMaterial.js";
import type { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh.js";
import type { SubMesh } from "@babylonjs/core/Meshes/subMesh.js";
import type { Mesh } from "@babylonjs/core/Meshes/mesh.js";
import { Scene } from "@babylonjs/core/scene.js";
import "./mix.fragment";
import "./mix.vertex";
export declare class MixMaterial extends PushMaterial {
    /**
     * Mix textures
     */
    private _mixTexture1;
    mixTexture1: BaseTexture;
    private _mixTexture2;
    mixTexture2: BaseTexture;
    /**
     * Diffuse textures
     */
    private _diffuseTexture1;
    diffuseTexture1: Texture;
    private _diffuseTexture2;
    diffuseTexture2: Texture;
    private _diffuseTexture3;
    diffuseTexture3: Texture;
    private _diffuseTexture4;
    diffuseTexture4: Texture;
    private _diffuseTexture5;
    diffuseTexture5: Texture;
    private _diffuseTexture6;
    diffuseTexture6: Texture;
    private _diffuseTexture7;
    diffuseTexture7: Texture;
    private _diffuseTexture8;
    diffuseTexture8: Texture;
    /**
     * Uniforms
     */
    diffuseColor: Color3;
    specularColor: Color3;
    specularPower: number;
    private _disableLighting;
    disableLighting: boolean;
    private _maxSimultaneousLights;
    maxSimultaneousLights: number;
    constructor(name: string, scene?: Scene);
    needAlphaBlending(): boolean;
    needAlphaTesting(): boolean;
    getAlphaTestTexture(): Nullable<BaseTexture>;
    isReadyForSubMesh(mesh: AbstractMesh, subMesh: SubMesh, useInstances?: boolean): boolean;
    bindForSubMesh(world: Matrix, mesh: Mesh, subMesh: SubMesh): void;
    getAnimatables(): IAnimatable[];
    getActiveTextures(): BaseTexture[];
    hasTexture(texture: BaseTexture): boolean;
    dispose(forceDisposeEffect?: boolean): void;
    clone(name: string): MixMaterial;
    serialize(): any;
    getClassName(): string;
    static Parse(source: any, scene: Scene, rootUrl: string): MixMaterial;
}
