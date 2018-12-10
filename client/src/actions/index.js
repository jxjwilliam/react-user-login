export const loginAction = (body) => dispatch => {
  return fetch("/api/login", {
    method: "POST",
    headers: {"Content-type": "application/json"},
    body: JSON.stringify(body)
  })
    .then(res => res.json())
    //{ "success":true, "message":"Enjoy your token!", "token":"eyJh..."}
    .then(data => {
      if (data.success && data.token) {
        return dispatch({
          type: "LOGIN_ACTION_SUCCESS",
          payload: data.token
        })
      }
      else {
        return dispatch({
          type: "LOGIN_ACTION_FAIL",
          payload: data
        })
      }
    })
    .catch(e => console.error(e))
}

//{"success":false,"message":"Error: Account already exist"}
export const signupAction = (body) => dispatch => {
  return fetch("/api/signup", {
    method: "POST",
    headers: {"Content-type": "application/json"},
    body: JSON.stringify(body)
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        return dispatch({
          type: "SIGNUP_ACTION_SUCCESS",
          payload: data
        })
      }
      else {
        return dispatch({
          type: "SIGNUP_ACTION_FAIL",
          payload: data
        })
      }
    })
    .catch(e => console.error(e))
}

export const getUserAction = (email, token) => dispatch => {
  return fetch("/api/users/" + email, {
    method: 'GET',
    headers: {
      "Content-type": "application/json",
      "Accept": "application/json",
      "x-access-token": token
    }
  })
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: "GET_USER_ACTION",
        payload: data
      })
    })
    .catch(e => console.error(e))
}

export const updateUserAction = (form_data, token) => dispatch => {
  return fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "Accept": "application/json",
      "x-access-token": token
    },
    body: JSON.stringify(form_data)
  })
    .then(res => res.json())
    .then(data => {
      return dispatch({
        type: "UPDATE_USER_ACTION",
        payload: form_data
      })
    })
    .catch(e => console.error(e))
}
