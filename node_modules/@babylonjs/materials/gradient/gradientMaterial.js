import { __decorate } from "@babylonjs/core/tslib.es6.js";
import { serialize, expandToProperty, serializeAsColor3, SerializationHelper } from "@babylonjs/core/Misc/decorators.js";
import { Color3 } from "@babylonjs/core/Maths/math.color.js";
import { MaterialDefines } from "@babylonjs/core/Materials/materialDefines.js";
import { MaterialHelper } from "@babylonjs/core/Materials/materialHelper.js";
import { PushMaterial } from "@babylonjs/core/Materials/pushMaterial.js";
import { VertexBuffer } from "@babylonjs/core/Buffers/buffer.js";
import { Scene } from "@babylonjs/core/scene.js";
import { RegisterClass } from "@babylonjs/core/Misc/typeStore.js";
import "./gradient.fragment.js";
import "./gradient.vertex.js";
import { EffectFallbacks } from "@babylonjs/core/Materials/effectFallbacks.js";
import { addClipPlaneUniforms, bindClipPlane } from "@babylonjs/core/Materials/clipPlaneMaterialHelper.js";
class GradientMaterialDefines extends MaterialDefines {
    constructor() {
        super();
        this.EMISSIVE = false;
        this.CLIPPLANE = false;
        this.CLIPPLANE2 = false;
        this.CLIPPLANE3 = false;
        this.CLIPPLANE4 = false;
        this.CLIPPLANE5 = false;
        this.CLIPPLANE6 = false;
        this.ALPHATEST = false;
        this.DEPTHPREPASS = false;
        this.POINTSIZE = false;
        this.FOG = false;
        this.NORMAL = false;
        this.UV1 = false;
        this.UV2 = false;
        this.VERTEXCOLOR = false;
        this.VERTEXALPHA = false;
        this.NUM_BONE_INFLUENCERS = 0;
        this.BonesPerMesh = 0;
        this.INSTANCES = false;
        this.INSTANCESCOLOR = false;
        this.IMAGEPROCESSINGPOSTPROCESS = false;
        this.SKIPFINALCOLORCLAMP = false;
        this.rebuild();
    }
}
export class GradientMaterial extends PushMaterial {
    constructor(name, scene) {
        super(name, scene);
        this._maxSimultaneousLights = 4;
        // The gradient top color, red by default
        this.topColor = new Color3(1, 0, 0);
        this.topColorAlpha = 1.0;
        // The gradient top color, blue by default
        this.bottomColor = new Color3(0, 0, 1);
        this.bottomColorAlpha = 1.0;
        // Gradient offset
        this.offset = 0;
        this.scale = 1.0;
        this.smoothness = 1.0;
        this._disableLighting = false;
    }
    needAlphaBlending() {
        return this.alpha < 1.0 || this.topColorAlpha < 1.0 || this.bottomColorAlpha < 1.0;
    }
    needAlphaTesting() {
        return true;
    }
    getAlphaTestTexture() {
        return null;
    }
    // Methods
    isReadyForSubMesh(mesh, subMesh, useInstances) {
        if (this.isFrozen) {
            if (subMesh.effect && subMesh.effect._wasPreviouslyReady && subMesh.effect._wasPreviouslyUsingInstances === useInstances) {
                return true;
            }
        }
        if (!subMesh.materialDefines) {
            subMesh.materialDefines = new GradientMaterialDefines();
        }
        const defines = subMesh.materialDefines;
        const scene = this.getScene();
        if (this._isReadyForSubMesh(subMesh)) {
            return true;
        }
        const engine = scene.getEngine();
        MaterialHelper.PrepareDefinesForFrameBoundValues(scene, engine, this, defines, useInstances ? true : false);
        MaterialHelper.PrepareDefinesForMisc(mesh, scene, false, this.pointsCloud, this.fogEnabled, this._shouldTurnAlphaTestOn(mesh), defines);
        defines._needNormals = MaterialHelper.PrepareDefinesForLights(scene, mesh, defines, false, this._maxSimultaneousLights, this._disableLighting);
        defines.EMISSIVE = this._disableLighting;
        // Attribs
        MaterialHelper.PrepareDefinesForAttributes(mesh, defines, false, true);
        // Get correct effect
        if (defines.isDirty) {
            defines.markAsProcessed();
            scene.resetCachedMaterial();
            // Fallbacks
            const fallbacks = new EffectFallbacks();
            if (defines.FOG) {
                fallbacks.addFallback(1, "FOG");
            }
            MaterialHelper.HandleFallbacksForShadows(defines, fallbacks);
            if (defines.NUM_BONE_INFLUENCERS > 0) {
                fallbacks.addCPUSkinningFallback(0, mesh);
            }
            defines.IMAGEPROCESSINGPOSTPROCESS = scene.imageProcessingConfiguration.applyByPostProcess;
            //Attributes
            const attribs = [VertexBuffer.PositionKind];
            if (defines.NORMAL) {
                attribs.push(VertexBuffer.NormalKind);
            }
            if (defines.UV1) {
                attribs.push(VertexBuffer.UVKind);
            }
            if (defines.UV2) {
                attribs.push(VertexBuffer.UV2Kind);
            }
            if (defines.VERTEXCOLOR) {
                attribs.push(VertexBuffer.ColorKind);
            }
            MaterialHelper.PrepareAttributesForBones(attribs, mesh, defines, fallbacks);
            MaterialHelper.PrepareAttributesForInstances(attribs, defines);
            // Legacy browser patch
            const shaderName = "gradient";
            const join = defines.toString();
            const uniforms = [
                "world",
                "view",
                "viewProjection",
                "vEyePosition",
                "vLightsType",
                "vFogInfos",
                "vFogColor",
                "pointSize",
                "mBones",
                "topColor",
                "bottomColor",
                "offset",
                "smoothness",
                "scale",
            ];
            addClipPlaneUniforms(uniforms);
            const samplers = [];
            const uniformBuffers = new Array();
            MaterialHelper.PrepareUniformsAndSamplersList({
                uniformsNames: uniforms,
                uniformBuffersNames: uniformBuffers,
                samplers: samplers,
                defines: defines,
                maxSimultaneousLights: 4,
            });
            subMesh.setEffect(scene.getEngine().createEffect(shaderName, {
                attributes: attribs,
                uniformsNames: uniforms,
                uniformBuffersNames: uniformBuffers,
                samplers: samplers,
                defines: join,
                fallbacks: fallbacks,
                onCompiled: this.onCompiled,
                onError: this.onError,
                indexParameters: { maxSimultaneousLights: 4 },
            }, engine), defines, this._materialContext);
        }
        if (!subMesh.effect || !subMesh.effect.isReady()) {
            return false;
        }
        defines._renderId = scene.getRenderId();
        subMesh.effect._wasPreviouslyReady = true;
        subMesh.effect._wasPreviouslyUsingInstances = !!useInstances;
        return true;
    }
    bindForSubMesh(world, mesh, subMesh) {
        const scene = this.getScene();
        const defines = subMesh.materialDefines;
        if (!defines) {
            return;
        }
        const effect = subMesh.effect;
        if (!effect) {
            return;
        }
        this._activeEffect = effect;
        // Matrices
        this.bindOnlyWorldMatrix(world);
        this._activeEffect.setMatrix("viewProjection", scene.getTransformMatrix());
        // Bones
        MaterialHelper.BindBonesParameters(mesh, effect);
        if (this._mustRebind(scene, effect)) {
            // Clip plane
            bindClipPlane(effect, this, scene);
            // Point size
            if (this.pointsCloud) {
                this._activeEffect.setFloat("pointSize", this.pointSize);
            }
            scene.bindEyePosition(effect);
        }
        if (scene.lightsEnabled && !this.disableLighting) {
            MaterialHelper.BindLights(scene, mesh, this._activeEffect, defines, this.maxSimultaneousLights);
        }
        // View
        if (scene.fogEnabled && mesh.applyFog && scene.fogMode !== Scene.FOGMODE_NONE) {
            this._activeEffect.setMatrix("view", scene.getViewMatrix());
        }
        // Fog
        MaterialHelper.BindFogParameters(scene, mesh, this._activeEffect);
        this._activeEffect.setColor4("topColor", this.topColor, this.topColorAlpha);
        this._activeEffect.setColor4("bottomColor", this.bottomColor, this.bottomColorAlpha);
        this._activeEffect.setFloat("offset", this.offset);
        this._activeEffect.setFloat("scale", this.scale);
        this._activeEffect.setFloat("smoothness", this.smoothness);
        this._afterBind(mesh, this._activeEffect);
    }
    getAnimatables() {
        return [];
    }
    dispose(forceDisposeEffect) {
        super.dispose(forceDisposeEffect);
    }
    clone(name) {
        return SerializationHelper.Clone(() => new GradientMaterial(name, this.getScene()), this);
    }
    serialize() {
        const serializationObject = super.serialize();
        serializationObject.customType = "BABYLON.GradientMaterial";
        return serializationObject;
    }
    getClassName() {
        return "GradientMaterial";
    }
    // Statics
    static Parse(source, scene, rootUrl) {
        return SerializationHelper.Parse(() => new GradientMaterial(source.name, scene), source, scene, rootUrl);
    }
}
__decorate([
    serialize("maxSimultaneousLights")
], GradientMaterial.prototype, "_maxSimultaneousLights", void 0);
__decorate([
    expandToProperty("_markAllSubMeshesAsLightsDirty")
], GradientMaterial.prototype, "maxSimultaneousLights", void 0);
__decorate([
    serializeAsColor3()
], GradientMaterial.prototype, "topColor", void 0);
__decorate([
    serialize()
], GradientMaterial.prototype, "topColorAlpha", void 0);
__decorate([
    serializeAsColor3()
], GradientMaterial.prototype, "bottomColor", void 0);
__decorate([
    serialize()
], GradientMaterial.prototype, "bottomColorAlpha", void 0);
__decorate([
    serialize()
], GradientMaterial.prototype, "offset", void 0);
__decorate([
    serialize()
], GradientMaterial.prototype, "scale", void 0);
__decorate([
    serialize()
], GradientMaterial.prototype, "smoothness", void 0);
__decorate([
    serialize("disableLighting")
], GradientMaterial.prototype, "_disableLighting", void 0);
__decorate([
    expandToProperty("_markAllSubMeshesAsLightsDirty")
], GradientMaterial.prototype, "disableLighting", void 0);
RegisterClass("BABYLON.GradientMaterial", GradientMaterial);
//# sourceMappingURL=gradientMaterial.js.map