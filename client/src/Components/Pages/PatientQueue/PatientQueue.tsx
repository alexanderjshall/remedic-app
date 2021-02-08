import React from "react";
import PatientCard from "./PatientCard";
import { useDrContext } from "../../../Contexts/Doctor.context";
import { ConsultationInfo } from "../../../types";
import { useHistory } from "react-router-dom";

function PatientQueue() {
  const { consultations, updateCurrentConsultation } = useDrContext();
  let history = useHistory();

  const handleClick = (consultation: ConsultationInfo) => {
    updateCurrentConsultation(consultation);
    history.push("/doctor/consultation");
  };

  return (
    <div className="flex items-center justify-content-center flex-col bg-white-dark h-screen">
      <div className=" text-center mt-24 mb-10 px-3">
      <h2 className="text-blue text-3xl font-bold">
          You have {consultations?.length} patients waiting:
        </h2>
      {consultations.map((consultation, i) =>
        <button
        onClick={() => handleClick(consultation)}
        key={i}
        className="w-3/4"
        >
          <PatientCard
            patientName={consultation.patientId.firstName}
            painLevel={consultation.painLevel}
            startTime={consultation.consultationDate}
          />
        </button>
      )}
        </div>
    </div>
  );
}

export default PatientQueue;
