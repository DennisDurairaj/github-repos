import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';

import users from './state/users';
import repos from './state/repos';
import fetching from './state/fetching';

const rootReducer = combineReducers({
  users,
  repos,
  fetching
});

export default () => {
  return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
};
