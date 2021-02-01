import React, { createContext, useState, ReactChild } from 'react';

export interface AppContextInterface {
  
}

interface Props {
  children: ReactChild | ReactChild[]
}

export const ConsultationContext = createContext<AppContextInterface | null>(null);

const ConsultationContextProvider = (props: Props) => {
  
  return (
    <ConsultationContext.Provider value={{}}>
      {props.children}
    </ConsultationContext.Provider>
  );
}

export default ConsultationContextProvider;
