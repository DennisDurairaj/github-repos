import { createSelector } from "reselect";

// const getEntities = state => state.entitiesReducer.entities;
// const getReposCollection = state => state.entitiesReducer.result;
// const getCurrentUser = state => state.entitiesReducer.currentUser;
// const getReposDictionary = state => getEntities(state).repos;
// const getUsersDictionary = (state, props) => getEntities(state).users;

// export const makeGetUserRepos = () =>
//   createSelector(
//     [getUsersDictionary, getCurrentUser, getReposDictionary],
//     (users, currentUser, repos) => {
//       if (currentUser) {
//         const userRepoIds = users[currentUser].repoIds;
//         const userRepos = userRepoIds.map(id => repos[id]);
//         return userRepos;
//       }
//       return [];
//     }
//   );

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
