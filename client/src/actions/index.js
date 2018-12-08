export const loginAction = (body) => dispatch => {
  return fetch("/api/login", {
    method: "POST",
    headers: {"Content-type": "application/json"},
    body: JSON.stringify(body)
  })
    .then(res => res.json())
    .then(data => {
      return dispatch({
        type: "LOGiN_ACTION",
        payload: data
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