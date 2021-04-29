import { ThunkAction } from "redux-thunk";
import { RootState } from ".";
export const SEND_TO_COMPILE: string = "SEND_TO_COMPILE";
export const COMPILED: string = "COMPILED";
export const GET_KEYBOARD_LAYOUT: string = "GET_KEYBOARD_LAYOUT";
export const GET_KEYBOARDS: string = "GET_KEYBOARDS";
export const SELECT_KEYBORD: string = "SELECT_KEYBORD";
export const SELECT_LAYOUT: string = "SELECT_LAYOUT";
export const UPDATE_KEYBOARD: string = "UPDATE_KEYBOARD";
export const UPDATE_COMPILER: string = "UPDATE_COMPILER";
export const UPDATE_KEYLAYOUT: string = "UPDATE_KEYLAYOUT";
export const KEYMAP_FROM_SELECTION: string = "KEYMAP_FROM_SELECTION";
export const CHANGE_LAYER: string = "CHANGE_LAYER";
export const IMPORT_JSON: string = "IMPORT_JSON";
export const ENABLE_SCREENS: string = "ENABLE_SCREENS";
export const DISABLE_SCREENS: string = "DISABLE_SCREENS";
export const ADD_SINGLE_SCREEN: string = "ADD_SINGLE_SCREEN";
export const REMOVE_SINGLE_SCREEN: string = "REMOVE_SINGLE_SCREEN";
export const UPDATE_SCREENS: string = "UPDATE_SCREENS";
export enum keymapPartsName {
  LAYERS = "layers",
  SCREENS = "screens",
}

export interface Action {
  type: string;
  payload: any;
}
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;
export interface LayoutKey {
  x: number;
  y: number;
  w?: number;
  h?: number;
  label?: string;
}
export type singleScreenLayer = {
  type: "text" | "image";
  value: string;
};
export type screen = {
  size: { x: 32 | 64 | 128; y: 32 | 64 | 128 };
  flip: boolean;
  layers: Array<singleScreenLayer>;
};

export interface screenPart {
  name: keymapPartsName;
  data: Array<screen>;
}
export type LayerRange = 0 | 1 | 2 | 3 | 4 | 5 | 6;
