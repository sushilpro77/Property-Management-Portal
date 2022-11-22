const isLoggedIn = (state) => {
  return !!(
    state.user &&
    state.user.user &&
    Object.keys(state.user.user).length != 0 &&
    state.user.token
  );
};

const selectAuth = (state) => {
  return state?.user?.user?.scopes;
};

export { isLoggedIn, selectAuth };
