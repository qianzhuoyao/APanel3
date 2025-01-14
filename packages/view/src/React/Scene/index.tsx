import { ISceneProp } from "./type";
import { SceneContainer } from "./container";

/**
 * 场景
 * @param param0
 * @returns
 */
export const Scene = ({ style, className }: ISceneProp) => {
  return <SceneContainer style={style} className={className} />;
};
