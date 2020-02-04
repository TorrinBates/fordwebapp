import React from "react";
import { Route, Switch } from "react-router-dom";
import SignIn from './signin';
import Dash from './dash';
import PageNotFound from "./PageNotFound";
import AuthenticatedRoute from "./AuthenticatedRoute";
import UnauthenticatedRoute from "./UnauthenticatedRoute";

export default function Routes({ appProps }) {
  return (
    <Switch>
        <UnauthenticatedRoute path="/login" component={SignIn} appProps={appProps}/>
        <AuthenticatedRoute path="/dashboard" component={Dash} appProps={appProps}/>
        <Route component={PageNotFound} />
    </Switch>
  );
}