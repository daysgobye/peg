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
  SEND_TO_COMPILE,
  COMPILED,
} from "./types";
import { saveAs } from "file-saver";
export type InitialState = {
  selectedKeyboard: string;
  keyboardsList: string[];
  keyboardLayout: any;
  selectedLayoutData: LayoutKey[];
  selectedLayoutName: string;
  selectedLayer: LayerRange;
  compiledKeyMap: any;
  jobId: string;
  positionInQueue: number;
};
const initialState: InitialState = {
  selectedKeyboard: "",
  keyboardsList: [],
  keyboardLayout: {},
  selectedLayoutData: [],
  selectedLayoutName: "",
  selectedLayer: 0,
  compiledKeyMap: "",
  jobId: "",
  positionInQueue: 0,
};

const getcompiledMap = async (dispatch: Dispatch, jobId: string) => {
  const wait = (ms: number = 500) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  const checkToPollAgain = async (res: any) =>
    (await res.data.text()) === "Job Not Done";
  const poll = async (call: any) => {
    await wait();
    let res: any = await call();
    let check = await checkToPollAgain(res);
    while (check) {
      await wait();
      res = await call();
      check = await checkToPollAgain(res);
    }
    return res;
  };
  const compiledKeyMapRes = await poll(() =>
    axios
      .get(`/check-status/${jobId}`, { responseType: "blob" })
      .then((res) => res)
      .catch((error) => console.error("failed to check job status", error))
  );
  console.log(compiledKeyMapRes);
  const fileName = compiledKeyMapRes.headers["content-disposition"].split(
    "="
  )[1];
  saveAs(compiledKeyMapRes.data, fileName);
  dispatch({ type: COMPILED, payload: compiledKeyMapRes.data });
};

export const compileKeyMap = () => async (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  const keymap = getState().keymap;
  axios
    .post("/compile", keymap)
    .then((res) => {
      const [jobid, positionInQueue] = res.data.split(":");
      dispatch({
        type: SEND_TO_COMPILE,
        payload: { jobid, positionInQueue: Number(positionInQueue) },
      });
      getcompiledMap(dispatch, jobid);
    })
    .catch((error) => console.error("error compiling", error));
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
  return axios
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
      return res;
    })
    .catch((error) => {
      console.log("error getting keyboard layout", error);
      return error;
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
    case SEND_TO_COMPILE:
      return {
        ...state,
        jobId: action.payload.jobid,
        positionInQueue: action.payload.positionInQueue,
      };
    case COMPILED:
      return { ...state, compiledKeyMap: action.payload };
    default:
      return state;
  }
};
