import React from "react";
import { Route, Redirect } from "react-router-dom";

/*
You must be logged in (.isAuthenticated = true) to view these pages otherwise you will be redirected to the login screen.
*/
export default function AuthenticatedRoute({ component: C, appProps, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        appProps.isAuthenticated
          ? <C {...props} {...appProps} />
          : <Redirect
              to={`/login?redirect=${props.location.pathname}${props.location
                .search}`}
            />}
    />
  );
}