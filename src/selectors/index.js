import { createSelector } from 'reselect';

const getEntities = state => state.entitiesReducer.entities;
const getReposCollection = state => state.entitiesReducer.result;
const getCurrentUser = state => state.entitiesReducer.currentUser;
const getReposDictionary = state => getEntities(state).repos;
const getUsersDictionary = (state, props) => getEntities(state).users;

export const makeGetUserRepos = () =>
  createSelector(
    [getUsersDictionary, getCurrentUser, getReposDictionary],
    (users, currentUser, repos) => {
      if (currentUser) {
        const userRepoIds = users[currentUser].repoIds;
        const userRepos = userRepoIds.map(id => repos[id]);
        return userRepos;
      }
      return [];
    }
  );
