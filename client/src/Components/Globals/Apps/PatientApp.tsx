import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import ConsultationContextProvider from "../../../Contexts/Consultation.context";
import PatientContextProvider from "../../../Contexts/Patient.context";
import ConsultationChat from "../../Pages/ConsultationChat/ConsultationChat";
import EnterCode from "../../Pages/EnterCode/EnterCode";
import Feedback from "../../Pages/Feedback/Feedback";
import FurtherSymptoms from "../../Pages/FurtherSymptoms/FurtherSymptoms";
import PatientLanding from "../../Pages/PatientLanding/PatientLanding";
import PatientSymptoms from "../../Pages/PatientSymptoms/PatientSymptoms";
import PsychSymptoms from "../../Pages/PsychSymptoms/PsychSymptoms";
import Services from "../../Pages/Services/Services";
import SymptomsChecker from "../../Pages/SymptomsChecker/SymptomsChecker";

const PatientApp = () => {
  return (
    <PatientContextProvider>
      <ConsultationContextProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/patient_landing">
              <PatientLanding />
            </Route>
            <Route exact path="/consultation/enter_code">
              <EnterCode />
            </Route>
            <Route exact path="/consultation/symptoms/general">
              <SymptomsChecker />
            </Route>
            <Route exact path="/consultation/symptoms/physical">
              <PatientSymptoms />
            </Route>
            <Route exact path="/consultation/symptoms/psychological">
              <PsychSymptoms />
            </Route>
            <Route exact path="/consultation/symptoms/further">
              <FurtherSymptoms />
            </Route>
            <Route exact path="/consultation/chat">
              <ConsultationChat />
            </Route>
            <Route exact path="/consultation/feedback">
              <Feedback />
            </Route>
            <Route exact path="/patient/services">
              <Services />
            </Route>
            <Redirect to="/patient_landing" />
          </Switch>
        </BrowserRouter>
      </ConsultationContextProvider>
    </PatientContextProvider>
  );
};

export default PatientApp;
