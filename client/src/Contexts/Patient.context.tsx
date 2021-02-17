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
import mutations from "../services/graphqlService/mutations";
import client from "../services/graphqlService/index";
import { useMutation, useQuery, UseMutationResult } from "react-query";
import { User, UserData } from "../types";
import { Coordinates } from "../types";
import getCoordsByPostcode from "../services/api.geocode";

export interface PatientContextInterface {
  getTranslatedText: () => any;
  patientInfo: UserData;
  updatePatient: (info: 'firstName'| 'lastName' | 'email' | 'postCode' | 'language', value: string) => void;
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

  // const { newPatientData }: any = useMutation(async () => await client.request(mutations.editPatient, {id:user?.id, newData:{...patient}}),
  const mutation = useMutation('update patient', async (mutationVariables: User) =>
      await client.request(mutations.editPatient, mutationVariables),
  {
    onSuccess: (data) => {
      setPatientInfo(data.updatePatient)
    }
  });

  const updatePatient = async (info: 'firstName'| 'lastName' | 'email' | 'postCode' | 'language', value: string) => {
    if (user) {
      let newPatientInfo = Object.assign({}, patientInfo);
      const newPatient: User = {...newPatientInfo, id: user?.id}
      newPatient[info] = value;
      mutation.mutate(newPatient);
    }
  };

  const [coords, setCoords] = useState<Coordinates>({
    lat: 0,
    lng: 0,
  });

  const [postcode, setPostcode] = useState<string>("");

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
    <PatientContext.Provider value={{ getTranslatedText, patientInfo, updatePatient, coords, postcode }}>
      {props.children}
    </PatientContext.Provider>
  );
};

export default PatientContextProvider;
