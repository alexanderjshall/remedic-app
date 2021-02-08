import React, { useContext } from "react";
import { PatientContext } from "../../../Contexts/Patient.context";
import { Symptom } from "../../../types";
import YesNoButtons from "./YesNoButtons";

interface Props {
  symptom: Symptom;
  handleSymptomSelect: (symptomName: string, isSelected: boolean) => void;
}

const QuestionCard = (props: Props) => {
  const { handleSymptomSelect, symptom } = props;

  const { getTranslatedText } = useContext(PatientContext)!;

  const localTextUtils = getTranslatedText().utils;

  return (
    <li
      className={`${
        symptom.interactedWith
          ? "bg-blue-superlight"
          : "bg-transparent border-black"
      } border border-solid border-transparent mt-5 w-full max-w-2xl rounded-md py-2 px-4`}
    >
      <h1 className="text-center font-semibold">{symptom.question}</h1>
      <div className="flex justify-center mt-3">
        {symptom.selected ? (
          <YesNoButtons
            isYes={true}
            handleSymptomYesNoClick={handleSymptomSelect}
            symptom={symptom}
          />
        ) : (
          <YesNoButtons
            isYes={false}
            handleSymptomYesNoClick={handleSymptomSelect}
            symptom={symptom}
          />
        )}
      </div>
    </li>
  );
};

export default QuestionCard;
