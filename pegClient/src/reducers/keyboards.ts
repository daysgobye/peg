import axios from "axios";
import { Dispatch } from "redux";
import { RootState } from ".";
import { selectKeyboard } from "./keymap";
import {
  Action,
  GET_KEYBOARDS,
  GET_KEYBOARD_LAYOUT,
  SELECT_LAYOUT,
  LayoutKey,
  SELECT_KEYBORD,
  LayerRange,
  CHANGE_LAYER,
} from "./types";
export type InitialState = {
  selectedKeyboard: string;
  keyboardsList: string[];
  keyboardLayout: any;
  selectedLayoutData: LayoutKey[];
  selectedLayoutName: string;
  selectedLayer: LayerRange;
};
const initialState: InitialState = {
  selectedKeyboard: "",
  keyboardsList: [],
  keyboardLayout: {},
  selectedLayoutData: [],
  selectedLayoutName: "",
  selectedLayer: 0,
};
export const getKeyboardsList = () => async (dispatch: Dispatch) => {
  axios.get("/get-keyboard-list").then((res) => {
    dispatch({ type: GET_KEYBOARDS, payload: res.data });
  });
};
export const getKeyboardLayout = (keyboardName: string) => async (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  dispatch({ type: SELECT_KEYBORD, payload: keyboardName });
  axios
    .get(`/get-keyboard-layout/${keyboardName.split("/").join("-")}`)
    .then((res) => {
      dispatch({ type: GET_KEYBOARD_LAYOUT, payload: res.data });
      //@ts-ignore
      const firstAvaiableLayout: LayoutKey[] = Object.values(
        res.data.layouts
      )[0].layout as LayoutKey[];
      if (firstAvaiableLayout) {
        const layoutName: string = Object.keys(res.data.layouts)[0] as string;
        dispatch({
          type: SELECT_LAYOUT,
          payload: { data: firstAvaiableLayout, name: layoutName },
        });
        selectKeyboard()(dispatch, getState);
      }
    });
};
export const changeLayer = (newLayer: LayerRange) => (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  dispatch({ type: CHANGE_LAYER, payload: newLayer });
};

export default (
  state: InitialState = initialState,
  action: Action
): InitialState => {
  switch (action.type) {
    case CHANGE_LAYER:
      return { ...state, selectedLayer: action.payload };
    case SELECT_KEYBORD:
      return { ...state, selectedKeyboard: action.payload };
    case GET_KEYBOARDS:
      return { ...state, keyboardsList: action.payload };
    case GET_KEYBOARD_LAYOUT:
      return { ...state, keyboardLayout: action.payload };
    case SELECT_LAYOUT:
      return {
        ...state,
        selectedLayoutData: action.payload.data,
        selectedLayoutName: action.payload.name,
      };
    default:
      return state;
  }
};
