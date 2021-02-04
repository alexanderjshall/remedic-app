import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import DoctorChat from "../../Pages/DoctorChat/DoctorChat";
import PatientQueue from "../../Pages/PatientQueue/PatientQueue";

const DoctorApp = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/doctor_chat">
            <DoctorChat />
          </Route>
          <Route path="/patient_queue">
            <PatientQueue />
          </Route>
          <Route>
            <Redirect to="/patient_queue" />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default DoctorApp;
