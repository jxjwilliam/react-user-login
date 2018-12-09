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

export const signupAction = (form_data) => dispatch => {
  return fetch("/api/signup", {
    method: "POST",
    headers: {"Content-type": "application/json"},
    body: JSON.stringify(form_data)
  })
    .then(res => res.json())
    .then(data => {
      return dispatch({
        type: "SIGNUP_ACTION",
        payload: form_data
      })
    })
    .catch(e => console.error(e))
}

export const searchAction = keyword => ({
  type: "SEARCH",
  payload: keyword
})

export const sort = {
  type: "SORT"
}