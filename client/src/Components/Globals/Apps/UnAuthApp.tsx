import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import LanguageChoice from "../../Pages/LanguageChoice/LanguageChoice";
import Login from "../../Pages/Login/Login";
import Register from "../../Pages/Register/Register";

const UnAuthApp = () => {
  return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/language">
            <LanguageChoice />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/">
            <Redirect to="/language" />
          </Route>
        </Switch>
      </BrowserRouter>
  );
};

export default UnAuthApp;
