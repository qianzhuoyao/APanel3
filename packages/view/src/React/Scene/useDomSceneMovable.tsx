import { useEffect, useRef, useState } from "react";
import { getRenderStore } from "../../Store";
import Moveable, { OnScale } from "moveable";
import { useDefaultEvent } from "./useDefaultEvent";
import { BaseNode } from "@repo/model/NodeManager/type";

const hideChildMoveableDefaultLines = false;
const draggable = true;
const throttleDrag = 1;
const edgeDraggable = false;
const startDragRotate = 0;
const throttleDragRotate = 0;
const keepRatio = false;
const throttleScale = 0;
const renderDirections = ["nw", "n", "ne", "w", "e", "sw", "s", "se"];
const rotatable = true;
const throttleRotate = 0;
const rotationPosition = "top";
const originDraggable = true;
const originRelative = true;
export const useDomSceneMovable = () => {
  const [currentSelected, setCurrentSelected] = useState<BaseNode[]>([]);
  const { event } = useDefaultEvent();

  const movableRef = useRef<Moveable | null>(
    new Moveable(document.body, {
      target: [],
      container: document.body,
      hideChildMoveableDefaultLines: hideChildMoveableDefaultLines,
      draggable: draggable,
      zoom: 1,
      throttleDrag: throttleDrag,
      originDraggable: originDraggable,
      originRelative: originRelative,
      edgeDraggable: edgeDraggable,
      startDragRotate: startDragRotate,
      throttleDragRotate: throttleDragRotate,
      scalable: false,
      resizable: true,
      keepRatio: keepRatio,
      throttleScale: throttleScale,
      renderDirections: renderDirections,
      rotatable: rotatable,
      throttleRotate: throttleRotate,
      rotationPosition: rotationPosition,
    })
  );

  useEffect(() => {
    if (movableRef.current) {
      event(movableRef.current);
    }
  }, []);

  useEffect(() => {
    const { unSubscribe } = getRenderStore().store.subscribe(
      (state, model) => {
        if (model === "selected") {
          const targetDomList = state.selected
            .map((node) => document.getElementById(node.id))
            .filter((dom) => !!dom);
          console.log(state, model, "statsssses");
          setCurrentSelected(state.selected);
          movableRef.current?.setState({
            target: targetDomList,
          });
        }
      }
    );
    return () => {
      unSubscribe();
    };
  });
  return {
    currentSelected,
  };
};
