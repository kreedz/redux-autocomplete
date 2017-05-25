const options = (state=[], action) => {
  const field = action.field;
  switch (action.type) {
    case 'GET_OPTIONS_SUCCESS':
      return action.payload.data.map(data => data[field])
    case 'GET_OPTIONS_ERR':
    default:
      return state;
  }
}

export default options
