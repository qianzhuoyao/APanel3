import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { ACTION_MODE, ACTION_TYPE } from "../Root/actionConstant";
import { IActionMode, IActionType } from "../Root/type";
import { INodeContent } from "../Scene/type";

const sceneSlice = createSlice({
  name: "scene",
  initialState: {
    scale: 1,
    root: null,
    allNodes: [] as INodeContent[],
    isLock: false,
    selectionNodeIdList: [] as string[],
    actionMode: ACTION_MODE.HAND as IActionMode, // 当前操作模式
  },
  reducers: {
    setAllNodes: (state, action: PayloadAction<INodeContent[]>) => {
      state.allNodes = action.payload;
    },
    setRoot: (state, action) => {
      state.root = action.payload;
    },
    setIsLock: (state, action: PayloadAction<boolean>) => {
      state.isLock = action.payload;
    },

    setSelectionNodeIdList: (state, action: PayloadAction<string[]>) => {
      state.selectionNodeIdList = action.payload;
    },
    setScale: (state, action: PayloadAction<number>) => {
      state.scale = action.payload;
    },
    setActionMode: (state, action: PayloadAction<IActionMode>) => {
      state.actionMode = action.payload;
    },
  },
});

export const store = configureStore({
  reducer: {
    scene: sceneSlice.reducer,
  },
});
export const {
  setRoot,
  setAllNodes,
  setIsLock,
  setSelectionNodeIdList,
  setActionMode,
  setScale,
} = sceneSlice.actions;
