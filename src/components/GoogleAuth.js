import React, { useState } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';
import firebase from '../lib/firebase';

const GoogleAuth = props => {
  const signInClick = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        props.signIn(result.uid);
      })
      .catch(err => console.log('error' + err));
  };

  // auth state listener
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      props.signIn(user.uid);
    } else {
      props.signOut();
    }
  });

  const signOutClick = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        props.signOut();
        alert('Sign out success');
      })
      .catch(error => console.log(error));
  };

  const renderAuthButton = () => {
    if (props.isSignedIn === null) {
      return null;
    } else if (props.isSignedIn) {
      return (
        <button className="ui red google button" onClick={signOutClick}>
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button className="ui red google button" onClick={signInClick}>
          <i className="google icon" />
          Sign In with Google
        </button>
      );
    }
  };

  return <div>{renderAuthButton()}</div>;
};

const mapStateToProps = state => {
  return {
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(
  mapStateToProps,
  { signIn, signOut }
)(GoogleAuth);
