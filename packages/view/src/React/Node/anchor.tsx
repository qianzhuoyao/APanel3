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
  onMove,
  onUpdated,
}: {
  children: React.ReactNode;
  actionType: IActionType;
  content: INodeContent;
  onMove: (position: { x: number; y: number }) => void;
  onUpdated: () => void;
  onResize: (
    anchor: string[],
    position: {
      x: number;
      y: number;
      dx: number;
      dy: number;
    }
  ) => void;
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

  const onUpdatePosition = useCallback(
    (
      anchor: string[],
      position: { x: number; y: number; dx: number; dy: number }
    ) => {
      onResize(anchor, position);
    },
    [onResize]
  );

  return (
    <>
      <TopLeft
        updatedPosition={onUpdatedPosition}
        showAnchor={anchorShow}
        updatePosition={(position) =>
          onUpdatePosition(["top", "left"], position)
        }
      />
      <LeftCenter
        updatedPosition={onUpdatedPosition}
        showAnchor={anchorShow}
        updatePosition={(position) => onUpdatePosition(["left"], position)}
      />
      <TopCenter
        updatedPosition={onUpdatedPosition}
        showAnchor={anchorShow}
        updatePosition={(position) => onUpdatePosition(["top"], position)}
      />
      <RightCenter
        updatedPosition={onUpdatedPosition}
        showAnchor={anchorShow}
        updatePosition={(position) => onUpdatePosition(["right"], position)}
      />
      <BottomCenter
        updatedPosition={onUpdatedPosition}
        showAnchor={anchorShow}
        updatePosition={(position) => onUpdatePosition(["bottom"], position)}
      />
      <TopRight
        updatedPosition={onUpdatedPosition}
        showAnchor={anchorShow}
        updatePosition={(position) =>
          onUpdatePosition(["top", "right"], position)
        }
      />
      <BottomLeft
        updatedPosition={onUpdatedPosition}
        showAnchor={anchorShow}
        updatePosition={(position) =>
          onUpdatePosition(["bottom", "left"], position)
        }
      />
      <BottomRight
        updatedPosition={onUpdatedPosition}
        showAnchor={anchorShow}
        updatePosition={(position) =>
          onUpdatePosition(["bottom", "right"], position)
        }
      />
      <Rotate
        updatedPosition={onUpdatedPosition}
        showAnchor={anchorShow}
        updatePosition={(position) => onUpdatePosition(["rotate"], position)}
      />
      {children}
    </>
  );
};
