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
    <div>
    <div className="flex items-center justify-content-center flex-col bg-white-dark h-screen">
      <div className=" text-center mt-24 mb-10 px-3">
      <h2 className="text-green text-3xl font-bold">
          You have {consultations?.getDoctorConsultations?.length} patients waiting:
        </h2>
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
      </div>

    </div>
  );
}

export default PatientQueue;
