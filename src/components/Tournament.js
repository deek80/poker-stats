import React from "react";
import {useData} from "../services/firebase";
import {CircularProgress, Button, Typography} from "@material-ui/core";
import {scoreboard} from "../util";

const Tournament = () => {
  const [data, updateData] = useData("t/sng/45/3-50");
  const reset = () => {
    updateData(() => scoreboard(7));
  };

  if (data === undefined) {
    return <CircularProgress />;
  }

  return (
    <>
      <Button onClick={reset}>Reset</Button>
      <Typography>Current: {JSON.stringify(data)}</Typography>
    </>
  );
};

export default Tournament;
