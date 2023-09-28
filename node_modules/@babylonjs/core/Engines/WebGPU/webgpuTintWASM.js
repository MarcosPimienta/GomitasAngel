import { IsWindowObjectExist } from "../../Misc/domManagement.js";
import { Tools } from "../../Misc/tools.js";
/** @internal */
export class WebGPUTintWASM {
    async initTwgsl(twgslOptions) {
        if (WebGPUTintWASM._twgsl) {
            return;
        }
        twgslOptions = twgslOptions || {};
        twgslOptions = {
            ...WebGPUTintWASM._TWgslDefaultOptions,
            ...twgslOptions,
        };
        if (twgslOptions.twgsl) {
            WebGPUTintWASM._twgsl = twgslOptions.twgsl;
            return Promise.resolve();
        }
        if (twgslOptions.jsPath && twgslOptions.wasmPath) {
            if (IsWindowObjectExist()) {
                await Tools.LoadScriptAsync(twgslOptions.jsPath);
            }
            else {
                importScripts(twgslOptions.jsPath);
            }
        }
        if (self.twgsl) {
            WebGPUTintWASM._twgsl = await self.twgsl(twgslOptions.wasmPath);
            return Promise.resolve();
        }
        return Promise.reject("twgsl is not available.");
    }
    convertSpirV2WGSL(code, disableUniformityAnalysis = false) {
        const ccode = WebGPUTintWASM._twgsl.convertSpirV2WGSL(code);
        if (WebGPUTintWASM.ShowWGSLShaderCode) {
            console.log(ccode);
            console.log("***********************************************");
        }
        return WebGPUTintWASM.DisableUniformityAnalysis || disableUniformityAnalysis ? "diagnostic(off, derivative_uniformity);\n" + ccode : ccode;
    }
}
// Default twgsl options.
WebGPUTintWASM._TWgslDefaultOptions = {
    jsPath: "https://preview.babylonjs.com/twgsl/twgsl.js",
    wasmPath: "https://preview.babylonjs.com/twgsl/twgsl.wasm",
};
WebGPUTintWASM.ShowWGSLShaderCode = false;
WebGPUTintWASM.DisableUniformityAnalysis = false;
WebGPUTintWASM._twgsl = null;
//# sourceMappingURL=webgpuTintWASM.js.map