const options = (state={isFetching: false, items: []}, action) => {
  const {field, filterBy} = action;
  switch (action.type) {
    case 'GET_OPTIONS_SUCCESS':
      return {
        ...state,
        items: action.payload.data.map(data => data[field]).filter(item => item.startsWith(filterBy)),
        isFetching: false,
      };
    case 'GET_OPTIONS_REQUEST':
      return {
        ...state,
        isFetching: true,
      };
    case 'GET_OPTIONS_ERR':
    default:
      return state;
  }
};

export default options