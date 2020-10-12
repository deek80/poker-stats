import React from "react";
import ReactDOM from "react-dom";
import {CssBaseline} from "@material-ui/core";
import {ThemeProvider, createMuiTheme} from "@material-ui/core/styles";
import {lightBlue, deepPurple} from "@material-ui/core/colors";
import AppBar from "./components/AppBar";

const theme = createMuiTheme({
  palette: {
    primary: deepPurple,
    secondary: lightBlue,
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <AppBar />
  </ThemeProvider>,
  document.getElementById("root")
);
