import {useMemo, useEffect, useState} from "react";
import {database} from "./init";
import {useAuth} from "./auth";

/*
  Defines a hook to fetch and listen for changes to data in a firebase path,
  which is automatically prefixed with a unique string for the currently logged in user.

  ```jsx
  const MyComponent = () => {
    const [value, ref] = useData("some/relative/path");

    if (value === undefined) {
      return <CircularProgress />;
    }

    return (
      <Button onClick={() => ref.transaction(v => v + 1)}>
        Current value: {value}
      </Button>
    )
  }
  ```

  Possible return values
    value: undefined    ref: undefined    meaning: no response from firebase yet
    value: null         ref: Reference    meaning: no value saved in firebase
    value: something    ref: Reference    meaning: got the latest from firebase

  Unexpected return values:
    value: something    ref: undefined    meaning: should not be possible!
    value: undefined    ref: Reference    meaning: should not be possible!


  Other notes:
    I'm pretty sure the firebase client will efficiently handle multiple listeners
    to the same path, so you won't download duplicate copies of the data. React
    will probably keep multiple copies in memory, but surely you won't have _that_
    much data going in an out of firebase.
 */

const useData = path => {
  const user = useAuth();
  const ref = useMemo(
    () => user && database().ref(`users/${user.uid}/data/${path}`),
    [user, path]
  );
  const [data, setData] = useState(undefined);

  useEffect(() => {
    if (user === null) {
      return setData(undefined);
    }

    ref.on(
      "value",
      data => setData(data.val()),
      _err => setData(null)
    );

    return () => {
      ref.off("value");
    };
  }, [path, ref, user]);

  if (user === null) {
    return [undefined, undefined];
  }
  return [data, ref];
};

export {useData};
