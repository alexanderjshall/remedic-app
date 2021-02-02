import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import ConsultationChat from "./Components/Pages/ConsultationChat/ConsultationChat";
import LanguageChoice from "./Components/Pages/LanguageChoice/LanguageChoice";
import Login from "./Components/Pages/Login/Login";
import Register from "./Components/Pages/Register/Register";
import PatientQueue from './Components/Pages/PatientQueue/PatientQueue'

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
          <Route path="/consultation_chat">
            <ConsultationChat />
          </Route>
          <Route path="/doctor/queue">
            <PatientQueue />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
