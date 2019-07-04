import { createSelector } from "reselect";

const getCurrentUser = state => state.userReducer.currentUser;
const getUsers = state => state.userReducer.users;
const getRepos = state => state.repoReducer.repos;

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
