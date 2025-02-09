import { Provider } from "react-redux";
import { Scene } from "../Scene";
import { store } from "../Store/sceneStore";
import type { IRootProp } from "./type";
import { NodeMapTree } from "./nodeMapTree";
import { Setting } from "./setting";
import { Menu } from "./menu";
import {
  Button,
  Form,
  Input,
  Listbox,
  ListboxItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  NextUIProvider,
  useDisclosure,
} from "@nextui-org/react";
import { LEVEL } from "./level";
import { SetUp } from "./setUp";
import cn from "clsx";
import { DomScene } from "../Scene/domScene";
import { ReactNode, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useWindowSize } from "react-use";
import { getRenderStore } from "../../Store";
import { CanvasNode } from "@repo/model/NodeManager/type";
import { getCanvasId } from "./RootConstant";
import { ContextMenu } from "../Scene/contextMenu";

const Create = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
    >
      <path
        fill="#1b1b1f"
        d="M20 6h-8l-2-2H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2m0 12H4V6h5.17l2 2H20zm-8-4h2v2h2v-2h2v-2h-2v-2h-2v2h-2z"
      />
    </svg>
  );
};

const OpenFileIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
    >
      <path
        fill="#1b1b1f"
        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zm4 18H6V4h7v5h5z"
      />
    </svg>
  );
};

const ListboxWrapper = ({ children }: { children: ReactNode }) => (
  <div className="w-full max-w-[260px]  px-1 py-2 rounded-small">
    {children}
  </div>
);

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
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { width, height } = useWindowSize();
  const sizeRef = useRef({
    width,
    height,
  });

  const [sceneStatus, setSceneStatus] = useState<
    "open" | "create" | null | "finish"
  >(null);

  if (sceneStatus === null) {
    return (
      <div className="w-full h-full overflow-hidden flex items-center justify-center">
        <ListboxWrapper>
          <Listbox aria-label="Listbox menu with descriptions" variant="flat">
            <ListboxItem
              key="new"
              description="使用已存在的项目"
              startContent={<OpenFileIcon />}
            >
              打开
            </ListboxItem>

            <ListboxItem
              key="copy"
              description="新建一个项目"
              startContent={<Create />}
              onPress={() => {
                onOpen();
              }}
            >
              新建
            </ListboxItem>
          </Listbox>
        </ListboxWrapper>
        <>
          <Modal
            backdrop="opaque"
            radius="sm"
            isOpen={isOpen}
            motionProps={{
              variants: {
                enter: {
                  y: 0,
                  opacity: 1,
                  transition: {
                    duration: 0.3,
                    ease: "easeOut",
                  },
                },
                exit: {
                  y: -20,
                  opacity: 0,
                  transition: {
                    duration: 0.2,
                    ease: "easeIn",
                  },
                },
              },
            }}
            onOpenChange={onOpenChange}
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    新建画布
                  </ModalHeader>
                  <ModalBody>
                    <Form
                      className="w-full flex flex-col gap-1"
                      validationBehavior="native"
                      onSubmit={(e) => {
                        e.preventDefault();
                        onClose();
                        const canvas: CanvasNode = {
                          id: getCanvasId(),
                          type: "canvas",
                          position: { x: 0, y: 0 },
                          zIndex: 1,
                          size: sizeRef.current,
                          backgroundColor: "#FFFFFF",
                        };
                        getRenderStore().nodeManager.addNode(canvas);
                        setSceneStatus("finish");
                      }}
                    >
                      <Input
                        radius="sm"
                        isRequired
                        errorMessage="必填"
                        label={`画布尺寸(长:当前窗口${width})`}
                        labelPlacement="outside"
                        name="width"
                        placeholder="输入数字"
                        type="number"
                        defaultValue={width.toString()}
                        onChange={(e) => {
                          sizeRef.current.width = Number(e.target.value);
                        }}
                      />

                      <Input
                        radius="sm"
                        isRequired
                        errorMessage="必填"
                        label={`画布尺寸(宽:当前窗口${height})`}
                        labelPlacement="outside"
                        name="height"
                        placeholder="输入数字"
                        type="number"
                        defaultValue={height.toString()}
                        onChange={(e) => {
                          sizeRef.current.height = Number(e.target.value);
                        }}
                      />
                      <div className="flex w-full justify-end">
                        <Button
                          color="primary"
                          type="submit"
                          radius="sm"
                          className="mt-1"
                        >
                          确认
                        </Button>
                      </div>
                    </Form>
                  </ModalBody>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      </div>
    );
  }

  if (sceneStatus === "finish") {
    return (
      <Provider store={store}>
        <NextUIProvider
          style={{
            ...style,
          }}
          className={cn(className, "relative")}
        >
          {/* 操作图层 */}
          <div className="absolute top-0 left-0 right-0 bottom-0">
            <div className="relative w-full h-full">
              <NodeMapTree level={LEVEL.operator.nodeMapTree} />
              <Setting level={LEVEL.operator.setting} />
              <Menu level={LEVEL.operator.menu} />
              <SetUp level={LEVEL.operator.setUp} />
            </div>
          </div>
          <div
            data-role="scene-stage-container"
            className="absolute top-0 left-0 right-0 bottom-0 w-full h-full"
          >
            {/* <Scene></Scene> */}
            <DomScene></DomScene>
          </div>
          <ContextMenu options={[{ item: () => <div>123</div> }]}></ContextMenu>
        </NextUIProvider>
      </Provider>
    );
  }
};
