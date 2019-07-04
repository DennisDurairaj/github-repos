import { normalize } from 'normalizr';
import { reposSchema } from './schema';
import { setUserRepos } from '../users';

const RECEIVE_REPOS = 'repos/RECEIVE_REPOS';
const FETCHING_REPOS = 'repos/FETCHING_REPOS';
const FETCHING_REPOS_SUCCESS = 'repos/FETCHING_REPOS_SUCCESS';
const NEXT_PAGE = 'repos/NEXT_PAGE';
const REACHED_LAST_PAGE = 'repos/REACHED_LAST_PAGE';
const RESET_CURRENT_PAGE = 'repos/RESET_CURRENT_PAGE';

const initialState = {
  currentPage: 1,
  reachedLastPage: true,
  isFetching: false,
  repos: {},
  repoIds: []
};

const fetchingRepos = () => ({
  type: FETCHING_REPOS
});

const fetchingReposSuccess = () => ({
  type: FETCHING_REPOS_SUCCESS
});

const receiveRepos = ({ entities, result }) => ({
  type: RECEIVE_REPOS,
  payload: {
    repos: entities.repos,
    result
  }
});

const nextPage = () => ({
  type: NEXT_PAGE
});

const reachedLastPage = () => ({
  type: REACHED_LAST_PAGE
});

export const resetCurrentPage = () => ({
  type: RESET_CURRENT_PAGE
});

export const fetchNextPage = page => (dispatch, getState) => {
  const currentUser = getState().userReducer.currentUser;
  if (getState().repoReducer.currentPage === page) {
    return;
  }
  dispatch(fetchingRepos());
  return fetch(
    `https://api.github.com/users/${currentUser}/repos?page=${page}&per_page=20`
  )
    .then(response => {
      if (response.headers.get('Link').includes('next') === false) {
        dispatch(reachedLastPage());
      }
      return response.json();
    })
    .then(json => {
      const normalizedRepos = normalize(json, reposSchema);
      dispatch(setUserRepos(currentUser, normalizedRepos.result));
      dispatch(receiveRepos(normalizedRepos));
      dispatch(nextPage());
      dispatch(fetchingReposSuccess());
    });
};

export const fetchRepos = (user, page = 1) => (dispatch, getState) => {
  const searchUser = user.toLowerCase();
  if (user in getState().userReducer.users) {
    return;
  }
  dispatch(fetchingRepos());
  return fetch(
    `https://api.github.com/users/${searchUser}/repos?page=${page}&per_page=20`
  )
    .then(response => response.json())
    .then(json => {
      const normalizedRepos = normalize(json, reposSchema);
      dispatch(setUserRepos(searchUser, normalizedRepos.result));
      dispatch(receiveRepos(normalizedRepos));
      dispatch(fetchingReposSuccess());
    });
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_REPOS:
      return {
        ...state,
        isFetching: true
      };
    case FETCHING_REPOS_SUCCESS:
      return {
        ...state,
        isFetching: false
      };
    case RECEIVE_REPOS:
      return {
        ...state,
        repos: {
          ...state.repos,
          ...action.payload.repos
        },
        repoIds: [...state.repoIds, ...action.payload.result]
      };
    case NEXT_PAGE:
      return {
        ...state,
        currentPage: state.currentPage + 1
      };
    case REACHED_LAST_PAGE:
      return {
        ...state,
        reachedLastPage: true
      };
    case RESET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: 1,
        reachedLastPage: false
      };
    default: {
      return state;
    }
  }
};
