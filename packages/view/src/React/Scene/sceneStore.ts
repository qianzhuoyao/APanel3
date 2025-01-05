import { createSlice } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

const sceneSlice = createSlice({
  name: "scene",
  initialState: {
    root: null,
    selectionStart: null,
    selectionEnd: null,
    isSelecting: false,
  },
  reducers: {
    setRoot: (state, action) => {
      state.root = action.payload;
    },
    setSelectionStart: (state, action) => {
      state.selectionStart = action.payload;
    },
    setSelectionEnd: (state, action) => {
      state.selectionEnd = action.payload;
    },
    setIsSelecting: (state, action) => {
      console.log(action.payload,'ads3d')
      state.isSelecting = action.payload;
    },
  },
});

export const store = configureStore({
  reducer: {
    scene: sceneSlice.reducer,
  },
});
export const { setRoot, setSelectionStart, setSelectionEnd, setIsSelecting } =
  sceneSlice.actions;
