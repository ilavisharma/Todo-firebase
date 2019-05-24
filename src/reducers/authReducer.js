const INITIAL_STATE = {
  isSignedIn: null,
  uid: null,
  displayName: null,
  photoURL: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return {
        ...state,
        isSignedIn: true,
        uid: action.payload.uid,
        displayName: action.payload.displayName,
        photoURL: action.payload.photoURL
      };
    case 'SIGN_OUT':
      return {
        ...state,
        isSignedIn: false,
        uid: null,
        displayName: null
      };
    default:
      return state;
  }
};
