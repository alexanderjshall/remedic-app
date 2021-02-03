import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LanguageChoice from "../../Pages/LanguageChoice/LanguageChoice";
import Login from "../../Pages/Login/Login";
import Register from "../../Pages/Register/Register";

const UnAuthApp = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/language_choice" default>
            <LanguageChoice />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default UnAuthApp;
