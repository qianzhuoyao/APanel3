import { useEffect, useRef, useState } from "react";
import Selecto from "selecto";
import { getRenderStore } from "../../Store";
import { useSelector } from "react-redux";
import { IActionMode } from "../Root/type";
import { ACTION_MODE } from "../Root/actionConstant";
import { BaseNode } from "@repo/model/NodeManager/type";
export const useSelection = () => {
  const currentSelectedRef = useRef<{
    selectedList: BaseNode[];
  }>({
    selectedList: [],
  });
  const [isSelection, setIsSelection] = useState(false);
  const actionMode = useSelector(
    (state: { scene: { actionMode: IActionMode } }) => state.scene.actionMode
  );

  useEffect(() => {
    const { unSubscribe } = getRenderStore().store.subscribe((state, model) => {
      if (model === "selected") {
        console.log(state, "statess444");
        currentSelectedRef.current.selectedList = state.selected;
      }
    });
    return () => {
      unSubscribe();
    };
  }, []);

  useEffect(() => {
    if (actionMode === ACTION_MODE.SELECTION) {
      const targetDomList = getRenderStore()
        .nodeManager.getNodes()
        .map((node) => document.getElementById(node.id))
        .filter((dom) => !!dom);
      const selectionRef = new Selecto({
        container: document.body,
        rootContainer: null,
        selectableTargets: targetDomList,
        selectByClick: true,
        selectFromInside: true,
        continueSelect: false,
        toggleContinueSelect: "shift",
        keyContainer: window,
        hitRate: 100,
      });

      selectionRef?.on("select", (e) => {
        const selectedNodes = e.selected
          .map((ele) => getRenderStore().nodeManager.getNode(ele.id))
          .filter((node) => !!node);

        getRenderStore().store.commit("selected", "setSelected", selectedNodes);
      });

      selectionRef?.on("selectStart", () => {
        setIsSelection(true);
      });

      selectionRef?.on("selectEnd", () => {
        setIsSelection(false);
      });

      return () => {
        selectionRef.destroy();
      };
    }
  }, [actionMode]);
  return {
    isSelection,
  };
};
