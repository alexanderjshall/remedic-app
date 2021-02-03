import React, { createContext, useState, ReactChild } from 'react';
import { Symptom } from '../types';
import { physicalSymptoms } from './AllSymptoms';

export interface AppContextInterface {
  symptoms: Symptom[];
  toggleSymptomSelect: (symptom: Symptom) => void;
}

interface Props {
  children: ReactChild | ReactChild[]
}

export const ConsultationContext = createContext<AppContextInterface | null>(null);

// Consultation Context for patient info
const ConsultationContextProvider = (props: Props) => {
  const [ symptoms, setSymptoms ] = useState<Symptom[]>(physicalSymptoms);

  const toggleSymptomSelect = (symptom: Symptom): void => {
    
    const alteredSymptoms = symptoms.map((s) => {
      s.selected = symptom.symptom === s.symptom && !symptom.selected;
      return s;
    });
    symptom.selected = !symptom.selected;
    setSymptoms(alteredSymptoms);
    console.log(alteredSymptoms)
  }
  
  return (
    <ConsultationContext.Provider value={{symptoms, toggleSymptomSelect}}>
      {props.children}
    </ConsultationContext.Provider>
  );
}

export default ConsultationContextProvider;
