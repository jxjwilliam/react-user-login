export const getUsers = (page = 1) => {
  return (dispatch, getState) => {
    const users = getState().userList;
    fetch(`/api/list/page/${page}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        dispatch({
          type: 'FETCH_USERS',
          payload: data
        });
      });
  }
};

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
  sortBy: sortBy, seq: seq
})

export const searchUser = username => ({
  type: 'SEARCH_USERS',
  payload: username
});

const searchUserFulfilled = payload => {
  //console.warn('how many times?', payload.length); //25, 3...
  if (!payload || payload.length === 0) {
    console.log('no matching, try again');
    return {type: 'SEARCH_USERS_NULL'};
  }
  return {type: 'SEARCH_USERS_FULFILLED', payload};
}