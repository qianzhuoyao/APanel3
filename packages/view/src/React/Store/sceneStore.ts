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
    selectionStart: null,
    selectionEnd: null,
    isLock: false,
    selectionNodeIdList: [] as string[],
    actionMode: ACTION_MODE.HAND as IActionMode, // 当前操作模式
    selectionEffectiveScope: 10, // selection有效范围
    actionType: ACTION_TYPE.DEFAULT as IActionType,
    currentPickNode: null, //当前所操作的节点，默认root
  },
  reducers: {
    setRoot: (state, action) => {
      state.root = action.payload;
    },
    setIsLock: (state, action: PayloadAction<boolean>) => {
      state.isLock = action.payload;
    },
    setCurrentPickNode: (state, action) => {
      state.currentPickNode = action.payload;
    },
    setSelectionEffectiveScope: (state, action: PayloadAction<number>) => {
      state.selectionEffectiveScope = action.payload;
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
   
    setSelectionStart: (state, action) => {
      state.selectionStart = action.payload;
    },
    setSelectionEnd: (state, action) => {
      state.selectionEnd = action.payload;
    },
    setActionType: (state, action: PayloadAction<IActionType>) => {
      state.actionType = action.payload;
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
  setIsLock,
  setSelectionNodeIdList,
  setCurrentPickNode,
  setSelectionEffectiveScope,
  setActionMode,
  setScale,
  setSelectionStart,
  setSelectionEnd,
  setActionType,
} = sceneSlice.actions;
