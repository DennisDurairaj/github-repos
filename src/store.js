import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import thunk from "redux-thunk";

// import entitiesReducer from './state/entities';
import userReducer from "./state/users";
import repoReducer from "./state/repos";
import fetching from "./state/fetching";

const rootReducer = combineReducers({
  userReducer,
  repoReducer,
  fetching
});

export default () => {
  return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
};
