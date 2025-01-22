import { RefCallback, useCallback, useEffect, useRef, useState } from "react";
import { Application, Rectangle } from "pixi.js";
import { initDevtools } from "@pixi/devtools";
import { useResizeObserver } from "../Hook/useResizeObserver";

export const useInit = () => {
  const { size, ref: setTargetRef } = useResizeObserver<HTMLDivElement>();

  const [loading, setLoading] = useState<boolean>(true);

  const appRef = useRef<{
    app: Application | null;
    containerDom: HTMLDivElement | null;
  }>({ app: null, containerDom: null });

  const setContainer: RefCallback<HTMLDivElement> = (containerDom) => {
    appRef.current.containerDom = containerDom;
    setTargetRef(containerDom);
  };

  /**
   * 销毁app
   */
  const destroy = useCallback(() => {
    if (appRef.current.app?.stage?.destroyed === false) {
      appRef.current.app?.destroy?.();
    }
  }, []);

  useEffect(() => {
    if (appRef.current.containerDom) {
      console.log(size, "size");
      /**
       * 获取容器宽高
       */
      const width = appRef.current.containerDom.getBoundingClientRect().width;
      const height = appRef.current.containerDom.getBoundingClientRect().height;

      /**
       * 销毁app
       */
      destroy();

      /**
       * 创建app
       */
      const app = new Application();
      /**
       * 设置loading为true
       */
      setLoading(true);
      /**
       * 初始化devtools
       */
      if (process.env.NODE_ENV === "development") {
        initDevtools(app);
      }

      /**
       * 初始化app
       */
      app
        .init({
          /**
           * 将app的canvas添加到容器中,按照容器resize
           */
          resizeTo: appRef.current.containerDom,
          resolution: window.devicePixelRatio || 1,
          autoDensity: true,
          antialias: true, // 抗锯齿
          backgroundColor: 0xffffff,
        })
        .then(() => {
          console.log({ width, height }, window.devicePixelRatio, "dwwdf");
          if (appRef.current.containerDom) {
            /**
             * 移除旧的canvas
             */
            appRef.current.app?.canvas.remove();

            /**
             * 添加新的canvas
             */
            appRef.current.containerDom.appendChild(app.canvas);

            /**
             * 设置interactive
             */
            app.stage.interactive = true;
            /**
             * 设置hitArea
             */
            app.stage.hitArea = new Rectangle(0, 0, width, height);

            /**
             * 更新app
             */
            appRef.current.app = app;
            /**
             * 设置loading为false
             */
            setLoading(false);
          }
        });
    }
    return () => {
      destroy();
    };
  }, [destroy]);

  useEffect(() => {
    if (appRef.current.app && appRef.current.app?.stage?.destroyed === false) {
      appRef.current.app.renderer.resize(size?.width || 0, size?.height || 0);
      appRef.current.app.stage.hitArea = new Rectangle(
        0,
        0,
        size?.width || 0,
        size?.height || 0
      );
    }
  }, [size]);
  return { setContainer, app: appRef.current.app, destroy, loading };
};
