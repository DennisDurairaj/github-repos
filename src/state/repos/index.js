import { normalize } from "normalizr";
import { reposSchema } from "./schema";
import { setUserRepos, setCurrentUser } from "../users";

const RECEIVE_REPOS = "repos/RECEIVE_REPOS";
const FETCHING_REPOS = "repos/FETCHING_REPOS";
const FETCHING_REPOS_SUCCESS = "repos/FETCHING_REPOS_SUCCESS";
const FETCHING_REPOS_FAILED = "repos/FETCHING_REPOS_FAILED";

const initialState = {
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

export const fetchRepos = user => (dispatch, getState) => {
  const searchUser = user.toLowerCase();
  if (user in getState().userReducer.users) {
    return;
  }
  dispatch(fetchingRepos());
  return fetch(`https://api.github.com/users/${searchUser}/repos?per_page=5`)
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
    default: {
      return state;
    }
  }
};
