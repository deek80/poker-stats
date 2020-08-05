import React from "react";
import {Avatar, IconButton, makeStyles} from "@material-ui/core";
import {PersonAdd} from "@material-ui/icons";
import {signInWithGoogle, signOut, useAuth} from "../services/firebase";
import {getInitials} from "../util";

const useStyles = makeStyles(theme => ({
  avatar: {
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.secondary.main,
  },
}));

const LoginButton = () => {
  const user = useAuth();
  const classes = useStyles();
  return (
    <IconButton size="small" onClick={user ? signOut : signInWithGoogle}>
      <Avatar className={classes.avatar}>
        {user ? getInitials(user.displayName) : <PersonAdd />}
      </Avatar>
    </IconButton>
  );
};

export default LoginButton;
