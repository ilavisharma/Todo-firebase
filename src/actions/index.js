import firebase from '../lib/firebase';

const firestore = firebase.firestore();

export const signIn = (uid, displayName, photoURL) => {
  return {
    type: 'SIGN_IN',
    payload: {
      uid,
      displayName,
      photoURL
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
    try {
      const docRef = firestore.collection('todos').doc(auth.uid);
      const doc = await docRef.get();
      if (!doc.exists) {
        // This is a new user
        const { displayName, photoURL } = auth;
        // create a blank array so that todos can be added further
        firestore
          .collection('todos')
          .doc(auth.uid)
          .set({ todos: [], photoURL, displayName });
        dispatch({
          type: 'FETCH_TODOS',
          payload: []
        });
      } else {
        // this is not a new user
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

export const addTodo = todo => async (dispatch, getState) => {
  const { auth } = getState();
  try {
    const docRef = await firestore.collection('todos').doc(auth.uid);
    await docRef.update({
      todos: firebase.firestore.FieldValue.arrayUnion(todo)
    });
    dispatch({
      type: 'ADD_TODO',
      payload: todo
    });
  } catch (error) {
    console.log(error);
  }
};
