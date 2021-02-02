import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import DoctorChat from "./Components/Pages/DoctorChat/DoctorChat";
import ConsultationChat from "./Components/Pages/ConsultationChat/ConsultationChat";
import EnterCode from "./Components/Pages/EnterCode/EnterCode";
import Feedback from "./Components/Pages/Feedback/Feedback";
import LanguageChoice from "./Components/Pages/LanguageChoice/LanguageChoice";
import Login from "./Components/Pages/Login/Login";
import PatientLanding from "./Components/Pages/PatientLanding/PatientLanding";
import Register from "./Components/Pages/Register/Register";
import PatientQueue from './Components/Pages/PatientQueue/PatientQueue'

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
          <Route path="/doctor_chat">
            <DoctorChat />
          </Route>
          <Route path="/consultation_chat">
            <ConsultationChat />
          </Route>
          <Route path="/doctor/queue">
            <PatientQueue />
          </Route>
          <Route path="/consultation_end">
            <Feedback />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
