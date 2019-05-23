export default (state = null, action) => {
  switch (action.type) {
    case 'FETCH_TODOS':
      return {
        ...state,
        todos: action.payload
      };
    default:
      return state;
  }
};
