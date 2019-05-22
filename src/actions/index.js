export const signIn = (uid, displayName) => {
  return {
    type: 'SIGN_IN',
    payload: {
      uid,
      displayName
    }
  };
};

export const signOut = () => {
  return {
    type: 'SIGN_OUT'
  };
};
