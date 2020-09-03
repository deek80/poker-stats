import React from "react";
import {useData} from "../services/firebase";
import {CircularProgress, Button, Typography} from "@material-ui/core";
import {Tournament} from "../util/tournament";

export default () => {
  const [data, updateData] = useData("t/sng/45/350");
  const reset = () => {
    const sng45 = new Tournament({
      cost: 3.5,
      payouts: {
        1: 44.53,
        2: 30.86,
        3: 23.68,
        4: 17.94,
        5: 12.91,
        6: 8.61,
        7: 5.02,
      },
    });

    console.log("data is:", sng45.data);

    updateData(() => sng45.data);
  };

  const set = () => {
    updateData(() => ({hey: 1234}));
  };

  if (data === undefined) {
    return <CircularProgress />;
  }

  return (
    <>
      <Button onClick={reset}>Reset</Button>
      <Button onClick={set}>Stuff</Button>
      <Typography>Current: {JSON.stringify(data)}</Typography>
    </>
  );
};
