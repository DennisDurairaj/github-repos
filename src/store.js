import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import repos from './state/repos';

const rootReducer = combineReducers({
  repos
});

export default () => {
  return createStore(rootReducer, composeWithDevTools());
};
