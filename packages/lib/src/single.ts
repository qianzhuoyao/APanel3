export const createSingle = <C>(initializer: () => C): (() => C) => {
  let instance: C | null = null;
  return () => {
    if (instance === null) {
      instance = initializer();
    }
    return instance;
  };
};
