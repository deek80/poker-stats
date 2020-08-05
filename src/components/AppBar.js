import React from "react";
import {
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  makeStyles,
} from "@material-ui/core";
import LoginButton from "./LoginButton";

const useStyles = makeStyles({
  grow: {
    flexGrow: 1,
  },
});

const AppBar = () => {
  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <MuiAppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.grow}>
            Tournament
          </Typography>
          <LoginButton />
        </Toolbar>
      </MuiAppBar>
    </div>
  );
};

export default AppBar;
