import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import DoctorChat from "./Components/Pages/DoctorChat/DoctorChat";
import LanguageChoice from "./Components/Pages/LanguageChoice/LanguageChoice";
import Login from "./Components/Pages/Login/Login";
import Register from "./Components/Pages/Register/Register";

function App() {
  return (
    <div className="App h-screen">
      <BrowserRouter>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/language">
            <LanguageChoice />
          </Route>
          <Route path="/doctor_chat">
            <DoctorChat />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
