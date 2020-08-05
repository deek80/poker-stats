import React from "react";
import {makeStyles, Button, Paper} from "@material-ui/core";
import {signInWithGoogle, signOut, useAuth, useData} from "./services/firebase";

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1),
  },
}));

const StringDataTester = () => {
  const classes = useStyles();
  const user = useAuth();
  const [greeting, updateGreeting] = useData("greeting");

  return (
    <Paper className={classes.root}>
      <Button color="primary" variant="contained" onClick={signInWithGoogle}>
        Login
      </Button>
      <div>Logged in as: {user && user.email}</div>
      <div>Greeting: {greeting}</div>
      <Button
        onClick={() => {
          updateGreeting(r => r + "!");
        }}
      >
        Add !
      </Button>
      <Button color="secondary" variant="contained" onClick={signOut}>
        Logout
      </Button>
    </Paper>
  );
};

export default StringDataTester;
