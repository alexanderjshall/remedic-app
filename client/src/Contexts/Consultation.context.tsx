import React, { createContext, useState, ReactChild, useEffect, useContext } from 'react';
import { useMutation } from 'react-query';
import client from '../services/graphqlService';
import mutations from '../services/graphqlService/mutations';
import { Symptom } from '../types';
import { AuthUser } from '../utils/auth/auth.helper';
import { fullPhysicalSymptoms, fullGeneralSymptoms } from './AllSymptoms';
import { AuthContext } from './Auth.context';

export interface AppContextInterface {
  physicalSymptoms: Symptom[];
  generalSymptoms: Symptom[];
  togglePhysicalSymptomSelect: (symptom: Symptom) => void;
  toggleGeneralSymptomSelect: (symptom: Symptom, isSelected: boolean) => void;
  changePainLevel: (painLevel: number) => void;
  updateDoctorId: (id: number) => void;
  confirmConsultation: () => void;
}

interface Props {
  children: ReactChild | ReactChild[]
}

interface SelectedSymptom {
  area: string;
  symptom: string;
}

interface NewConsultation {
  date: string;
  symptomsByArea: SelectedSymptom[];
  painLevel: number;
  patientNotes?: string;
  patientId: number;
  doctorId: number;
}

// consultationDate - autogenerate on send.
// symptomsByArea - partially done. Need to add 'Global' area
// painLevel
// patientId - get from auth context
// doctorId (doctor ID === ENTER CODE)

export const ConsultationContext = createContext<AppContextInterface | null>(null);

// Consultation Context for patient info
const ConsultationContextProvider = (props: Props) => {
  const { user }  = useContext(AuthContext); // user user.id for patientId
  //TODO store doctorID from enter code

  // Symptom states
  const [ physicalSymptoms, setSymptoms ] = useState<Symptom[]>([]);
  const [ generalSymptoms, setGeneralSymptoms ] = useState<Symptom[]>([]);
  // const [ psychSymptoms, setPsychSymptoms ] = useState<Symptom[]>([]);

  // pain level state
  const [painLevel, setPainLevel] = useState<number>(0);

  // ID states
  const [doctorId, setDoctorId] = useState<number>(1); // doctor code for socket IO
  const [consultationId, setConsultationId] = useState<number>() // consultation code for socket IO
  console.log('generalSymptomCheck', generalSymptoms);

  useEffect(() => {
    setSymptoms(fullPhysicalSymptoms);
    setGeneralSymptoms(fullGeneralSymptoms);
  }, [])

  const togglePhysicalSymptomSelect = (symptom: Symptom): void => {
    const alteredSymptoms = physicalSymptoms.map((s) => {
      
      if(symptom.symptom === s.symptom) s.selected = !s.selected;
      return s;
    });
    setSymptoms(alteredSymptoms);
  }

  const toggleGeneralSymptomSelect = (symptom: Symptom, isSelected: boolean): void => {
    const alteredSymptoms = generalSymptoms.map((s) => {
      
      if(symptom.symptom === s.symptom) s.selected = isSelected;
      return s;
    });
    setGeneralSymptoms(alteredSymptoms);
    console.log('general symptoms', generalSymptoms)
  }
  
  const changePainLevel = (painLevel: number): void => {
    setPainLevel(painLevel);
  }

  const updateDoctorId = (id: number): void => {
    setDoctorId(id);
  }

  const filterSelectedSymptoms = (symptoms: Symptom[]): SelectedSymptom[] => {
    // Removes selected symptoms, and groups symptoms by area together.
      const selected: SelectedSymptom[] = symptoms.reduce((acc: SelectedSymptom[], sym: Symptom) => {
        if (sym.selected) {
          const index = acc.findIndex(item => item.area === sym.area)
          if (index > -1 ) acc[index].symptom += (', ' + sym.symptom);
          else acc.push({area: sym.area, symptom: sym.symptom});
        }
        return acc;
      },[])
      console.log('reduced', selected);

      return selected;
    }


    const mutation = useMutation('create consultation', async (variables: NewConsultation) => await client.request(mutations.createConsultation, variables), {
      onSuccess: (data) => setConsultationId(data.addConsultation.id)
    });
    if(mutation.isSuccess) console.log(mutation.data);
    

    const confirmConsultation = () => {
    // filter and bundle the general and physical sypmtoms
      const selectedSypmtoms = filterSelectedSymptoms([...physicalSymptoms, ...generalSymptoms]);
      // create consultation object
      console.log('selected symptoms', selectedSypmtoms)
      const consultation: NewConsultation = {
        date: new Date().toISOString(),
        symptomsByArea: selectedSypmtoms,
        painLevel: painLevel,
        patientId: user!.id,
        patientNotes: '',
        doctorId: doctorId
      }
      // send to backend
      mutation.mutate(consultation);
    }
  
  return (
    <ConsultationContext.Provider 
      value={{
        physicalSymptoms, generalSymptoms, togglePhysicalSymptomSelect, 
        toggleGeneralSymptomSelect, changePainLevel, updateDoctorId,
        confirmConsultation
      }}
    >
      {props.children}
    </ConsultationContext.Provider>
  );
}

export default ConsultationContextProvider;
