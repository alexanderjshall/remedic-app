import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import ConsultationContextProvider from "../../../Contexts/Consultation.context";
import ConsultationChat from "../../Pages/ConsultationChat/ConsultationChat";
import EnterCode from "../../Pages/EnterCode/EnterCode";
import Feedback from "../../Pages/Feedback/Feedback";
import PatientLanding from "../../Pages/PatientLanding/PatientLanding";
import PatientSymptoms from "../../Pages/PatientSymptoms/PatientSymptoms";
import SymptomsChecker from "../../Pages/SymptomsChecker/SymptomsChecker";

const PatientApp = () => {
  return (
    <ConsultationContextProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/consultation_chat">
            <ConsultationChat />
          </Route>
          <Route exact path="/enter_code">
            <EnterCode />
          </Route>
          <Route exact path="/feedback">
            <Feedback />
          </Route>
          <Route exact path="/symptoms_checker">
            <SymptomsChecker />
          </Route>
          <Route exact path="/symptoms_physical">
            <PatientSymptoms />
          </Route>
          <Route exact path="/patient">
            <PatientLanding />
          </Route>
          <Redirect to="/patient" />
        </Switch>
      </BrowserRouter>
    </ConsultationContextProvider>
  );
};

export default PatientApp;
