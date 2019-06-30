import { fetchBegin, fetchSuccess, fetchFailed } from '../fetching';
import { repoSchema } from './schema';
import { normalize } from 'normalizr';

const RECEIVE_ENTITIES = 'users/RECEIVE_ENTITIES';

const initialState = {
  currentUser: '',
  entities: {
    users: {},
    repos: {}
  },
  result: []
};

const receiveEntities = (currentUser, { entities, result }) => {
  return {
    type: RECEIVE_ENTITIES,
    payload: {
      currentUser,
      entities,
      result
    }
  };
};

export const fetchRepos = searchUser => dispatch => {
  const user = searchUser.toLowerCase();
  dispatch(fetchBegin());
  return fetch(`https://api.github.com/users/${user}/repos?per_page=5`)
    .then(response => response.json())
    .then(json => {
      const normalizedEntities = normalize(json, repoSchema);
      const {
        entities: { users },
        result
      } = normalizedEntities;
      users[user].repoIds = result;
      dispatch(receiveEntities(user, normalizedEntities));
      dispatch(fetchSuccess());
    });
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_ENTITIES:
      return {
        ...state,
        currentUser: action.payload.currentUser,
        entities: {
          users: {
            ...state.entities.users,
            ...action.payload.entities.users
          },
          repos: {
            ...state.entities.repos,
            ...action.payload.entities.repos
          }
        },
        result: [...state.result, ...action.payload.result]
      };
    default:
      return state;
  }
};
