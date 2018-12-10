import {combineReducers} from 'redux'
import jwt_decode from 'jwt-decode'
import userListReducer from './listReducer'

const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case "LOGIN_ACTION_SUCCESS":
      let token = action.payload;
      let decoded = jwt_decode(token)
      return {token, email: decoded.email, loggedIn: true}
    case "LOGIN_ACTION_FAIL":
      return {...action.payload, loggedIn: false}
    case "LOGOUT_ACTION":
      return {...action.payload, loggedIn: false}
    default:
      return state;
  }
}

export const signupReducer = (state = '', action) => {
  switch (action.type) {
    case "SIGNUP_ACTION_SUCCESS":
      return action.payload;
    case "SIGNUP_ACTION_FAIL":
      return action.payload;
    default:
      return state;
  }
}

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_USER_ACTION':
      return action.payload
    case 'UPDATE_USER_ACTION':
      return action.payload;
    default:
      return state;
  }
}

export default combineReducers({
  login: loginReducer,
  signup: signupReducer,
  user: userReducer,
  userList: userListReducer
})