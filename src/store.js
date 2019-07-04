import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import userReducer from "./state/users";
import repoReducer from "./state/repos";

const rootReducer = combineReducers({
  userReducer,
  repoReducer
});

export default () => {
  return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
};
