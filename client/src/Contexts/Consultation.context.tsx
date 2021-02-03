import React, { createContext, useState, ReactChild, useEffect } from 'react';
import { Symptom } from '../types';
import { fullPhysicalSymptoms } from './AllSymptoms';

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
      console.log('reduced', selected)
      
      //todo need to decide whether this is a global state or just a helper function.
      return;
    }

  
  return (
    <ConsultationContext.Provider value={{physicalSymptoms, toggleSymptomSelect, filterSelectedSymtoms}}>
      {props.children}
    </ConsultationContext.Provider>
  );
}

export default ConsultationContextProvider;
