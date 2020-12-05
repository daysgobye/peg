import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReduser from "./reducers/index";

const initialState: any = {};
const store: any = createStore(
  rootReduser(),
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
