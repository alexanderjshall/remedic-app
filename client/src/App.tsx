import React from "react";
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
