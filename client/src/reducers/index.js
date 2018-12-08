import {combineReducers} from 'redux'

const loggedInReducer = (state = {}, action) => {
    switch (action.type) {
        case "LOGIN":
            return {...action.payload, loggedIn: true};
        case "LOGOUT":
            return {...action.payload, loggedIn: false}
    }
    return state;
}


export default combineReducers({
    loggedIn: loggedInReducer
})