import React from "react";
import {
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  makeStyles,
} from "@material-ui/core";
import LoginButton from "./LoginButton";
import {useData} from "../services/firebase";

const useStyles = makeStyles({
  grow: {
    flexGrow: 1,
  },
});

const AppBar = () => {
  const classes = useStyles();

  const [value, ref] = useData("test");

  return (
    <div className={classes.grow}>
      <MuiAppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            className={classes.grow}
            onClick={() => {
              ref.transaction(v => v + 1);
            }}
          >
            Tournament {value}
          </Typography>
          <LoginButton />
        </Toolbar>
      </MuiAppBar>
    </div>
  );
};

export default AppBar;
