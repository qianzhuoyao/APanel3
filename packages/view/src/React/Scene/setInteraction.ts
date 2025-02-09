import Moveable from "moveable";
import { useEffect, useRef } from "react";
import Selecto from "selecto";
import { getRenderStore } from "../../Store";
import { BaseNode } from "@repo/model/NodeManager/type";

const hitRate = 0;
const selectByClick = true;
const selectFromInside = false;
const toggleContinueSelect = ["shift"];
const ratio = 0;
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
export const useInteraction = () => {
  const instanceRef = useRef<{
    targets: (HTMLElement | SVGElement)[];
    M: Moveable | null;
    S: Selecto | null;
  }>({
    targets: [],
    M: null,
    S: null,
  });

  const setSelected = (selected: HTMLElement[]) => {
    if (instanceRef.current.M) {
      instanceRef.current.M.target = selected;
    }
  };

  const destory = () => {
    instanceRef.current.M?.destroy();
    instanceRef.current.S?.destroy();
  };

  const setTargets = (targets: (HTMLElement | SVGElement)[]) => {
    if (instanceRef.current.M) {
      instanceRef.current.targets = targets;
      instanceRef.current.M.setState({
        target: targets,
      });
    }
  };

  const setContainer = (container: HTMLElement) => {
    instanceRef.current.M = new Moveable(container, {
      target: [],
      draggable: draggable,
      hideChildMoveableDefaultLines: hideChildMoveableDefaultLines,
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
    });
    instanceRef.current.S = new Selecto({
      container: container,
      selectableTargets: [".target"],
      hitRate: hitRate,
      selectByClick: selectByClick,
      selectFromInside: selectFromInside,
      toggleContinueSelect: toggleContinueSelect,
      ratio: ratio,
    });
    instanceRef.current.M.on("clickGroup", (e) => {
      instanceRef.current.S!.clickTarget(e.inputEvent, e.inputTarget);
    });
    instanceRef.current.M.on("render", (e) => {
      e.target.style.cssText += e.cssText;
    });
    instanceRef.current.S.on("dragStart", (e: any) => {
      const target = e.inputEvent.target;
      if (
        instanceRef.current.M!.isMoveableElement(target) ||
        instanceRef.current.targets!.some(
          (t) => t === target || t.contains(target)
        )
      ) {
        e.stop();
      }
    });
    instanceRef.current.S.on("select", (e) => {
      if (e.isDragStartEnd) {
        return;
      }
      setTargets(e.selected);
    });
    instanceRef.current.S.on("selectEnd", (e) => {
      console.log(e, "selectEndsss");
      if (e.isDragStartEnd) {
        e.inputEvent.preventDefault();
        instanceRef.current.M!.waitToChangeTarget().then(() => {
          instanceRef.current.M!.dragStart(e.inputEvent);
        });
      }
      setTargets(e.selected);
    });
    instanceRef.current.M.on("renderGroup", (e) => {
      e.events.forEach((ev) => {
        ev.target.style.cssText += ev.cssText;
      });
    });
    instanceRef.current.M.on("dragStart", () => {
      console.log("solsweweeee");
    });
  };

  return { setSelected, setContainer, destory };
};
