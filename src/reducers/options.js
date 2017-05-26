const options = (state=[], action) => {
  const {field, filterBy} = action;
  switch (action.type) {
    case 'GET_OPTIONS_SUCCESS':
      console.log(action, field, filterBy);
      return action.payload.data.map(data => data[field]).filter(item => item.startsWith(filterBy));
    case 'GET_OPTIONS_ERR':
    default:
      return state;
  }
}

export default options