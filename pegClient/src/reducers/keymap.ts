import axios from "axios";
import { Dispatch } from "redux";
import { RootState } from ".";
import {
  Action,
  KEYMAP_FROM_SELECTION,
  LayerRange,
  UPDATE_COMPILER,
  UPDATE_KEYBOARD,
  UPDATE_KEYLAYOUT,
} from "./types";
enum Compiler {
  QMK = "QMK",
}
export type Keymap = {
  version: number;
  notes: string;
  documentation: string;
  keyboard: string;
  keymap: string;
  layout: string;
  compiler: Compiler;
  author: string;
  keymapParts: any[];
};
const initialState: Keymap = {
  version: 0.1,
  notes: "",
  documentation:
    "this keymap was exported by boardsource peg right now qmk config is a one way street you can inport from qmk config but cant take it back out",
  keyboard: "",
  keymap: "",
  layout: "",
  author: "boardsource peg",
  compiler: Compiler.QMK,
  keymapParts: [],
};

export const replaceKey = (
  newKeyCode: string,
  layer: LayerRange,
  index: number
) => (dispatch: Dispatch, getState: () => RootState) => {
  const keyboardLayers = getState();
  console.log("replacekey", keyboardLayers);
};

export const selectKeyboard = () => (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  const state = getState();
  console.log({ ...state });
  const keyboard = state.keyboards.selectedKeyboard;
  const layout = state.keyboards.selectedLayoutName;
  const keymapParts = [""];
  dispatch({
    type: KEYMAP_FROM_SELECTION,
    payload: { keyboard, layout, keymapParts },
  });
};

export default (state: Keymap = initialState, action: Action): Keymap => {
  switch (action.type) {
    case UPDATE_COMPILER:
      return { ...state, compiler: action.payload };
    case UPDATE_KEYBOARD:
      return { ...state, keyboard: action.payload };
    case UPDATE_KEYLAYOUT:
      const layersPart = state.keymapParts.some(
        (part) => part.name === "layers"
      );
      if (layersPart) {
        const keymapPartsWithNewLayers = state.keymapParts.map((part) =>
          part.name === "layers" ? action.payload : part
        );
        return { ...state, keymapParts: keymapPartsWithNewLayers };
      } else {
        const keymapPartAddingLayers = [action.payload, ...state.keymapParts];
        return { ...state, keymapParts: keymapPartAddingLayers };
      }
    case KEYMAP_FROM_SELECTION:
      return {
        ...state,
        keyboard: action.payload.keyboard,
        layout: action.payload.layout,
        keymapParts: action.payload.keymapParts,
      };
    default:
      return state;
  }
};
