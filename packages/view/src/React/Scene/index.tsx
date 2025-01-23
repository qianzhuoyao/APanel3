import { IStageProp } from "./type";
import { createNode } from "@repo/model/NodeModel";
import { useEffect } from "react";
import { LEVEL } from "../Root/level";
import { translateRoot } from "./translate";
import { setRoot } from "../Store/sceneStore";
import { useDispatch, useSelector } from "react-redux";
/**
 * 场景
 * @param param0
 * @returns
 */

import { useInit } from "./useInit";
import { Spinner } from "@nextui-org/react";
import { useDraw } from "./useDraw";
import { IActionMode } from "../Root/type";
import { useRoot } from "./useRoot";
import { ContextMenu } from "./contextMenu";

export const Scene = () => {
  /**
   * 获取actionMode
   */
  const actionMode = useSelector(
    (state: { scene: { actionMode: IActionMode } }) => state.scene.actionMode
  );

  const root = useRoot();

  /**
   * 初始化场景
   */
  const { setContainer, loading, app } = useInit();
  /**
   * 创建
   */
  useDraw({ app, actionMode, root });

  return (
    <div ref={setContainer} className="w-full h-full overflow-hidden">
      {loading ? (
        <div className="w-full h-full flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      ) : null}
      <ContextMenu options={[{ item: () => <div>123</div> }]}></ContextMenu>
    </div>
  );
};
