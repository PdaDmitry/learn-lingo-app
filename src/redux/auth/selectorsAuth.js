export const selectUser = state => state.auth.user;
export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const selectAuthError = state => state.auth.error;
export const selectLoader = state => state.auth.loader;

export const selectUserID = state => state.auth.user.localId;
export const selectUserTheme = state => state.auth.user.theme;
// export const selectUserFilters = state => state.auth.user.filters;
