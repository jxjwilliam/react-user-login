import {combineReducers} from 'redux'

const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case "LOGIN_ACTION_SUCCESS":
      return {
        token: action.payload,
        loggedIn: true
      };
    case "LOGIN_ACTION_FAIL":
      return {...action.payload, loggedIn: false}
    case "LOGOUT_ACTION":
      return {...action.payload, loggedIn: false}
  }
  return state;
}


export const signupReducer = (state = {}, action) => {
  switch (action.type) {
    case "SIGNUP_ACTION":
      return action.payload;
  }
  return state;

}

export default combineReducers({
  login: loginReducer,
  signup: signupReducer
})