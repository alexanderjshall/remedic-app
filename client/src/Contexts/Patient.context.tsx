import React, { createContext, ReactChild, useContext } from "react";
import staticTranslations from "../utils/static-translations.json";
const translations = staticTranslations as any;
import { useAuth } from "./Auth.context";
import queries from "../services/graphqlService/queries";
import client from "../services/graphqlService/index";
import { useMutation, useQuery, UseMutationResult } from "react-query";

export interface PatientContextInterface {
  getTranslatedText: () => any;
}

interface Props {
  children: ReactChild | ReactChild[];
}

export const PatientContext = createContext<PatientContextInterface | null>(
  null
);

const PatientContextProvider = (props: Props) => {
  const { user } = useAuth();

  // TODO create static translation interface
  const translatedText = user ? translations[user.language] : translations.en;

  const getTranslatedText = (): any => {
    return translatedText;
  };

  return (
    <PatientContext.Provider value={{ getTranslatedText }}>
      {props.children}
    </PatientContext.Provider>
  );
};

export default PatientContextProvider;
