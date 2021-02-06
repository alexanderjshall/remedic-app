import React, {
  createContext,
  useState,
  ReactChild,
  useEffect,
  useContext,
} from "react";
import { Doctor, Symptom } from "../types";
import { fullPhysicalSymptoms, fullGeneralSymptoms } from "./AllSymptoms";
import { AuthContext } from "./Auth.context";

export interface AppContextInterface {
  physicalSymptoms: Symptom[];
  generalSymptoms: Symptom[];
  doctor: Doctor;
  getConsultationId: () => number | undefined;
  togglePhysicalSymptomSelect: (symptom: Symptom) => void;
  toggleGeneralSymptomSelect: (symptom: Symptom, isSelected: boolean) => void;
  changePainLevel: (painLevel: number) => void;
  updateDoctor: (
    id: number,
    firstName: string,
    lastName: string,
    language: string,
    docPublicCode: string
  ) => void;
  getVariables: () => NewConsultation;
  setConsultationId: React.Dispatch<React.SetStateAction<number | undefined>>;
}

interface Props {
  children: ReactChild | ReactChild[];
}

interface SelectedSymptom {
  area: string;
  symptom: string;
}

export interface NewConsultation {
  date: string;
  symptomsByArea: SelectedSymptom[];
  painLevel: number;
  patientNotes?: string;
  patientId: number;
  doctorId: number;
}

export const ConsultationContext = createContext<AppContextInterface | null>(
  null
);

// Consultation Context for patient info
const ConsultationContextProvider = (props: Props) => {
  //**Imported Contexts**/
  const { user } = useContext(AuthContext); // user user.id for patientId

  //**STATES**/
  const [physicalSymptoms, setSymptoms] = useState<Symptom[]>([]);
  const [generalSymptoms, setGeneralSymptoms] = useState<Symptom[]>([]);

  // pain level state
  const [painLevel, setPainLevel] = useState<number>(0);

  // ID states
  const [doctor, setDoctor] = useState<Doctor>({} as Doctor); // doctor code for socket IO
  const [consultationId, setConsultationId] = useState<number>(); // consultation code for socket IO

  useEffect(() => {
    setSymptoms(fullPhysicalSymptoms);
    setGeneralSymptoms(fullGeneralSymptoms);
  }, []);

  const togglePhysicalSymptomSelect = (symptom: Symptom): void => {
    const alteredSymptoms = physicalSymptoms.map((s) => {
      if (symptom.symptom === s.symptom) s.selected = !s.selected;
      return s;
    });
    setSymptoms(alteredSymptoms);
  };

  const toggleGeneralSymptomSelect = (
    symptom: Symptom,
    isSelected: boolean
  ): void => {
    const alteredSymptoms = generalSymptoms.map((s) => {
      if (symptom.symptom === s.symptom) s.selected = isSelected;
      return s;
    });
    setGeneralSymptoms(alteredSymptoms);
  };

  const changePainLevel = (painLevel: number): void => setPainLevel(painLevel);

  const updateDoctor = (
    id: number,
    firstName: string,
    lastName: string,
    language: string,
    docPublicCode: string
  ): void => setDoctor({ id, firstName, lastName, language, docPublicCode });

  const filterSelectedSymptoms = (symptoms: Symptom[]): SelectedSymptom[] => {
    // Removes selected symptoms, and groups symptoms by area together.
    const selected: SelectedSymptom[] = symptoms.reduce(
      (acc: SelectedSymptom[], sym: Symptom) => {
        if (sym.selected) {
          const index = acc.findIndex((item) => item.area === sym.area);
          if (index > -1) acc[index].symptom += ", " + sym.symptom;
          else acc.push({ area: sym.area, symptom: sym.symptom });
        }
        return acc;
      },
      []
    );
    return selected;
  };

  const getVariables = (): NewConsultation => {
    const selectedSymptoms = filterSelectedSymptoms([
      ...physicalSymptoms,
      ...generalSymptoms,
    ]);
    // create new consultation object
    const consultation: NewConsultation = {
      date: new Date().toISOString(),
      symptomsByArea: selectedSymptoms,
      painLevel: painLevel,
      patientId: user!.id,
      patientNotes: "",
      doctorId: doctor.id,
      };
      return consultation;
  };

  const getConsultationId = (): number | undefined => {
    if (consultationId) return consultationId;
    else return undefined;
  };

  return (
    <ConsultationContext.Provider
      value={{
        physicalSymptoms,
        generalSymptoms,
        togglePhysicalSymptomSelect,
        toggleGeneralSymptomSelect,
        changePainLevel,
        updateDoctor,
        getConsultationId,
        doctor,
        getVariables,
        setConsultationId
      }}
    >
      {props.children}
    </ConsultationContext.Provider>
  );
};

export default ConsultationContextProvider;
