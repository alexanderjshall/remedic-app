import React, {
  createContext,
  ReactChild,
  useContext,
  useEffect,
  useState,
} from "react";
import staticTranslations from "../utils/static-translations.json";
const translations = staticTranslations as any;
import { useAuth } from "./Auth.context";
import queries from "../services/graphqlService/queries";
import client from "../services/graphqlService/index";
import { useMutation, useQuery, UseMutationResult } from "react-query";
import { Coordinates } from "../types";
import getCoordsByPostcode from "../services/api.geocode";
export interface PatientContextInterface {
  getTranslatedText: () => any;
  coords: Coordinates;
  postcode: string;
}

interface Props {
  children: ReactChild | ReactChild[];
}

export const PatientContext = createContext<PatientContextInterface | null>(
  null
);

const PatientContextProvider = (props: Props) => {
  const { user } = useAuth();

  const [coords, setCoords] = useState<Coordinates>({
    lat: 0,
    lng: 0,
  });

  const [postcode, setPostcode] = useState<string>("");

  // console.log("coords", coords);

  // TODO create static translation interface
  const translatedText = user ? translations[user.language] : translations.en;

  useEffect(() => {
    client
      .request(queries.getPatient, { id: user!.id })
      .then((data) => {
        if (data) {
          setPostcode(data.getPatient.postCode);
          getCoordsByPostcode(data.getPatient.postCode)
            .then((res) =>
              setCoords({
                lat: res.latitude,
                lng: res.longitude,
              })
            )
            .catch((e) => console.log(e));
        }
      })
      .catch((e) => console.log(e));
  }, []);

  const getTranslatedText = (): any => {
    return translatedText;
  };

  return (
    <PatientContext.Provider value={{ getTranslatedText, coords, postcode }}>
      {props.children}
    </PatientContext.Provider>
  );
};

export default PatientContextProvider;
