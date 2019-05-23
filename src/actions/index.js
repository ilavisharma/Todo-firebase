import firebase from '../lib/firebase';

const firestore = firebase.firestore();

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

export const fetchTodos = () => async (dispatch, getState) => {
  const { auth } = getState();
  if (auth.isSignedIn) {
    const docRef = firestore.collection('todos').doc(auth.uid);

    try {
      const doc = await docRef.get();
      if (!doc.exists) {
        console.log('No such document found');
      } else {
        // console.log(doc.data().todos);
        dispatch({
          type: 'FETCH_TODOS',
          payload: doc.data().todos
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
};
