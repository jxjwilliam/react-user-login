//TODO: "x-access-token": token
export const getUsers = (page = 1) => dispatch => {

  return fetch(`/api/list/page/${page}`, {
    method: 'GET',
    headers: {
      "Content-type": "application/json",
      "Accept": "application/json"
    }
  })
    .then(res => res.json())
    .then(data => {
      if (Array.isArray(data)) {
        dispatch({
          type: 'FETCH_USERS',
          payload: data
        });
      }
      else {
        dispatch({
          type: 'FETCH_USERS_FAIL',
          payload: data
        });
      }
    });
};

export const getTotal = () => dispatch => {

  return fetch('/api/list/total')
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: 'FETCH_TOTAL',
        payload: data
      })
    })
}

export const prevAction = (page) => (dispatch) => {
  fetch(`/api/list/page/${page}`)
    .then(res => res.json())
    .then(data => {
      dispatch({type: 'PREV_USERS', payload: data});
    });
}


export const nextAction = page => dispatch => {
  fetch(`/api/list/page/${page}`)
    .then(res => res.json())
    .then(data => {
      dispatch({type: 'NEXT_USERS', payload: data});
    });
}


export const updateUser = user => dispatch => {
  fetch('/api/list', {
    method: 'PUT',
    headers: {
      'Accept': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: 'UPDATE_USER',
        payload: data
      });
    });
};

export const saveUser = user => dispatch => {
  fetch('/api/list', {
    method: 'POST',
    headers: {
      'Accept': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: 'ADD_USER',
        payload: data
      });
    });
}

export const deleteUser = user => dispatch => {
  fetch('/api/list', {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: 'DELETE_USER',
        payload: data
      });
    });
}

export const sortAction = (sortBy, seq) => ({
  type: 'SORT_USERS',
  sortBy: sortBy,
  seq: seq
})