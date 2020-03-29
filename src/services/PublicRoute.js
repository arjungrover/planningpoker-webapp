import React from "react";
import { Route, Redirect } from "react-router-dom";
import { DASHBOARD } from "../constants";
import { useSelector } from "react-redux";

const PublicRoute = ({ component: Component, auth, ...rest }) => 
{
  const loggedIn = useSelector(state => state.user.userAuth);

  return (
  <Route
    {...rest}
    render={props => (
      loggedIn ? (
          <Redirect to={DASHBOARD} />
          ) : (
            <Component {...props} />
        )
    )}
  />
)};


export default PublicRoute;
