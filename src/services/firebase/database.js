import {useEffect} from "react";
import {Store} from "pullstate";
import {database} from "./init";
import {useAuth} from "./auth";

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
      return setLocalData(path, null);
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
    return [null, () => {}];
  }

  return [localData, f => remoteData.transaction(f)];
};

export {useData};
