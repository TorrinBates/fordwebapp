import React from "react";
import { Route, Redirect } from "react-router-dom";

/*
You don't need to be logged on to view these routes and will be redirected to the dashboard when you successfully sign in.
*/
export default function UnauthenticatedRoute({ component: C, appProps, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        !appProps.isAuthenticated
          ? <C {...props} {...appProps} />
          : <Redirect to="/dashboard" />}
    />
  );
}