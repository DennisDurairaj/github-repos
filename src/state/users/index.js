import { fetchUserRepos } from '../repos';
import { fetchBegin, fetchSuccess, fetchFailed } from '../fetching';
import userSchema from './schema';
import { normalize } from 'normalizr';

const RECEIVE_USER = 'users/RECEIVE_USER';

const initialState = {
  currentUser: '',
  users: {},
  userIds: []
};

const receiveUser = (currentUser, { entities, result }) => {
  return {
    type: RECEIVE_USER,
    payload: {
      currentUser,
      entities,
      result
    }
  };
};

export const fetchUser = user => dispatch => {
  dispatch(fetchBegin());
  return fetch(`https://api.github.com/users/${user}`)
    .then(response => response.json())
    .then(json => {
      dispatch(fetchUserRepos(user)).then(response => {
        json.repoIds = response;
        const normalizeUser = normalize(json, userSchema);
        dispatch(receiveUser(user, normalizeUser));
        dispatch(fetchSuccess());
      });
    });
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_USER:
      return {
        ...state,
        currentUser: action.payload.currentUser,
        users: {
          ...state.users,
          ...action.payload.entities.users
        },
        userIds: [...state.userIds, action.payload.result]
      };
    default:
      return state;
  }
};
