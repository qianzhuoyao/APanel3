import { createSingle, Uuid, Immutable } from "@repo/lib";
import {
  IBlockConfig,
  IBlockConfigParams,
  IBlockConfigResult,
} from "./block.type";

const _UNDEFINED_CONFIG_TYPE = "_UNDEFINED_CONFIG_TYPE";

const _Config = createSingle(() => {
  const config = Immutable.Map<string, IBlockConfigResult>();
  return {
    config,
  };
});

export const updateConfig = (configId: string, params: IBlockConfigParams) => {
  _Config().config = _Config().config.set(configId, params);
};

export const createBlockConfig: IBlockConfig = (params) => {
  const configId = Uuid.v4();
  _Config().config = _Config().config.set(
    configId,
    !params
      ? {
          type: _UNDEFINED_CONFIG_TYPE,
          pack: void 0,
        }
      : {
          type: params.type,
          pack: params.pack,
        }
  );
  return configId;
};
