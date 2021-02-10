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
    <div className="flex items-center flex-col bg-white-dark h-full w-full">
      <div className="text-center mt-24 mb-10 px-3 w-4/5 bg-white max-w-4xl rounded-xl p-8 min-h-3/4 max-h-3/4 overflow-y-auto">
        <div className="fixed tablet:top-8 top-4 left-0 w-full">
          <h2 className="text-blue tablet:text-3xl text-2xl font-bold">
            You have {consultations?.length} patients waiting:
          </h2>
        </div>
        <div className="flex flex-col-reverse w-full items-center last:mb-8 first:mb-8">
          {consultations.map((consultation, i) => (
            <button
              onClick={() => handleClick(consultation)}
              key={i}
              className="tablet:w-3/4 w-full"
            >
              <PatientCard
                patientName={`${consultation.patientId.firstName} ${consultation.patientId.lastName}`}
                painLevel={consultation.painLevel}
                startTime={consultation.consultationDate}
                isEven={i % 2 === 0}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PatientQueue;
