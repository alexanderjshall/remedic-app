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
import PatientQueue from "./Components/Pages/PatientQueue/PatientQueue";
import UnAuthApp from "./Components/Globals/Apps/UnAuthApp";
import DoctorApp from "./Components/Globals/Apps/DoctorApp";
import PatientApp from "./Components/Globals/Apps/PatientApp";

interface User {
  isDoctor: boolean;
  id: number;
  lang: string;
}

function App() {
  const user: User | null = { isDoctor: false, id: 2, lang: "en" };

  return (
    <div className="App h-screen">
      {!user && <UnAuthApp />}
      {user && user.isDoctor && <DoctorApp />}
      {user && !user.isDoctor && <PatientApp />}
    </div>
  );
}

export default App;
