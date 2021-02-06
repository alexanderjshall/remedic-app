import React, { createContext, ReactChild, useContext, useState } from 'react';
import { ConsultationInfo } from '../types';
import { AuthContext } from './Auth.context';
import queries from '../services/graphqlService/queries';
import client from '../services/graphqlService/index';
import { useMutation, useQuery, UseMutationResult } from 'react-query';
import mutations from '../services/graphqlService/mutations';

export interface AppContextInterface {
  consultations: ConsultationInfo[];
  currentConsultation: ConsultationInfo;
  doctorNotes: string;
  setDoctorNotes: React.Dispatch<React.SetStateAction<string>>;
  editConsultation:  UseMutationResult<any, unknown, void, unknown>;
  updateCurrentConsultation: (consultation: ConsultationInfo) => void;
}

interface Props {
  children: ReactChild | ReactChild[];
}

const emptyConsultationList: ConsultationInfo[] = [];

const initialContext = {
  consultations: emptyConsultationList,
  currentConsultation: {} as ConsultationInfo,
  doctorNotes: '',
  setDoctorNotes: () => {},
  editConsultation: {} as UseMutationResult<any, unknown, void, unknown>,
  updateCurrentConsultation: (consultation: ConsultationInfo) => {}
}

export const DoctorContext = createContext<AppContextInterface>(initialContext);

// Doctor context for list of active consultations
function DoctorContextProvider(props: Props) {
  const { user } = useContext(AuthContext);
  const [currentConsultation, setCurrentConsultation] = useState<ConsultationInfo>({} as ConsultationInfo);
  const [consultations, setConsultations] = useState<ConsultationInfo[]>([]);
  const [doctorNotes, setDoctorNotes] = useState<string>('');
 
  const { data } = useQuery(
    'get active consultations',
    async () => await client.request(queries.getActiveConsultations, {id: user?.id, isActive: true}),
      {
        enabled: !!user,
        onSuccess: (data) => {
          // sort the consultations by date
          data.getActiveConsultations.sort((a: ConsultationInfo, b:ConsultationInfo) => Date.parse(a.consultationDate) - Date.parse(b.consultationDate));
          setConsultations(data.getActiveConsultations); // set consultations
        }
      });

  const editConsultation = useMutation(
    ['end consultation', currentConsultation?.id], 
    async () => {
      return await client.request(mutations.updateConsultation, {
        id: currentConsultation.id,
        isActive: false,
        doctorNotesOriginal: doctorNotes
      })}, {
      onSuccess: (data) => {
        // filter out the completed consultation from the patient queue.
        setConsultations((prev) => prev.filter(c => c.id !== data.updateConsultation.id));
        setDoctorNotes(''); // erase the notes so we start afresh.
      }
    });
  
  const updateCurrentConsultation = (consultation: ConsultationInfo) => setCurrentConsultation(consultation);


  return (
    <DoctorContext.Provider value={{
        consultations,
        currentConsultation,
        doctorNotes,
        setDoctorNotes,
        editConsultation, 
        updateCurrentConsultation
      }}
      >
      {props.children}
    </DoctorContext.Provider>
  )
}

export const useDrContext = () => useContext(DoctorContext);

export default DoctorContextProvider;