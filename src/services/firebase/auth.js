import {useEffect, useState} from "react";
import {auth} from "./init";

// TODO: these should go in a util folder
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

/*
  Defines a hook to fetch and listen for changes to the currently
  logged in firebase user;

  ```jsx
  const MyComponent = () => {
    const user = useAuth();
    const name = user ? user.displayName : "nobody";

    return (
      <div>
        Current user: {name}
      </div>
    )
  }
  ```

  Possible return values
    user: null    meaning: no one logged in, or no response from firebase yet
    user: User    meaning: someone logged in!
 */

const useAuth = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(
      user => setUser(user),
      _err => setUser(null)
    );
    return unsubscribe;
  }, []);

  return user;
};

export {signInWithGoogle, signOut, useAuth};
