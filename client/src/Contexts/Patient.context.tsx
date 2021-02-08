import React, { createContext, ReactChild, useContext, useState } from "react";
import staticTranslations from "../utils/static-translations.json";
const translations = staticTranslations as any;
import { useAuth } from "./Auth.context";
import queries from "../services/graphqlService/queries";
import client from "../services/graphqlService/index";
import { useMutation, useQuery, UseMutationResult } from "react-query";
import { UserData } from "../types";

export interface PatientContextInterface {
  getTranslatedText: () => any;
  patientInfo: UserData;
}

interface Props {
  children: ReactChild | ReactChild[];
}

export const PatientContext = createContext<PatientContextInterface | null>(
  null
);

const PatientContextProvider = (props: Props) => {
  const [patientInfo, setPatientInfo] = useState<UserData>({} as UserData);
  const { user } = useAuth();

  const { data } = useQuery(
    'get patient info',
    async () => await client.request(queries.getPatient, {id: user?.id}),
    {enabled: !!user,
    onSuccess: (data) => {
      setPatientInfo(data.getPatient);
    }}
  );

  // TODO create static translation interface
  const translatedText = user ? translations[user.language] : translations.en;

  const getTranslatedText = (): any => {
    return translatedText;
  };

  return (
    <PatientContext.Provider value={{ getTranslatedText, patientInfo }}>
      {props.children}
    </PatientContext.Provider>
  );
};

export default PatientContextProvider;
