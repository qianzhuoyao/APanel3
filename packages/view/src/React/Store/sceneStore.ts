import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { ACTION_MODE } from "../Root/actionConstant";
import { IActionMode } from "../Root/type";

const sceneSlice = createSlice({
  name: "scene",
  initialState: {
    scale: 1,
    root: null,
    selectionStart: null,
    selectionEnd: null,
    isSelecting: false,
    isLock: false,
    selectionNodeIdList: [] as string[],
    actionMode: ACTION_MODE.HAND as IActionMode, // 当前操作模式
  },
  reducers: {
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
    setSelectionStart: (state, action) => {
      state.selectionStart = action.payload;
    },
    setSelectionEnd: (state, action) => {
      state.selectionEnd = action.payload;
    },
    setIsSelecting: (state, action) => {
      console.log(action.payload, "ads3d");
      state.isSelecting = action.payload;
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
  setActionMode,
  setScale,
  setSelectionStart,
  setSelectionEnd,
  setIsSelecting,
} = sceneSlice.actions;
