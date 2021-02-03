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
import PatientSymptoms from "./Components/Pages/PatientSymptoms/PatientSymptoms";
import PatientQueue from "./Components/Pages/PatientQueue/PatientQueue";
import SymptomsChecker from "./Components/Pages/SymptomsChecker/SymptomsChecker";

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
          <Route path="/doctor/consultation">
            <DoctorChat />
          </Route>
          <Route path="/consultation/symptoms">
            <PatientSymptoms />
          </Route>
          <Route path="/consultation/chat">
            <ConsultationChat />
          </Route>
          <Route path="/doctor/queue">
            <PatientQueue />
          </Route>
          <Route path="/consultation/rating">
            <Feedback />
          </Route>
          <Route path="/symptoms_checker">
            <SymptomsChecker />
          </Route>
          {/* Default redirect */}
          <Route path="*">
            <LanguageChoice />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
