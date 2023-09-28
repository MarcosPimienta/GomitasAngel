import { Effect } from "@babylonjs/core/Materials/effect.js";
import { PBRMaterial } from "@babylonjs/core/Materials/PBR/pbrMaterial.js";
import { RegisterClass } from "@babylonjs/core/Misc/typeStore.js";
import { ShaderCodeInliner } from "@babylonjs/core/Engines/Processors/shaderCodeInliner.js";
export class ShaderAlebdoParts {
    constructor() { }
}
export class PBRCustomMaterial extends PBRMaterial {
    AttachAfterBind(mesh, effect) {
        if (this._newUniformInstances) {
            for (const el in this._newUniformInstances) {
                const ea = el.toString().split("-");
                if (ea[0] == "vec2") {
                    effect.setVector2(ea[1], this._newUniformInstances[el]);
                }
                else if (ea[0] == "vec3") {
                    effect.setVector3(ea[1], this._newUniformInstances[el]);
                }
                else if (ea[0] == "vec4") {
                    effect.setVector4(ea[1], this._newUniformInstances[el]);
                }
                else if (ea[0] == "mat4") {
                    effect.setMatrix(ea[1], this._newUniformInstances[el]);
                }
                else if (ea[0] == "float") {
                    effect.setFloat(ea[1], this._newUniformInstances[el]);
                }
            }
        }
        if (this._newSamplerInstances) {
            for (const el in this._newSamplerInstances) {
                const ea = el.toString().split("-");
                if (ea[0] == "sampler2D" && this._newSamplerInstances[el].isReady && this._newSamplerInstances[el].isReady()) {
                    effect.setTexture(ea[1], this._newSamplerInstances[el]);
                }
            }
        }
    }
    ReviewUniform(name, arr) {
        if (name == "uniform" && this._newUniforms) {
            for (let ind = 0; ind < this._newUniforms.length; ind++) {
                if (this._customUniform[ind].indexOf("sampler") == -1) {
                    arr.push(this._newUniforms[ind].replace(/\[\d*\]/g, ""));
                }
            }
        }
        if (name == "sampler" && this._newUniforms) {
            for (let ind = 0; ind < this._newUniforms.length; ind++) {
                if (this._customUniform[ind].indexOf("sampler") != -1) {
                    arr.push(this._newUniforms[ind].replace(/\[\d*\]/g, ""));
                }
            }
        }
        return arr;
    }
    Builder(shaderName, uniforms, uniformBuffers, samplers, defines, attributes, options) {
        if (options) {
            const currentProcessing = options.processFinalCode;
            options.processFinalCode = (type, code) => {
                if (type === "vertex") {
                    return currentProcessing ? currentProcessing(type, code) : code;
                }
                const sci = new ShaderCodeInliner(code);
                sci.inlineToken = "#define pbr_inline";
                sci.processCode();
                return currentProcessing ? currentProcessing(type, sci.code) : sci.code;
            };
        }
        if (attributes && this._customAttributes && this._customAttributes.length > 0) {
            attributes.push(...this._customAttributes);
        }
        this.ReviewUniform("uniform", uniforms);
        this.ReviewUniform("sampler", samplers);
        if (this._isCreatedShader) {
            return this._createdShaderName;
        }
        this._isCreatedShader = false;
        PBRCustomMaterial.ShaderIndexer++;
        const name = "custom_" + PBRCustomMaterial.ShaderIndexer;
        const fn_afterBind = this._afterBind.bind(this);
        this._afterBind = (m, e) => {
            if (!e) {
                return;
            }
            this.AttachAfterBind(m, e);
            try {
                fn_afterBind(m, e);
            }
            catch (e) { }
        };
        Effect.ShadersStore[name + "VertexShader"] = this.VertexShader.replace("#define CUSTOM_VERTEX_BEGIN", this.CustomParts.Vertex_Begin ? this.CustomParts.Vertex_Begin : "")
            .replace("#define CUSTOM_VERTEX_DEFINITIONS", (this._customUniform ? this._customUniform.join("\n") : "") + (this.CustomParts.Vertex_Definitions ? this.CustomParts.Vertex_Definitions : ""))
            .replace("#define CUSTOM_VERTEX_MAIN_BEGIN", this.CustomParts.Vertex_MainBegin ? this.CustomParts.Vertex_MainBegin : "")
            .replace("#define CUSTOM_VERTEX_UPDATE_POSITION", this.CustomParts.Vertex_Before_PositionUpdated ? this.CustomParts.Vertex_Before_PositionUpdated : "")
            .replace("#define CUSTOM_VERTEX_UPDATE_NORMAL", this.CustomParts.Vertex_Before_NormalUpdated ? this.CustomParts.Vertex_Before_NormalUpdated : "")
            .replace("#define CUSTOM_VERTEX_MAIN_END", this.CustomParts.Vertex_MainEnd ? this.CustomParts.Vertex_MainEnd : "");
        if (this.CustomParts.Vertex_After_WorldPosComputed) {
            Effect.ShadersStore[name + "VertexShader"] = Effect.ShadersStore[name + "VertexShader"].replace("#define CUSTOM_VERTEX_UPDATE_WORLDPOS", this.CustomParts.Vertex_After_WorldPosComputed);
        }
        Effect.ShadersStore[name + "PixelShader"] = this.FragmentShader.replace("#define CUSTOM_FRAGMENT_BEGIN", this.CustomParts.Fragment_Begin ? this.CustomParts.Fragment_Begin : "")
            .replace("#define CUSTOM_FRAGMENT_MAIN_BEGIN", this.CustomParts.Fragment_MainBegin ? this.CustomParts.Fragment_MainBegin : "")
            .replace("#define CUSTOM_FRAGMENT_DEFINITIONS", (this._customUniform ? this._customUniform.join("\n") : "") + (this.CustomParts.Fragment_Definitions ? this.CustomParts.Fragment_Definitions : ""))
            .replace("#define CUSTOM_FRAGMENT_UPDATE_ALBEDO", this.CustomParts.Fragment_Custom_Albedo ? this.CustomParts.Fragment_Custom_Albedo : "")
            .replace("#define CUSTOM_FRAGMENT_UPDATE_ALPHA", this.CustomParts.Fragment_Custom_Alpha ? this.CustomParts.Fragment_Custom_Alpha : "")
            .replace("#define CUSTOM_FRAGMENT_BEFORE_LIGHTS", this.CustomParts.Fragment_Before_Lights ? this.CustomParts.Fragment_Before_Lights : "")
            .replace("#define CUSTOM_FRAGMENT_UPDATE_METALLICROUGHNESS", this.CustomParts.Fragment_Custom_MetallicRoughness ? this.CustomParts.Fragment_Custom_MetallicRoughness : "")
            .replace("#define CUSTOM_FRAGMENT_UPDATE_MICROSURFACE", this.CustomParts.Fragment_Custom_MicroSurface ? this.CustomParts.Fragment_Custom_MicroSurface : "")
            .replace("#define CUSTOM_FRAGMENT_BEFORE_FINALCOLORCOMPOSITION", this.CustomParts.Fragment_Before_FinalColorComposition ? this.CustomParts.Fragment_Before_FinalColorComposition : "")
            .replace("#define CUSTOM_FRAGMENT_BEFORE_FRAGCOLOR", this.CustomParts.Fragment_Before_FragColor ? this.CustomParts.Fragment_Before_FragColor : "")
            .replace("#define CUSTOM_FRAGMENT_MAIN_END", this.CustomParts.Fragment_MainEnd ? this.CustomParts.Fragment_MainEnd : "");
        if (this.CustomParts.Fragment_Before_Fog) {
            Effect.ShadersStore[name + "PixelShader"] = Effect.ShadersStore[name + "PixelShader"].replace("#define CUSTOM_FRAGMENT_BEFORE_FOG", this.CustomParts.Fragment_Before_Fog);
        }
        this._isCreatedShader = true;
        this._createdShaderName = name;
        return name;
    }
    constructor(name, scene) {
        super(name, scene);
        this.CustomParts = new ShaderAlebdoParts();
        this.customShaderNameResolve = this.Builder;
        this.FragmentShader = Effect.ShadersStore["pbrPixelShader"];
        this.VertexShader = Effect.ShadersStore["pbrVertexShader"];
        this.FragmentShader = this.FragmentShader.replace(/#include<pbrBlockAlbedoOpacity>/g, Effect.IncludesShadersStore["pbrBlockAlbedoOpacity"]);
        this.FragmentShader = this.FragmentShader.replace(/#include<pbrBlockReflectivity>/g, Effect.IncludesShadersStore["pbrBlockReflectivity"]);
        this.FragmentShader = this.FragmentShader.replace(/#include<pbrBlockFinalColorComposition>/g, Effect.IncludesShadersStore["pbrBlockFinalColorComposition"]);
    }
    AddUniform(name, kind, param) {
        if (!this._customUniform) {
            this._customUniform = new Array();
            this._newUniforms = new Array();
            this._newSamplerInstances = {};
            this._newUniformInstances = {};
        }
        if (param) {
            if (kind.indexOf("sampler") != -1) {
                this._newSamplerInstances[kind + "-" + name] = param;
            }
            else {
                this._newUniformInstances[kind + "-" + name] = param;
            }
        }
        this._customUniform.push("uniform " + kind + " " + name + ";");
        this._newUniforms.push(name);
        return this;
    }
    AddAttribute(name) {
        if (!this._customAttributes) {
            this._customAttributes = [];
        }
        this._customAttributes.push(name);
        return this;
    }
    Fragment_Begin(shaderPart) {
        this.CustomParts.Fragment_Begin = shaderPart;
        return this;
    }
    Fragment_Definitions(shaderPart) {
        this.CustomParts.Fragment_Definitions = shaderPart;
        return this;
    }
    Fragment_MainBegin(shaderPart) {
        this.CustomParts.Fragment_MainBegin = shaderPart;
        return this;
    }
    Fragment_Custom_Albedo(shaderPart) {
        this.CustomParts.Fragment_Custom_Albedo = shaderPart.replace("result", "surfaceAlbedo");
        return this;
    }
    Fragment_Custom_Alpha(shaderPart) {
        this.CustomParts.Fragment_Custom_Alpha = shaderPart.replace("result", "alpha");
        return this;
    }
    Fragment_Before_Lights(shaderPart) {
        this.CustomParts.Fragment_Before_Lights = shaderPart;
        return this;
    }
    Fragment_Custom_MetallicRoughness(shaderPart) {
        this.CustomParts.Fragment_Custom_MetallicRoughness = shaderPart;
        return this;
    }
    Fragment_Custom_MicroSurface(shaderPart) {
        this.CustomParts.Fragment_Custom_MicroSurface = shaderPart;
        return this;
    }
    Fragment_Before_Fog(shaderPart) {
        this.CustomParts.Fragment_Before_Fog = shaderPart;
        return this;
    }
    Fragment_Before_FinalColorComposition(shaderPart) {
        this.CustomParts.Fragment_Before_FinalColorComposition = shaderPart;
        return this;
    }
    Fragment_Before_FragColor(shaderPart) {
        this.CustomParts.Fragment_Before_FragColor = shaderPart.replace("result", "color");
        return this;
    }
    Fragment_MainEnd(shaderPart) {
        this.CustomParts.Fragment_MainEnd = shaderPart;
        return this;
    }
    Vertex_Begin(shaderPart) {
        this.CustomParts.Vertex_Begin = shaderPart;
        return this;
    }
    Vertex_Definitions(shaderPart) {
        this.CustomParts.Vertex_Definitions = shaderPart;
        return this;
    }
    Vertex_MainBegin(shaderPart) {
        this.CustomParts.Vertex_MainBegin = shaderPart;
        return this;
    }
    Vertex_Before_PositionUpdated(shaderPart) {
        this.CustomParts.Vertex_Before_PositionUpdated = shaderPart.replace("result", "positionUpdated");
        return this;
    }
    Vertex_Before_NormalUpdated(shaderPart) {
        this.CustomParts.Vertex_Before_NormalUpdated = shaderPart.replace("result", "normalUpdated");
        return this;
    }
    Vertex_After_WorldPosComputed(shaderPart) {
        this.CustomParts.Vertex_After_WorldPosComputed = shaderPart;
        return this;
    }
    Vertex_MainEnd(shaderPart) {
        this.CustomParts.Vertex_MainEnd = shaderPart;
        return this;
    }
}
PBRCustomMaterial.ShaderIndexer = 1;
RegisterClass("BABYLON.PBRCustomMaterial", PBRCustomMaterial);
//# sourceMappingURL=pbrCustomMaterial.js.map