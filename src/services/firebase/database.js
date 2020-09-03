import {useEffect} from "react";
import {Store} from "pullstate";
import {database} from "./init";
import {useAuth} from "./auth";
import {noop} from "../../util/misc";

/* Defines a hook `useData(path)` which subscribes to `path` in the
   logged-in user's firebase db. The hook returns a pair
     [currentValue, doUpdate]
   When your component is mounted, a listener is set to update
   `currentValue` whenever a change is detected in firebase, and stopped
   on ummount. To update the value in firebase, call `doUpdate` with
   a function that takes the current value and returns the updated value.

   Before a connection to firebase is established, `currentValue` will
   be undefined, and `doUpdate` will be a no-op function. Once firebase
   is connected, the value will be updated to either null (if there's no
   value set for that path in firebase) or the value from firebase.

   example:
      const [greeting, updateGreeting] = useData("my/greetings/1");

      if (greeting === undefined) {
        return <CircularProgress />;
      }

      return (
        <Button onClick={() => updateGreeting(g => g + "!!")}>
          Click to add !! to your greeting: {greeting}
        </Button>
      )
 */
const dataStore = new Store({});
const setLocalData = (path, value) => {
  dataStore.update(s => {
    s[path] = value;
  });
};

const useData = path => {
  const user = useAuth();
  const localData = dataStore.useState(s => s[path]);
  const remoteData = user && database().ref(`users/${user.uid}/data/${path}`);

  useEffect(() => {
    if (user === null) {
      return setLocalData(path, undefined);
    }

    remoteData.on(
      "value",
      data => setLocalData(path, data.val()),
      _err => setLocalData(path, null)
    );

    return () => {
      remoteData.off("value");
    };
  }, [path, user, remoteData]);

  if (user === null) {
    return [undefined, noop];
  }

  return [localData, f => remoteData.transaction(f)];
};

export {useData};
