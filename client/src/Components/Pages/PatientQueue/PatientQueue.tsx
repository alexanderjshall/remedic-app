import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Contexts/Auth.context';
import PatientCard from './PatientCard';
import DoctorContextProvider, { DoctorContext } from '../../../Contexts/Doctor.context';
import queries from '../../../services/graphqlService/queries';
import client from '../../../services/graphqlService/index';
import { ConsultationInfo } from '../../../types';
import { useHistory } from "react-router-dom";


// Temporary mock array of consultations
interface Props {}

function PatientQueue(props: Props) {
  const { consultations, updateCurrentConsultation } = useContext(DoctorContext)!;
  // const [ activeConsultations, setConsultations ] = useState<ConsultationInfo[] | null>(null);
  const { user } = useContext(AuthContext);
  let history = useHistory();

  // TODO: filter inactive consultations and sort by startTime
  // useEffect (() => {
  //   let updatedConsultations = consultations.getDoctorConsultations
  //                               .filter(con => con.isActive)
  //                               .sort((a, b) => (a.consultationDate > b.consultationDate ? -1 : 1));
  //   setConsultations(updatedConsultations);
  // }, [consultations])

  const handleClick = (consultation: ConsultationInfo) => {
    updateCurrentConsultation(consultation);
    history.push('/doctor/consultation');
  }

  return (
    <div className="flex items-center justify-content-center flex-col bg-white-dark h-screen">
      <h2 className="text-green-default font-title mt-24 mb-10">Patients waiting</h2>
      {consultations?.getDoctorConsultations?.map((consultation, i) =>
        <button onClick={() => handleClick(consultation)} key={i}>
          <PatientCard
            patientName={consultation.patientId.firstName}
            painLevel={consultation.painLevel}
            startTime={consultation.consultationDate}
          />
        </button>
      )}
    </div>
  )
}

export default PatientQueue
