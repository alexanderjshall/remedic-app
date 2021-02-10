import React, { useContext } from "react";
import { PatientContext } from "../../../Contexts/Patient.context";
import { Symptom } from "../../../types";
import YesNoButtons from "./YesNoButtons";
import QuestionIcon from "../../../assets/utils/question-alt.svg";
import TickIcon from "../../../assets/utils/tick-alt.svg";

interface Props {
  symptom: Symptom;
  handleSymptomSelect: (symptomName: string, isSelected: boolean) => void;
}

const QuestionCard = (props: Props) => {
  const { handleSymptomSelect, symptom } = props;

  const { getTranslatedText } = useContext(PatientContext)!;

  return (
    <div
      className={`relative ${
        symptom.interactedWith ? "bg-green-superlight" : "bg-white"
      } border border-solid border-transparent shadow-md mt-5 w-full max-w-2xl rounded-md p-2 z-10`}
    >
      <h1 className="text-center font-semibold text-gray-700">
        {symptom.question}
      </h1>
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
      {symptom.interactedWith ? (
        <img
          src={TickIcon}
          alt="background tick"
          className="absolute left-0 top-1/2 -mt-8 w-20 opacity-10 -z-10"
        />
      ) : (
        <img
          src={QuestionIcon}
          alt="background question"
          className="absolute -left-4 top-1/2 -mt-8 w-20 opacity-10 -z-10"
        ></img>
      )}
    </div>
  );
};

export default QuestionCard;
