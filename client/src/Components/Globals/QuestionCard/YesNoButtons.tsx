import React, { useContext } from "react";
import { PatientContext } from "../../../Contexts/Patient.context";
import { Symptom } from "../../../types";

interface Props {
  isYes: boolean;
  symptom: Symptom;
  handleSymptomYesNoClick: (symptom: string, isSelected: boolean) => void;
}

const YesNoButtons = (props: Props) => {
  const { isYes, symptom, handleSymptomYesNoClick } = props;

  const { getTranslatedText } = useContext(PatientContext)!;

  const localTextUtils = getTranslatedText().utils;

  if (isYes)
    return (
      <React.Fragment>
        <button
          className="px-4 py-2 bg-green-dark rounded-xl border-2 border-solid text-white text-opacity-80 font-bold mr-3 h-12 w-16"
          onClick={() => {
            handleSymptomYesNoClick(symptom.symptom, true);
          }}
        >
          {localTextUtils.yes}
        </button>
        <button
          className={`px-4 py-2 bg-transparent border-2 border-solid rounded-xl text-red-negative opacity-60 font-bold text-opacity-80 ml-3 border-red-negative h-12 w-16`}
          onClick={() => {
            handleSymptomYesNoClick(symptom.symptom, false);
          }}
        >
          {localTextUtils.no}
        </button>
      </React.Fragment>
    );
  else
    return (
      <React.Fragment>
        <button
          className="px-4 py-2 bg-transparent border-solid border-2 border-green-dark rounded-xl opacity-60 font-bold text-green-dark text-opacity-80 mr-3 h-12 w-16"
          onClick={() => {
            handleSymptomYesNoClick(symptom.symptom, true);
          }}
        >
          {localTextUtils.yes}
        </button>
        <button
          className="px-4 py-2 bg-red-negative rounded-xl border-2 border-invisible  text-white font-bold text-opacity-80 ml-3 h-12 w-16"
          onClick={() => {
            handleSymptomYesNoClick(symptom.symptom, false);
          }}
        >
          {localTextUtils.no}
        </button>
      </React.Fragment>
    );
};

export default YesNoButtons;
