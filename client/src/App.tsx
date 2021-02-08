import React from "react";
import UnAuthApp from "./Components/Globals/Apps/UnAuthApp";
import DoctorApp from "./Components/Globals/Apps/DoctorApp";
import PatientApp from "./Components/Globals/Apps/PatientApp";
import { useAuth } from "./Contexts/Auth.context";

function App() {
  const { user } = useAuth();

  return (
    <div className="App h-screen">
      {
        user !== undefined &&
        <>
          {!user && <UnAuthApp />}
          {user && user.isDoctor && <DoctorApp />}
          {user && !user.isDoctor && <PatientApp />}
        </>
      }
    </div>
  );
}

export default App;
