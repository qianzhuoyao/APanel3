import { IBlockConfig } from "./block.type";

const _UNDEFINED_CONFIG_TYPE = "_UNDEFINED_CONFIG_TYPE";

const updateConfig = () => {};

export const createBlockConfig: IBlockConfig = (params) => {
  if (params) {
    const { type, pack } = params;
    return {
      type,
      pack,
    };
  }
  return {
    type: _UNDEFINED_CONFIG_TYPE,
    pack: void 0,
  };
};
