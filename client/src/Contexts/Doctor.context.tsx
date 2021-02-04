import React, { createContext, ReactChild, useContext, useState } from 'react';
import { ConsultationInfo } from '../types';
import { AuthContext } from './Auth.context';

export interface AppContextInterface {
  activeConsultations: ConsultationInfo[];
}
interface Props {
  children: ReactChild | ReactChild[];
}

export const DoctorContext = createContext<AppContextInterface | null>(null);

// Doctor context for list of active consultations
function DoctorContextProvider(props: Props) {
  const { user } = useContext(AuthContext);
  const [activeConsultations, setConsultations] = useState<ConsultationInfo[]>([]);

  return (
    <DoctorContext.Provider value={{activeConsultations}}>
      {props.children}
    </DoctorContext.Provider>
  )
}

export default DoctorContextProvider
