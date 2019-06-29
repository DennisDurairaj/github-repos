import { fetchBegin, fetchSuccess, fetchFailed } from './../fetching/';

const RECEIVE_REPOS = 'repos/RECEIVE_REPOS';

const initialState = {
  items: []
};

const receiveRepos = (user, repos) => {
  return {
    type: RECEIVE_REPOS,
    payload: {
      user,
      repos
    }
  };
};

export const fetchRepos = user => dispatch => {
  dispatch(fetchBegin());
  return fetch(`https://api.github.com/users/${user}/repos?per_page=5`)
    .then(response => response.json())
    .then(json => {
      dispatch(receiveRepos(user, json));
      return dispatch(fetchSuccess());
    })
    .catch(error => dispatch(fetchFailed(error)));
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_REPOS:
      return {
        ...state,
        items: action.payload.repos
      };

    default:
      return state;
  }
};
