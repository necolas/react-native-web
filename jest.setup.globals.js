// Jest does not add the `jest` global when tests run as native ES modules
globalThis.jest = import.meta.jest;
