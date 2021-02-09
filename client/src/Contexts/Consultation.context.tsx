import React, {
  createContext,
  useState,
  ReactChild,
  useEffect,
  useContext,
} from "react";
import { Doctor, Symptom } from "../types";
import {
  fullPhysicalSymptoms,
  fullGeneralSymptoms,
  fullPsychologicalSymptoms,
} from "../utils/AllSymptoms";
import { AuthContext } from "./Auth.context";

export interface AppContextInterface {
  physicalSymptoms: Symptom[];
  generalSymptoms: Symptom[];
  psychSymptoms: Symptom[];
  doctor: Doctor;
  getConsultationId: () => number | undefined;
  togglePhysicalSymptomSelect: (symptom: Symptom) => void;
  toggleGeneralSymptomSelect: (symptom: Symptom, isSelected: boolean) => void;
  togglePsychSymptomSelect: (symptom: Symptom, isSelected: boolean) => void;
  changePainLevel: (painLevel: number) => void;
  changePatientNotes: (patientInput: string) => void;
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
  const [psychSymptoms, setPsychSymptoms] = useState<Symptom[]>([]);

  // pain level state
  const [painLevel, setPainLevel] = useState<number>(0);

  // Extra info submitted by patients
  const [patientNotes, setPatientNotes] = useState<string>("");

  // ID states
  const [doctor, setDoctor] = useState<Doctor>({} as Doctor); // doctor code for socket IO
  const [consultationId, setConsultationId] = useState<number>(); // consultation code for socket IO

  useEffect(() => {
    setSymptoms(fullPhysicalSymptoms);
    setGeneralSymptoms(fullGeneralSymptoms);
    setPsychSymptoms(fullPsychologicalSymptoms);
  }, []);

  /*
  =====Toggle symptom select functions
  */
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
      if (symptom.symptom === s.symptom) {
        s.selected = isSelected;
        s.interactedWith = true;
      }
      return s;
    });
    setGeneralSymptoms(alteredSymptoms);
  };

  const togglePsychSymptomSelect = (symptom: Symptom, isSelected: boolean) => {
    const alteredSymptoms = psychSymptoms.map((s) => {
      if (symptom.symptom === s.symptom) {
        s.selected = isSelected;
        s.interactedWith = true;
      }
      return s;
    });
    setPsychSymptoms(alteredSymptoms);
  };

  // change the pain level state
  const changePainLevel = (painLevel: number): void => setPainLevel(painLevel);

  // update patient notes
  const changePatientNotes = (patientInput: string): void => {
    setPatientNotes(patientInput);
  };

  // Update the doctor info for query
  const updateDoctor = (
    id: number,
    firstName: string,
    lastName: string,
    language: string,
    docPublicCode: string
  ): void => setDoctor({ id, firstName, lastName, language, docPublicCode });

  // filters symptoms by { selected: true }
  const filterSelectedSymptoms = (symptoms: Symptom[]): SelectedSymptom[] => {
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

  // collate variables for query
  const getVariables = (): NewConsultation => {
    const selectedSymptoms = filterSelectedSymptoms([
      ...physicalSymptoms,
      ...generalSymptoms,
      ...psychSymptoms,
    ]);
    // create new consultation object
    const consultation: NewConsultation = {
      date: new Date().toISOString(),
      symptomsByArea: selectedSymptoms,
      painLevel: painLevel,
      patientId: user!.id,
      patientNotes: patientNotes,
      doctorId: doctor.id,
    };
    return consultation;
  };

  // getter for consultationId
  const getConsultationId = (): number | undefined => {
    if (consultationId) return consultationId;
    else return undefined;
  };

  return (
    <ConsultationContext.Provider
      value={{
        physicalSymptoms,
        generalSymptoms,
        psychSymptoms,
        togglePhysicalSymptomSelect,
        toggleGeneralSymptomSelect,
        togglePsychSymptomSelect,
        changePainLevel,
        changePatientNotes,
        updateDoctor,
        getConsultationId,
        doctor,
        getVariables,
        setConsultationId,
      }}
    >
      {props.children}
    </ConsultationContext.Provider>
  );
};

export default ConsultationContextProvider;
