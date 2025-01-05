import { ISceneProp } from "./type";
import { Provider } from "react-redux";
import { store } from "./sceneStore";
import { SceneContainer } from "./container";

/**
 * 场景
 */
export const Scene = ({ style }: ISceneProp) => {
  return (
    <Provider store={store}>
      <SceneContainer style={style} />
    </Provider>
  );
};
