import { normalize } from 'normalizr';
import userSchema from './schema';
import { fetchRepos, resetCurrentPage } from '../repos';

const RECEIVE_USER = 'users/RECEIVE_USER';
const FETCHING_USER = 'users/FETCHING_USER';
const FETCHING_USER_SUCCESS = 'users/FETCHING_USER_SUCCESS';
const SET_USER_REPOS = 'users/SET_USER_REPOS';
const SET_CURRENT_USER = 'users/SET_CURRENT_USER';
const FETCHING_USER_FAILED = 'users/FETCHING_USER_FAILED';

const initialState = {
  isFetching: false,
  currentUser: '',
  users: {},
  userIds: [],
  error: ''
};

const fetchingUser = () => ({
  type: FETCHING_USER
});

const fetchingUserSuccess = () => ({
  type: FETCHING_USER_SUCCESS
});

const fetchingUserFailed = error => ({
  type: FETCHING_USER_FAILED,
  payload: {
    error
  }
});

const receiveUser = ({ entities, result }) => ({
  type: RECEIVE_USER,
  payload: {
    user: entities.user,
    result
  }
});

export const setUserRepos = (user, repoIds) => ({
  type: SET_USER_REPOS,
  payload: {
    user,
    repoIds
  }
});

export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  payload: {
    user
  }
});

export const fetchUser = user => (dispatch, getState) => {
  const searchUser = user.toLowerCase();
  if (user in getState().userReducer.users) {
    return dispatch(setCurrentUser(user));
  }
  dispatch(fetchingUser());
  dispatch(resetCurrentPage());
  return fetch(`https://api.github.com/users/${searchUser}`)
    .then(response => {
      if (response.ok === false) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(json => {
      const normalizedUser = normalize(json, userSchema);
      dispatch(fetchRepos(user));
      dispatch(receiveUser(normalizedUser));
      dispatch(setCurrentUser(user));
      dispatch(fetchingUserSuccess());
    })
    .catch(error => {
      dispatch(fetchingUserFailed(error.message));
    });
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_USER:
      return {
        ...state,
        isFetching: true
      };
    case FETCHING_USER_SUCCESS:
      return {
        ...state,
        isFetching: false
      };
    case FETCHING_USER_FAILED:
      return {
        ...state,
        isFetching: false,
        error: action.payload.error
      };
    case RECEIVE_USER:
      return {
        ...state,
        users: {
          ...state.users,
          ...action.payload.user
        },
        userIds: [...state.userIds, action.payload.result]
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload.user
      };
    case SET_USER_REPOS:
      const repoIds = state.users[action.payload.user].repoIds
        ? state.users[action.payload.user].repoIds
        : [];
      return {
        ...state,
        users: {
          ...state.users,
          [action.payload.user]: {
            ...state.users[action.payload.user],
            repoIds: [...repoIds, ...action.payload.repoIds]
          }
        }
      };
    default: {
      return state;
    }
  }
};
