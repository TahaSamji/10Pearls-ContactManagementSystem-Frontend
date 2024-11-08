export const LOGIN_USER = "LOGIN_USER"
export const LOGOUT_USER = "LOGOUT_USER"

//action update 
export const updateUserDetails = (details) => {
    return {
      type: 'UPDATE_USER_DETAILS',
      payload: details,
    };
  };