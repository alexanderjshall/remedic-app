import React from "react";
import { ConsultationInfo, BlankConsultation } from "../../../types";
import PatientCard from "./PatientCard";

// Temporary mock array of consultations
const mockConsultations: ConsultationInfo[] = new Array(5).fill(
  BlankConsultation
);
interface Props {}

function PatientQueue(props: Props) {
  return (
    <div className="flex items-center justify-content-center flex-col bg-white-dark h-screen">
      <div className=" text-center mt-24 mb-10 px-3">
        <h2 className="text-green text-3xl font-bold">
          You have {mockConsultations.length} patients waiting:
        </h2>
      </div>
      {mockConsultations.map((con) => (
        <PatientCard
          patientName={con.patientID}
          painLevel={con.painLevel}
          startTime={con.date}
        />
      ))}
    </div>
  );
}

export default PatientQueue;
