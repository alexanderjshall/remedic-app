import React from 'react';
import { ConsultationInfo, BlankConsultation } from '../../../types';
import PatientCard from './PatientCard';

// Temporary mock array of consultations
const mockConsultations: ConsultationInfo[] = new Array(5).fill(BlankConsultation);
interface Props {}

function PatientQueue(props: Props) {

  return (
    <div className="flex items-center justify-content-center flex-col bg-white-dark h-screen">
      <h2 className="text-green-default font-title mt-24 mb-10">Patients waiting</h2>
      {mockConsultations.map(con =>
        <PatientCard
          patientName={con.patientID}
          painLevel={con.painLevel}
          startTime={con.date}
        />
      )}
    </div>
  )
}

export default PatientQueue
