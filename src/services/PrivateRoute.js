import React from "react";
import { Route, Redirect } from "react-router-dom";
import { LOGIN } from "../constants";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  const loggedIn = useSelector(state => state.user.userAuth);

  return (
    <Route
      {...rest}
      render={props => {
        if (loggedIn === null) return <h1>Loading...</h1>;
        return loggedIn ? <Component {...props} /> : <Redirect to={LOGIN} />;
      }}
    />
  );
};

export default PrivateRoute;
