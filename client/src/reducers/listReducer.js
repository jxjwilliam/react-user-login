import orderBy from 'lodash/orderBy'

const totalReducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_TOTAL':
      return action.payload;
    default:
      return state;
  }
}

const userListReducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_USERS':
    case 'LOAD_USERS':
    case 'PREV_USERS':
    case 'NEXT_USERS':
      return action.payload;
    case 'SORT_USERS':
      return orderBy(state, [action.sortBy], [action.seq]);
    case 'UPDATE_USER':
      return state.map(s => s._id === action.payload._id ? action.payload : s)
    case 'ADD_USER':
      return [action.payload].concat(state)
    case 'DELETE_USER':
      return state.filter(s => s._id !== action.payload);
    case 'SEARCH_USERS':
      return action.payload;
    default:
      return state;
  }
}

const searchFields = (state, field, keyword) => {
  return state.filter(ul => ul[field] && ul[field].toLowerCase().indexOf(keyword) !== -1)
}

export {
  totalReducer,
  userListReducer,
  searchFields
}