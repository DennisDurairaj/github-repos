import { fetchBegin, fetchSuccess, fetchFailed } from '../fetching';
import entitiesSchema from '../../schemas/schemas';
import { normalize } from 'normalizr';

const RECEIVE_REPOS = 'repos/RECEIVE_REPOS';

const initialState = {
  users: {},
  repos: {},
  repoIds: {}
};

const receiveRepos = ({ entities, result }) => {
  return {
    type: RECEIVE_REPOS,
    payload: {
      entities,
      result
    }
  };
};

// const getEntityKeys = normalizedData => {
//   const entities = Object.keys(normalizedData.entities);
//   const result = entities.map(entity =>
//     Object.keys(normalizedData.entities[entity])
//   );
// };

export const fetchRepos = user => dispatch => {
  dispatch(fetchBegin());
  return fetch(`https://api.github.com/users/${user}/repos?per_page=5`)
    .then(response => response.json())
    .then(json => {
      const normalizedData = normalize(json, entitiesSchema);
      dispatch(receiveRepos(normalizedData));
      return dispatch(fetchSuccess());
    })
    .catch(error => dispatch(fetchFailed(error)));
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_REPOS:
      return {
        ...state,
        users: {
          ...state.users,
          ...action.payload.entities.users
        },
        repos: {
          ...state.repos,
          ...action.payload.entities.repos
        },
        repoIds: {
          ...state.repoIds,
          ...action.payload.result
        }
      };

    default:
      return state;
  }
};
