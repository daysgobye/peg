import { combineReducers } from "redux";
import keyboardsReducer, { InitialState } from "./keyboards";
import keymapReducer, { Keymap } from "./keymap";
const rootReducer = () =>
  combineReducers({ keyboards: keyboardsReducer, keymap: keymapReducer });

export default rootReducer;
//export type RootState = ReturnType<typeof rootReducer>;
export type RootState = {
  keyboards: InitialState;
  keymap: Keymap;
};
