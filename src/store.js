import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';

import usersReducer from './state/users';
import reposReducer from './state/repos';
import fetching from './state/fetching';

const rootReducer = combineReducers({
  usersReducer,
  reposReducer,
  fetching
});

export default () => {
  return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
};
