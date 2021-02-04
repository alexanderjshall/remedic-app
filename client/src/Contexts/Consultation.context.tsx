import React, { createContext, useState, ReactChild, useEffect, useContext } from 'react';
import { Symptom } from '../types';
import { AuthUser } from '../utils/auth/auth.helper';
import { fullPhysicalSymptoms } from './AllSymptoms';
import { AuthContext } from './Auth.context';

export interface AppContextInterface {
  physicalSymptoms: Symptom[];
  toggleSymptomSelect: (symptom: Symptom) => void;
  filterSelectedSymtoms: (symptoms: Symptom[]) => void;
}

interface Props {
  children: ReactChild | ReactChild[]
}

interface SelectedSymptom {
  area: string;
  symptom: string;
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
  // const [ generalSymptoms, setGeneralSymptoms ] = useState<Symptom[]>([]);
  // const [ psychSymptoms, setPsychSymptoms ] = useState<Symptom[]>([]);

  // pain level state
  const [painLevel, setPainLevel] = useState<number>(0);

  // ID states
  const [doctorId, setDoctorId] = useState<number>(0); 
  // query({docCode: '00000'}) --> returns {id, fn, ln}
  

  useEffect(() => {
    setSymptoms(fullPhysicalSymptoms);
  }, [])

  // const codeSubmited ('code') => SetdoctorId


  const toggleSymptomSelect = (symptom: Symptom): void => {
    const alteredSymptoms = physicalSymptoms.map((s) => {
      
      if(symptom.symptom === s.symptom) s.selected = !s.selected;
      return s;
    });
    setSymptoms(alteredSymptoms);
  }
  
  const changePainLevel = (painLevel: number): void => {
    setPainLevel(painLevel);
  }

  const filterSelectedSymtoms = (symptoms: Symptom[]): void => {
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
      
      //todo send this to BE on user completing the consultation.
      return;
    }

  
  return (
    <ConsultationContext.Provider value={{physicalSymptoms, toggleSymptomSelect, filterSelectedSymtoms}}>
      {props.children}
    </ConsultationContext.Provider>
  );
}

export default ConsultationContextProvider;
