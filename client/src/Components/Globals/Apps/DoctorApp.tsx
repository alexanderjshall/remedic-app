import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import DoctorChat from "../../Pages/DoctorChat/DoctorChat";
import PatientQueue from "../../Pages/PatientQueue/PatientQueue";

const DoctorApp = () => {
  return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/doctor_chat">
            <DoctorChat />
          </Route>
          <Route exact path="/patient_queue">
            <PatientQueue />
          </Route>
          <Route path="/login">
            <Redirect to="/patient_queue" />
          </Route>
        </Switch>
      </BrowserRouter>
  );
};

export default DoctorApp;
