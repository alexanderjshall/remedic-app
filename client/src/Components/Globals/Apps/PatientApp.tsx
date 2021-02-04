import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import ConsultationContextProvider from "../../../Contexts/Consultation.context";
import ConsultationChat from "../../Pages/ConsultationChat/ConsultationChat";
import EnterCode from "../../Pages/EnterCode/EnterCode";
import Feedback from "../../Pages/Feedback/Feedback";
import PatientLanding from "../../Pages/PatientLanding/PatientLanding";
import SymptomsChecker from "../../Pages/SymptomsChecker/SymptomsChecker";

const PatientApp = () => {
  return (
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
            <ConsultationContextProvider>
              <SymptomsChecker />
            </ConsultationContextProvider>
          </Route>
          <Route exact path="/patient">
            <PatientLanding />
          </Route>
          <Route path="/login">
            <Redirect to="/patient" />
          </Route>
        </Switch>
      </BrowserRouter>
  );
};

export default PatientApp;
