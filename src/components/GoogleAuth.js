import React, { useState, useEffect } from 'react';
import firebase from '../lib/firebase';

const GoogleAuth = () => {
  const [auth, chageAuth] = useState(firebase.auth());
  const signInClick = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        console.log(result);
        console.log(auth.currentUser);
      })
      .catch(err => console.log('error' + err));
  };

  useEffect(() => {
    console.log(auth.currentUser);
  }, []);

  return (
    <button className="ui red google button" onClick={signInClick}>
      <i className="google icon" />
      Sign In with Google
    </button>
  );
};

export default GoogleAuth;
