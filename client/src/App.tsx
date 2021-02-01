import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import ConsultationChat from "./Components/Pages/ConsultationChat/ConsultationChat";
import EnterCode from "./Components/Pages/EnterCode/EnterCode";
import LanguageChoice from "./Components/Pages/LanguageChoice/LanguageChoice";
import Login from "./Components/Pages/Login/Login";
import PatientLanding from "./Components/Pages/PatientLanding/PatientLanding";
import Register from "./Components/Pages/Register/Register";

function App() {
  return (
    <div className="App h-screen">
      <BrowserRouter>
        <Switch>
          <Route path="/language">
            <LanguageChoice />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/patient">
            <PatientLanding />
          </Route>
          <Route path="/start">
            <EnterCode />
          </Route>
          <Route path="/consultation_chat">
            <ConsultationChat />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
