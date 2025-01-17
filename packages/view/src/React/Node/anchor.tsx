import { useCallback, useMemo } from "react";
import { TopLeft } from "./anchorPointer/topLeft";
import { LeftCenter } from "./anchorPointer/leftCenter";
import { TopCenter } from "./anchorPointer/topCenter";
import { RightCenter } from "./anchorPointer/rightCenter";
import { BottomCenter } from "./anchorPointer/bottomCenter";
import { TopRight } from "./anchorPointer/topRight";
import { BottomLeft } from "./anchorPointer/bottomLeft";
import { BottomRight } from "./anchorPointer/bottomRight";
import { Rotate } from "./anchorPointer/rotate";
import { useSelector } from "react-redux";
import { INodeContent } from "../Scene/type";
import { IActionType } from "../Root/type";

export const Anchor = ({
  children,
  actionType,
  content,
  onResize,
  onRotate,
  onStartRotate,
  onMove,
  onUpdated,
}: {
  onStartRotate: (event: any) => void;
  children: React.ReactNode;
  actionType: IActionType;
  content: INodeContent;
  onMove: (position: { x: number; y: number }) => void;
  onUpdated: () => void;
  onRotate: (event: any) => void;
  onResize: (anchor: string[], event: any) => void;
}) => {
  const selectionNodeIdList = useSelector(
    (state: {
      scene: {
        selectionNodeIdList: string[];
      };
    }) => state.scene.selectionNodeIdList
  );

  const anchorShow = useMemo(() => {
    return !!(
      content?.id &&
      content?.type !== "SCENE" &&
      selectionNodeIdList.includes(content?.id)
    );
  }, [content?.type, content?.id, selectionNodeIdList]);

  const onUpdatedPosition = useCallback(() => {
    onUpdated();
  }, [onUpdated]);

  const onStartUpdateAngle = useCallback((event: any) => {
    console.log("startUpdateAngle", event);
    onStartRotate(event);
  }, []);

  const onUpdatePosition = useCallback(
    (
      anchor: string[],
      position: { x: number; y: number; dx: number; dy: number }
    ) => {
      onResize(anchor, position);
    },
    [onResize]
  );

  const onUpdateAngle = useCallback(
    (event: any) => {
      onRotate(event);
    },
    [onRotate]
  );

  return (
    <>
      <TopLeft
        updatedPosition={onUpdatedPosition}
        showAnchor={anchorShow}
        updatePosition={(event) => onUpdatePosition(["top", "left"], event)}
      />
      <LeftCenter
        updatedPosition={onUpdatedPosition}
        showAnchor={anchorShow}
        updatePosition={(event) => onUpdatePosition(["left"], event)}
      />
      <TopCenter
        updatedPosition={onUpdatedPosition}
        showAnchor={anchorShow}
        updatePosition={(event) => onUpdatePosition(["top"], event)}
      />
      <RightCenter
        updatedPosition={onUpdatedPosition}
        showAnchor={anchorShow}
        updatePosition={(event) => onUpdatePosition(["right"], event)}
      />
      <BottomCenter
        updatedPosition={onUpdatedPosition}
        showAnchor={anchorShow}
        updatePosition={(event) => onUpdatePosition(["bottom"], event)}
      />
      <TopRight
        updatedPosition={onUpdatedPosition}
        showAnchor={anchorShow}
        updatePosition={(event) => onUpdatePosition(["top", "right"], event)}
      />
      <BottomLeft
        updatedPosition={onUpdatedPosition}
        showAnchor={anchorShow}
        updatePosition={(event) => onUpdatePosition(["bottom", "left"], event)}
      />
      <BottomRight
        updatedPosition={onUpdatedPosition}
        showAnchor={anchorShow}
        updatePosition={(event) => onUpdatePosition(["bottom", "right"], event)}
      />
      <Rotate
        updatedAngle={onUpdatedPosition}
        startUpdateAngle={onStartUpdateAngle}
        showAnchor={anchorShow}
        updateAngle={(event) => onUpdateAngle(event)}
      />
      {children}
    </>
  );
};
