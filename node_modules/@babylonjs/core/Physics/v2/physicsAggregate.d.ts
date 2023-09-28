import { PhysicsBody } from "./physicsBody";
import type { PhysicsMaterial } from "./physicsMaterial";
import { PhysicsShape } from "./physicsShape";
import type { Scene } from "../../scene";
import type { TransformNode } from "../../Meshes/transformNode";
import { Vector3 } from "../../Maths/math.vector";
import { PhysicsShapeType } from "./IPhysicsEnginePlugin";
import type { Mesh } from "../../Meshes/mesh";
/**
 * The interface for the physics aggregate parameters
 */
export interface PhysicsAggregateParameters {
    /**
     * The mass of the physics aggregate
     */
    mass: number;
    /**
     * The friction of the physics aggregate
     */
    friction?: number;
    /**
     * The coefficient of restitution of the physics aggregate
     */
    restitution?: number;
    /**
     * The native options of the physics aggregate
     */
    nativeOptions?: any;
    /**
     * Specifies if the parent should be ignored
     */
    ignoreParent?: boolean;
    /**
     * Specifies if bi-directional transformations should be disabled
     */
    disableBidirectionalTransformation?: boolean;
    /**
     * The pressure inside the physics aggregate, soft object only
     */
    pressure?: number;
    /**
     * The stiffness the physics aggregate, soft object only
     */
    stiffness?: number;
    /**
     * The number of iterations used in maintaining consistent vertex velocities, soft object only
     */
    velocityIterations?: number;
    /**
     * The number of iterations used in maintaining consistent vertex positions, soft object only
     */
    positionIterations?: number;
    /**
     * The number used to fix points on a cloth (0, 1, 2, 4, 8) or rope (0, 1, 2) only
     * 0 None, 1, back left or top, 2, back right or bottom, 4, front left, 8, front right
     * Add to fix multiple points
     */
    fixedPoints?: number;
    /**
     * The collision margin around a soft object
     */
    margin?: number;
    /**
     * The collision margin around a soft object
     */
    damping?: number;
    /**
     * The path for a rope based on an extrusion
     */
    path?: any;
    /**
     * The shape of an extrusion used for a rope based on an extrusion
     */
    shape?: any;
    /**
     * Radius for sphere, cylinder and capsule
     */
    radius?: number;
    /**
     * Starting point for cylinder/capsule
     */
    pointA?: Vector3;
    /**
     * Ending point for cylinder/capsule
     */
    pointB?: Vector3;
    /**
     * Extents for box
     */
    extents?: Vector3;
    /**
     * mesh local center
     */
    center?: Vector3;
    /**
     * mesh object. Used for mesh and convex hull aggregates.
     */
    mesh?: Mesh;
    startAsleep?: boolean;
}
/**
 * Helper class to create and interact with a PhysicsAggregate.
 * This is a transition object that works like Physics Plugin V1 Impostors.
 * This helper instanciate all mandatory physics objects to get a body/shape and material.
 * It's less efficient that handling body and shapes independently but for prototyping or
 * a small numbers of physics objects, it's good enough.
 */
export declare class PhysicsAggregate {
    /**
     * The physics-enabled object used as the physics aggregate
     */
    transformNode: TransformNode;
    /**
     * The type of the physics aggregate
     */
    type: PhysicsShapeType | PhysicsShape;
    private _options;
    private _scene?;
    /**
     * The body that is associated with this aggregate
     */
    body: PhysicsBody;
    /**
     * The shape that is associated with this aggregate
     */
    shape: PhysicsShape;
    /**
     * The material that is associated with this aggregate
     */
    material: PhysicsMaterial;
    private _disposeShapeWhenDisposed;
    private _nodeDisposeObserver;
    constructor(
    /**
     * The physics-enabled object used as the physics aggregate
     */
    transformNode: TransformNode, 
    /**
     * The type of the physics aggregate
     */
    type: PhysicsShapeType | PhysicsShape, _options?: PhysicsAggregateParameters, _scene?: Scene | undefined);
    private _getObjectBoundingBox;
    private _addSizeOptions;
    /**
     * Releases the body, shape and material
     */
    dispose(): void;
}
