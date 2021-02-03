import React, { createContext, useState, ReactChild, useEffect } from 'react';
import { Symptom } from '../types';
import { fullPhysicalSymptoms } from './AllSymptoms';

export interface AppContextInterface {
  physicalSymptoms: Symptom[];
  toggleSymptomSelect: (symptom: Symptom) => void;
}

interface Props {
  children: ReactChild | ReactChild[]
}

export const ConsultationContext = createContext<AppContextInterface | null>(null);

// Consultation Context for patient info
const ConsultationContextProvider = (props: Props) => {
  //TODO create function that filters ALL symptoms [...] by .selected and sends to back-end

  const [ physicalSymptoms, setSymptoms ] = useState<Symptom[]>([]);

  useEffect(() => {
    setSymptoms(fullPhysicalSymptoms);
  }, [])

  const toggleSymptomSelect = (symptom: Symptom): void => {
    
    const alteredSymptoms = physicalSymptoms.map((s) => {
      
      if(symptom.symptom === s.symptom) s.selected = !s.selected;
      return s;
    });
    setSymptoms(alteredSymptoms);
    console.log(alteredSymptoms)
  }
  
  return (
    <ConsultationContext.Provider value={{physicalSymptoms, toggleSymptomSelect}}>
      {props.children}
    </ConsultationContext.Provider>
  );
}

export default ConsultationContextProvider;
