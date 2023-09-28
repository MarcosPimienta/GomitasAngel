import type { Matrix } from "@babylonjs/core/Maths/math.vector.js";
import { Vector3 } from "@babylonjs/core/Maths/math.vector.js";
import { Color3 } from "@babylonjs/core/Maths/math.color.js";
import type { BaseTexture } from "@babylonjs/core/Materials/Textures/baseTexture.js";
import { PushMaterial } from "@babylonjs/core/Materials/pushMaterial.js";
import type { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh.js";
import type { SubMesh } from "@babylonjs/core/Meshes/subMesh.js";
import type { Mesh } from "@babylonjs/core/Meshes/mesh.js";
import type { Scene } from "@babylonjs/core/scene.js";
import "./grid.fragment";
import "./grid.vertex";
/**
 * The grid materials allows you to wrap any shape with a grid.
 * Colors are customizable.
 */
export declare class GridMaterial extends PushMaterial {
    /**
     * Main color of the grid (e.g. between lines)
     */
    mainColor: Color3;
    /**
     * Color of the grid lines.
     */
    lineColor: Color3;
    /**
     * The scale of the grid compared to unit.
     */
    gridRatio: number;
    /**
     * Allows setting an offset for the grid lines.
     */
    gridOffset: Vector3;
    /**
     * The frequency of thicker lines.
     */
    majorUnitFrequency: number;
    /**
     * The visibility of minor units in the grid.
     */
    minorUnitVisibility: number;
    /**
     * The grid opacity outside of the lines.
     */
    opacity: number;
    /**
     * Determine RBG output is premultiplied by alpha value.
     */
    preMultiplyAlpha: boolean;
    /**
     * Determines if the max line value will be used instead of the sum wherever grid lines intersect.
     */
    useMaxLine: boolean;
    private _opacityTexture;
    opacityTexture: BaseTexture;
    private _gridControl;
    /**
     * constructor
     * @param name The name given to the material in order to identify it afterwards.
     * @param scene The scene the material is used in.
     */
    constructor(name: string, scene?: Scene);
    /**
     * Returns whether or not the grid requires alpha blending.
     */
    needAlphaBlending(): boolean;
    needAlphaBlendingForMesh(mesh: AbstractMesh): boolean;
    isReadyForSubMesh(mesh: AbstractMesh, subMesh: SubMesh, useInstances?: boolean): boolean;
    bindForSubMesh(world: Matrix, mesh: Mesh, subMesh: SubMesh): void;
    /**
     * Dispose the material and its associated resources.
     * @param forceDisposeEffect will also dispose the used effect when true
     */
    dispose(forceDisposeEffect?: boolean): void;
    clone(name: string): GridMaterial;
    serialize(): any;
    getClassName(): string;
    static Parse(source: any, scene: Scene, rootUrl: string): GridMaterial;
}
