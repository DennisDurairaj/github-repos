const SELECT_USER = 'user/SELECT_USER';

export default (state = '', action) => {
  switch (action.type) {
    case SELECT_USER:
      return action.user;
    default:
      return state;
  }
};
