import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import DoctorContextProvider from '../../../Contexts/Doctor.context';
import DoctorChat from "../../Pages/DoctorChat/DoctorChat";
import PatientQueue from "../../Pages/PatientQueue/PatientQueue";

const DoctorApp = () => {
  return (
    <DoctorContextProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/doctor/consultation">
            <DoctorChat />
          </Route>
          <Route exact path="/doctor/queue">
            <PatientQueue />
          </Route>
          <Route path="/login">
            <Redirect to="/doctor/queue" />
          </Route>
        </Switch>
      </BrowserRouter>
    </DoctorContextProvider>
  );
};

export default DoctorApp;
