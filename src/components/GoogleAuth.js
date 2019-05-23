import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut, fetchTodos } from '../actions';
import firebase from '../lib/firebase';
import Toast from '../lib/sweetAlert';

const GoogleAuth = props => {
  const signInClick = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        props.signIn(result.uid, result.user.displayName);
        props.fetchTodos();

        Toast.fire({
          type: 'success',
          title: `Signed in as ${result.user.displayName}`
        });
      })
      .catch(err => console.log('error' + err));
  };

  // auth state listener
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      props.signIn(user.uid, user.displayName);
      props.fetchTodos();
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
        // alert('Sign out success');
        Toast.fire({
          type: 'success',
          title: 'Signed out successfully'
        });
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
    isSignedIn: state.auth.isSignedIn,
    uid: state.auth.uid
  };
};

export default connect(
  mapStateToProps,
  { signIn, signOut, fetchTodos }
)(GoogleAuth);
