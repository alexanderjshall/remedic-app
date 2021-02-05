import React from "react";
import { Symptom } from "../../../types";

interface Props {
  symptom: Symptom;
  handleGeneralSymptomClick: (symptomName: string, isSelected: boolean) => void;
}

const QuestionCard = (props: Props) => {
  const { handleGeneralSymptomClick, symptom } = props;
  return (
    <li className="mt-5 w-full bg-blue-superlight rounded-md p-2">
      <h1 className="text-center whitespace-nowrap">{symptom.question}</h1>
      <div className="flex justify-center mt-3">
        {symptom.selected ? (
          <div>
            {/* If YES selected*/}
            <button
              className="px-4 py-2 bg-green-dark rounded-lg border-2 border-solid text-white text-opacity-80 font-bold mr-3 h-12 w-16"
              onClick={() => {
                handleGeneralSymptomClick(symptom.symptom, true);
              }}
            >
              Yes
            </button>
            <button
              className={`px-4 py-2 bg-transparent border-2 border-solid rounded-lg text-red-negative opacity-80 font-bold text-opacity-80 ml-3 border-red-negative h-12 w-16`}
              onClick={() => {
                handleGeneralSymptomClick(symptom.symptom, false);
              }}
            >
              No
            </button>
          </div>
        ) : (
          <div>
            {/* IF NO selected */}
            <button
              className="px-4 py-2 bg-transparent border-solid border-2 border-green-dark rounded-lg  opacity-80 font-bold text-black text-opacity-80 mr-3 h-12 w-16"
              onClick={() => {
                handleGeneralSymptomClick(symptom.symptom, true);
              }}
            >
              Yes
            </button>
            <button
              className="px-4 py-2 bg-red-negative rounded-lg border-2 border-invisible  text-white font-bold text-opacity-80 ml-3 h-12 w-16"
              onClick={() => {
                handleGeneralSymptomClick(symptom.symptom, false);
              }}
            >
              No
            </button>
          </div>
        )}
      </div>
    </li>
  );
};

export default QuestionCard;
