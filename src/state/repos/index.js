import { fetchBegin, fetchSuccess, fetchFailed } from '../fetching';
import reposSchema from './schema';
import { normalize } from 'normalizr';

const initialState = {
  repos: {},
  repoIds: []
};

const RECEIVE_REPOS = 'repos/RECEIVE_REPOS';

const receiveRepos = ({ entities, result }) => {
  return {
    type: RECEIVE_REPOS,
    payload: {
      entities,
      result
    }
  };
};

export const fetchUserRepos = user => dispatch => {
  return fetch(`https://api.github.com/users/${user}/repos?per_page=5`)
    .then(response => response.json())
    .then(json => {
      const normalizedRepos = normalize(json, reposSchema);
      dispatch(receiveRepos(normalizedRepos));
      return normalizedRepos.result;
    })
    .catch(error => dispatch(fetchFailed(error)));
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_REPOS:
      return {
        ...state,
        repos: {
          ...state.repos,
          ...action.payload.entities.repos
        },
        repoIds: [...state.repoIds, ...action.payload.result]
      };
    default:
      return state;
  }
};
