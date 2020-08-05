import {useEffect} from "react";
import {Store} from "pullstate";
import {auth} from "./init";

const authStore = new Store({
  user: null,
});
const setLocalUser = user => {
  authStore.update(s => {
    s.user = user;
  });
};

const signInWithGoogle = () => {
  auth().signInWithPopup(
    new auth.GoogleAuthProvider().setCustomParameters({
      prompt: "select_account",
    })
  );
};

const signOut = () => {
  auth().signOut();
};

const useAuth = () => {
  useEffect(
    () =>
      auth().onAuthStateChanged(
        user => setLocalUser(user),
        _err => setLocalUser(null)
      ),
    []
  );

  return authStore.useState(s => s.user);
};

export {signInWithGoogle, signOut, useAuth};
