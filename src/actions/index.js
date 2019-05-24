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
        console.log('No such document found');
        // create a blank array so that todos can be added further
        const { displayName, photoURL } = auth;
        firestore
          .collection('todos')
          .doc(auth.uid)
          .set({ todos: [], photoURL, displayName });
        dispatch({
          type: 'FETCH_TODOS',
          payload: []
        });
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

export const addTodo = todo => async (dispatch, getState) => {
  const { auth } = getState();
  try {
    const docRef = await firestore.collection('todos').doc(auth.uid);
    const arrUnion = await docRef.update({
      todos: firebase.firestore.FieldValue.arrayUnion(todo)
    });
    console.log(arrUnion);
    dispatch({
      type: 'ADD_TODO',
      payload: todo
    });
  } catch (error) {
    console.log(error);
  }
};
