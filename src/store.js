import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';

import entities from './state/entities';
import fetching from './state/fetching';

const rootReducer = combineReducers({
  entities,
  fetching
});

export default () => {
  return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
};
