import { createSelector } from "reselect";

const getCurrentUser = state => state.userReducer.currentUser;
const getUsers = state => state.userReducer.users;
// const getUserRepoIds = state => state.userReducer.users[getCurrentUser()].repoIds;
const getUserIds = state => state.userReducer.userIds;
const getRepos = state => state.repoReducer.repos;
const getRepoIds = state => state.repoReducer.repoIds;

export const getUserRepos = createSelector(
  [getCurrentUser, getUsers, getRepos],
  (currentUser, users, repos) => {
    if (currentUser && users[currentUser].repoIds) {
      const userRepoIds = users[currentUser].repoIds;
      const userRepos = userRepoIds.map(id => repos[id]);
      return userRepos;
    }
    return [];
  }
);
