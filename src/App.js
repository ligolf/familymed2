import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import { SecureRoute, ImplicitCallback } from "@okta/okta-react";
import { CssBaseline, withStyles } from "@material-ui/core";

import AppHeader from "./components/AppHeader";
import Home from "./pages/Home";
import PostsManager from "./pages/PostsManager";
import Doctors from "./pages/Doctors";
import Prescriptions from "./pages/Prescriptions";
import Notes from "./pages/Notes";
import History from "./pages/History";

const styles = theme => ({
  main: {
    padding: 3 * theme.spacing.unit,
    [theme.breakpoints.down("xs")]: {
      padding: 2 * theme.spacing.unit
    }
  }
});


const App = ({ classes }) => (
  <Fragment>
    <CssBaseline />
    <AppHeader />
    <main className={classes.main}>
      <Route exact path="/" component={Home} />{" "}
      <SecureRoute exact path="/posts" component={PostsManager} />{" "}
      <SecureRoute exact path="/doctors" component={Doctors} />{" "}
      <SecureRoute exact path="/prescriptions" component={Prescriptions} />{" "}
      <SecureRoute exact path="/notes" component={Notes} />{" "}
      <SecureRoute exact path="/history" component={History} />{" "}
      <Route path="/implicit/callback" component={ImplicitCallback} />{" "}
    </main>{" "}
  </Fragment>
);

export default withStyles(styles)(App);
