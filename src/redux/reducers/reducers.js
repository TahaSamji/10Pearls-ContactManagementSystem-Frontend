import { combineReducers } from 'redux';


import userReducer from './UserReducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  
  user: userReducer
});

export default reducer;