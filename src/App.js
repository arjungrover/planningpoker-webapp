import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PrivateRoute from "./services/PrivateRoute";
import PublicRoute from "./services/PublicRoute";
import PageNotFoundContainer from "./containers/PageNotFoundContainer";
import HomeContainer from "./containers/HomeContainer";
import LoginContainer from "./containers/LoginContainer";
import {
  DASHBOARD,
  VERIFY,
  LOGIN,
  CREATE_POKERBOARD,
  POKERBOARD,
  INVITE_REQUEST,
  SETTINGS,
  USER_GRAPH,
  SIGNUP
} from "./constants";
import UserVerified from "./components/UserVerified";
import Dashboard from "./containers/DashboardContainer";
import CreatePokerBoardComponent from "./components/CreatePokerBoardComponent";
import NavbarComponent from "./components/NavbarComponent";
import InviteComponent from "./components/InviteComponent";
import PokerBoardComponent from "./components/PokerBoardComponent";
import PokerBoardSettingsComponent from "./components/PokerBoardSettingsComponent";
import UserGraphComponent from "./components/UserGraphComponent";
import { connect } from "react-redux";
import { loadUser } from "./actions/loadUser";
import SignUpComponent from "./components/SignUpComponent";

function App(props) {

  useEffect(() => {
    props.loadUser();
  }, []);

  return (
    <BrowserRouter>
      <NavbarComponent />
      <Switch>
        <PublicRoute exact path="/" component={HomeContainer} />
        <PublicRoute exact path={LOGIN} component={LoginContainer} />
        <PublicRoute exact path={SIGNUP} component={SignUpComponent} />
        <PrivateRoute exact path={USER_GRAPH} component={UserGraphComponent} />
        <Route exact path={INVITE_REQUEST} component={InviteComponent} />
        <PrivateRoute
          exact
          path={`${SETTINGS}/:name`}
          component={PokerBoardSettingsComponent}
        />
        <PrivateRoute exact path={DASHBOARD} component={Dashboard} />
        <PrivateRoute
          exact
          path={CREATE_POKERBOARD}
          component={CreatePokerBoardComponent}
        />
        <PrivateRoute
          exact
          path={`${POKERBOARD}:name`}
          component={PokerBoardComponent}
        />
        <Route exact path={VERIFY} component={UserVerified} />
        <Route component={PageNotFoundContainer} />
      </Switch>
    </BrowserRouter>
  );
}

export default  connect(null, { loadUser })(App);
