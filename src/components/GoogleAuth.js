import React, { useState, useEffect } from 'react';
import firebase from '../lib/firebase';

const GoogleAuth = () => {
  const [isSignedIn, changeIsSignedIn] = useState(false);
  const signInClick = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        console.log(result);
      })
      .catch(err => console.log('error' + err));
  };

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      changeIsSignedIn(true);
    } else {
      changeIsSignedIn(false);
    }
  });

  const signOutClick = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log('Sign out success'))
      .catch(error => console.log(error));
  };

  if (!isSignedIn) {
    return (
      <button className="ui red google button" onClick={signInClick}>
        <i className="google icon" />
        Sign In with Google
      </button>
    );
  } else {
    return (
      <button className="ui red google button" onClick={signOutClick}>
        <i className="google icon" />
        Sign Out
      </button>
    );
  }
};

export default GoogleAuth;
