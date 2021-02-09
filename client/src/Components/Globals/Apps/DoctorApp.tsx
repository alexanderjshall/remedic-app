import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import DoctorContextProvider from "../../../Contexts/Doctor.context";
import DoctorChat2 from "../../Pages/DoctorChat/DoctorChat2";
import PatientQueue from "../../Pages/PatientQueue/PatientQueue";

const DoctorApp = () => {
  return (
    <DoctorContextProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/doctor/consultation">
            <DoctorChat2 />
          </Route>
          <Route exact path="/doctor/queue">
            <PatientQueue />
          </Route>
          <Redirect to="/doctor/queue" />
        </Switch>
      </BrowserRouter>
    </DoctorContextProvider>
  );
};

export default DoctorApp;
