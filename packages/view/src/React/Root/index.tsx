import { Provider } from "react-redux";
import { Scene } from "../Scene";
import { store } from "../Store/sceneStore";
import type { IRootProp } from "./type";
import { NodeMapTree } from "./nodeMapTree";
import { Setting } from "./setting";
import { Menu } from "./menu";
import { NextUIProvider } from "@nextui-org/react";
import { LEVEL } from "./level";
import { SetUp } from "./setUp";

/**
 * 根组件
 * @param param0
 * @returns
 *
 * @description
 * 1. 关于LEVEL 需要保证操作生效的地方是scene
 * 2. 关于场景的zIndex 需要保证场景的zIndex 是scene
 * 3. 关于操作图层的zIndex 需要保证操作图层的zIndex 是operator
 */

export const Root = ({ style, className }: IRootProp) => {
  return (
    <Provider store={store}>
      <NextUIProvider
        style={{
          ...style,
        }}
        className={className}
      >
        <Scene className="w-full h-full"></Scene>
        {/* 操作图层 */}
        <div className="absolute top-0 left-0 right-0 bottom-0">
          <div className="relative w-full h-full">
            <NodeMapTree level={LEVEL.operator.nodeMapTree} />
            <Setting level={LEVEL.operator.setting} />
            <Menu level={LEVEL.operator.menu} />
            <SetUp level={LEVEL.operator.setUp} />
          </div>
        </div>
      </NextUIProvider>
    </Provider>
  );
};
