import { useSelector } from "react-redux";
import { useSetDomScene } from "./useSetDomScene";
import { IActionMode } from "../Root/type";

export const DomScene = () => {
  const actionMode = useSelector(
    (state: { scene: { actionMode: IActionMode } }) => state.scene.actionMode
  );
  const { setRef } = useSetDomScene(actionMode);
  return <div ref={setRef} className="w-full h-full overflow-hidden"></div>;
};
