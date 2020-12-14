import { ThunkAction } from "redux-thunk";
import { RootState } from ".";
export const SEND_TO_COMPILE: string = "SEND_TO_COMPILE";
export const GET_KEYBOARD_LAYOUT: string = "GET_KEYBOARD_LAYOUT";
export const GET_KEYBOARDS: string = "GET_KEYBOARDS";
export const SELECT_KEYBORD: string = "SELECT_KEYBORD";
export const SELECT_LAYOUT: string = "SELECT_LAYOUT";
export const UPDATE_KEYBOARD: string = "UPDATE_KEYBOARD";
export const UPDATE_COMPILER: string = "UPDATE_COMPILER";
export const UPDATE_KEYLAYOUT: string = "UPDATE_KEYLAYOUT";
export const KEYMAP_FROM_SELECTION: string = "KEYMAP_FROM_SELECTION";

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
export type LayerRange = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
