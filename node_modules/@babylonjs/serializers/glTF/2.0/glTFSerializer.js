import { _Exporter } from "./glTFExporter.js";
/**
 * Class for generating glTF data from a Babylon scene.
 */
export class GLTF2Export {
    /**
     * Exports the geometry of the scene to .gltf file format asynchronously
     * @param scene Babylon scene with scene hierarchy information
     * @param filePrefix File prefix to use when generating the glTF file
     * @param options Exporter options
     * @returns Returns an object with a .gltf file and associates texture names
     * as keys and their data and paths as values
     */
    static GLTFAsync(scene, filePrefix, options) {
        return scene.whenReadyAsync().then(() => {
            const glTFPrefix = filePrefix.replace(/\.[^/.]+$/, "");
            const gltfGenerator = new _Exporter(scene, options);
            return gltfGenerator._generateGLTFAsync(glTFPrefix);
        });
    }
    static _PreExportAsync(scene, options) {
        return Promise.resolve().then(() => {
            if (options && options.exportWithoutWaitingForScene) {
                return Promise.resolve();
            }
            else {
                return scene.whenReadyAsync();
            }
        });
    }
    static _PostExportAsync(scene, glTFData, options) {
        return Promise.resolve().then(() => {
            if (options && options.exportWithoutWaitingForScene) {
                return glTFData;
            }
            else {
                return glTFData;
            }
        });
    }
    /**
     * Exports the geometry of the scene to .glb file format asychronously
     * @param scene Babylon scene with scene hierarchy information
     * @param filePrefix File prefix to use when generating glb file
     * @param options Exporter options
     * @returns Returns an object with a .glb filename as key and data as value
     */
    static GLBAsync(scene, filePrefix, options) {
        return this._PreExportAsync(scene, options).then(() => {
            const glTFPrefix = filePrefix.replace(/\.[^/.]+$/, "");
            const gltfGenerator = new _Exporter(scene, options);
            return gltfGenerator._generateGLBAsync(glTFPrefix).then((glTFData) => {
                return this._PostExportAsync(scene, glTFData, options);
            });
        });
    }
}
//# sourceMappingURL=glTFSerializer.js.map