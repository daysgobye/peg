import axios from "axios";
import { Dispatch } from "redux";
import { RootState } from ".";
import { Keycode } from "../keycodes";
import {
  Action,
  ADD_SINGLE_SCREEN,
  DISABLE_SCREENS,
  ENABLE_SCREENS,
  IMPORT_JSON,
  keymapPartsName,
  KEYMAP_FROM_SELECTION,
  LayerRange,
  REMOVE_SINGLE_SCREEN,
  screen,
  UPDATE_COMPILER,
  UPDATE_KEYBOARD,
  UPDATE_KEYLAYOUT,
  UPDATE_SCREENS,
} from "./types";
import { saveAs } from "file-saver";
import { getKeyboardLayout } from "./keyboards";
const keycode = Keycode.getInstance();
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
  tool: string;
};
const initialState: Keymap = {
  tool: "peg",
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

export const exportJson = () => (_: any, getState: () => RootState) => {
  const keymap = getState().keymap;
  if (keymap.keyboard !== "") {
    const keymapBlob = new Blob([JSON.stringify(keymap)], {
      type: "application/json",
    });
    saveAs(keymapBlob, `peg_${keymap.keyboard.replace("/", "_")}.json`);
  }
};

export const importJson = (file: any) => async (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  const fileReader = new FileReader();
  fileReader.onload = async () => {
    if (fileReader.result) {
      const importedKeymapData = JSON.parse(fileReader.result.toString());
      if (importedKeymapData.tool && importedKeymapData.tool === "peg") {
        await getKeyboardLayout(importedKeymapData.keyboard)(
          dispatch,
          getState
        );
        dispatch({ type: IMPORT_JSON, payload: { ...importedKeymapData } });
      } else {
        const newPegMap = {
          tool: "peg",
          version: 0.1,
          notes: "",
          documentation:
            "this keymap was exported by boardsource peg after being imported from QMK Configurator right now this is a one way street you can inport from qmk config but cant take it back out",
          keyboard: importedKeymapData.keyboard,
          keymap: "",
          layout: importedKeymapData.layout,
          author: "boardsource peg/QMK Configurator",
          compiler: Compiler.QMK,
          keymapParts: [
            { name: keymapPartsName.LAYERS, data: importedKeymapData.layers },
          ],
        };
        dispatch({ type: IMPORT_JSON, payload: newPegMap });
        await getKeyboardLayout(importedKeymapData.keyboard)(
          dispatch,
          getState
        );
        selectKeyboard(importedKeymapData.layers)(dispatch, getState);
      }
    }
  };
  fileReader.readAsText(file);
};
export const enableScreens = () => (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  console.log("enabling screen");
  const blankScreen = { type: "text", value: "Made /nOn /nPeg /n" };
  dispatch({
    type: ENABLE_SCREENS,
    payload: {
      name: keymapPartsName.SCREENS,
      data: [
        {
          size: { x: 128, y: 32 },
          flip: true,
          layers: [...new Array(6).fill(0).map(() => blankScreen)],
        },
      ],
    },
  });
};
export const disableScreens = () => (dispatch: Dispatch) => {
  dispatch({ type: DISABLE_SCREENS });
};
export const updateScreen = (screen: screen, index: 0 | 1) => (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  const copyOfScreens = {
    ...getState().keymap.keymapParts.find(
      (part) => part.name === keymapPartsName.SCREENS
    ),
  };
  copyOfScreens.data[index] = screen;
  dispatch({ type: UPDATE_SCREENS, payload: copyOfScreens });
};
export const addScreen = () => (dispatch: Dispatch) => {
  const blankScreen = { type: "text", value: "Made /nOn /nPeg /n" };
  dispatch({
    type: ADD_SINGLE_SCREEN,
    payload: {
      size: { x: 128, y: 32 },
      flip: true,
      layers: [...new Array(6).fill(0).map(() => blankScreen)],
    },
  });
};
export const removeScreen = () => (dispatch: Dispatch) => {
  dispatch({ type: REMOVE_SINGLE_SCREEN });
};
export const replaceKey = (
  newKeyCode: string,
  layer: LayerRange,
  index: number
) => (dispatch: Dispatch, getState: () => RootState) => {
  const keyboardLayers = getState().keymap.keymapParts.find(
    (part) => part.name === keymapPartsName.LAYERS
  );
  if (keyboardLayers) {
    let copyofLayers = [...keyboardLayers.data];
    copyofLayers[layer][index] = newKeyCode;
    const newKeymapPart = { ...keyboardLayers, data: copyofLayers };
    dispatch({ type: UPDATE_KEYLAYOUT, payload: newKeymapPart });
  }
};

export const selectKeyboard = (layerData?: any) => (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  const state = getState();
  const blankLayer = new Array(state.keyboards.selectedLayoutData.length).fill(
    keycode.basic.KC_TRNS.code
  );
  let keymapParts = [
    {
      name: keymapPartsName.LAYERS,
      data: [...new Array(6).fill(0).map(() => [...blankLayer])],
    },
  ];

  if (layerData) {
    let cleanedLayers = layerData.map((layer: string[]) =>
      layer.map((code) => keycode.returnKeycodeForString(code).code)
    );
    keymapParts[0].data = keymapParts[0].data.map((blankLayer, index) => {
      if (index < cleanedLayers.length) {
        return cleanedLayers[index];
      } else {
        return blankLayer;
      }
    });
  }
  const keyboard = state.keyboards.selectedKeyboard;
  const layout = state.keyboards.selectedLayoutName;
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
        (part) => part.name === keymapPartsName.LAYERS
      );
      if (layersPart) {
        const keymapPartsWithNewLayers = state.keymapParts.map((part) =>
          part.name === keymapPartsName.LAYERS ? action.payload : part
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
    case IMPORT_JSON:
      return { ...state, ...action.payload };
    case ENABLE_SCREENS:
      return {
        ...state,
        keymapParts: [...state.keymapParts, action.payload],
      };
    case DISABLE_SCREENS:
      return {
        ...state,
        keymapParts: state.keymapParts.filter(
          (part) => part.name !== keymapPartsName.SCREENS
        ),
      };
    case ADD_SINGLE_SCREEN:
      return {
        ...state,
        keymapParts: state.keymapParts.map((part) =>
          part.name === keymapPartsName.SCREENS
            ? { ...part, data: [...part.data, action.payload] }
            : part
        ),
      };
    case REMOVE_SINGLE_SCREEN:
      return {
        ...state,
        keymapParts: state.keymapParts.map((part) =>
          part.name === keymapPartsName.SCREENS
            ? { ...part, data: [part.data[0]] }
            : part
        ),
      };
    case UPDATE_SCREENS:
      return {
        ...state,
        keymapParts: state.keymapParts.map((part) =>
          part.name === keymapPartsName.SCREENS ? action.payload : part
        ),
      };
    default:
      return state;
  }
};
