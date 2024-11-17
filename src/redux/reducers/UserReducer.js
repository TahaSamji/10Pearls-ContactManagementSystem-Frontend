import * as actionTypes from '../actions/UserAction';



export const initialState = {
  userDetails: {},
  token: "",
  loggedIn: false,
  Search :"",
  initialPage:"contactPage"
};


// ==============================|| CUSTOMIZATION REDUCER ||============================== //

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_USER:
      return {
        ...state,
        ...action.payload,
        loggedIn: true
      };
      case actionTypes.PAGE_CHANGE:
      return {
        ...state,
        ...action.payload,
        initialPage:action.payload.pagetype
      };
      case actionTypes.UPDATE_SEARCH:
        return {
          ...state,
          ...action.payload,
          Search : action.payload.Search
        };
  
    case actionTypes.LOGOUT_USER:
      return {
        ...state,
        ...initialState
      }
    default:
      return state;
  }
};

export default userReducer;