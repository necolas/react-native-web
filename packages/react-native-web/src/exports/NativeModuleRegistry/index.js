/**
 * The registry will be exported from React Native for Web to allow library users to
 * register nativeModules which are then available out NativeModules namespace in React Native
 * This needs to be called before the Native Module has been accessed. We can minimise the registration to
 * initial setup time to save polluting the namespace all too frequently
 * but if we don't, we can support dynamic registration of native modules, which goes in line with the new
 * JSI/Fabric/Turbo Modules architecture decisions
 */
class NativeModulesRegistry {
  constructor() {
    this.nativeModules = {};
  }

  /**
   *
   * @param {Array} nativeModulesToRegister
   * this function takes in modules as an array and defines it under the name(which is accessible using getName method of the module)
   * in the this.nativeModules map. this map is then exposed for the NativeModule exports to use and export
   * This assumes that the module passed to register will have a getName() method, which means that we will be sending array of
   * instances of modules and not just the class
   */
  registerNativeModules(nativeModulesToRegister) {
    nativeModulesToRegister.map((module) => {
      const nativeModuleName = module.getName();
      if (!this.nativeModules[nativeModuleName]) {
        throw new Error(`Native Module with name ${nativeModuleName} is duplicated`);
      }
      Object.defineProperty(this.nativeModules, nativeModuleName, {
        get: () => {
          return module;
        },
      });
    });
  }
}

export const nativeModulesRegistry = new NativeModulesRegistry();
export default nativeModulesRegistry.registerNativeModules.bind(nativeModulesRegistry);
