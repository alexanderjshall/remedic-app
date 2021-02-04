import React, { createContext, ReactChild, useContext, useEffect, useState } from 'react';
import { ConsultationInfo } from '../types';
import { AuthContext } from './Auth.context';
import queries from '../services/graphqlService/queries';
import client from '../services/graphqlService/index';
import { useQuery } from 'react-query';
export interface AppContextInterface {
  consultations: {
    getDoctorConsultations: ConsultationInfo[]
  };
  currentConsultation: ConsultationInfo | null;
  updateCurrentConsultation: (consultation: ConsultationInfo) => void;
}
interface Props {
  children: ReactChild | ReactChild[];
}

export const DoctorContext = createContext<AppContextInterface | null>(null);

// Doctor context for list of active consultations
function DoctorContextProvider(props: Props) {
  const { user } = useContext(AuthContext);
  const [currentConsultation, setCurrentConsultation] = useState<ConsultationInfo | null>(null);

  const {data} = useQuery(
    'get consultations',
    async () => await client.request(queries.getDoctorConsultations, {id: user?.id}),
    {enabled: !!user})

    const updateCurrentConsultation = (consultation: ConsultationInfo) => {
      setCurrentConsultation(consultation);
    }
  return (
    <DoctorContext.Provider value={{consultations: data, currentConsultation, updateCurrentConsultation}}>
      {props.children}
    </DoctorContext.Provider>
  )
}

export const useDrContext = () => useContext(DoctorContext);

export default DoctorContextProvider
