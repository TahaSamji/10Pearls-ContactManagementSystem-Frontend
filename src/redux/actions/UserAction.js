export const LOGIN_USER = "LOGIN_USER"
export const UPDATE_SEARCH = "UPDATE_SEARCH"
export const LOGOUT_USER = "LOGOUT_USER"
export const PAGE_CHANGE = "PAGE_CHANGE"

//action update 
export const updateUserDetails = (details) => {
    return {
      type: 'UPDATE_USER_DETAILS',
      payload: details,
    };
  };