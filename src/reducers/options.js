const options = (state=[1, 2], action) => {
  switch (action.type) {
    case 'FETCH_OPTIONS':
      return [1, 2, 3];
    default:
      return state;
  }
}

export default options
