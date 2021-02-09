import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { ConsultationContext } from "../../../Contexts/Consultation.context";
import { Symptom } from "../../../types";
import OKButton from "../../Globals/OKButton/OKButton";
import QuestionCard from "../../Globals/QuestionCard/QuestionCard";
import PsychIcon from "../../../assets/symptoms/psych-general.svg";
import { Transition } from "@headlessui/react";

const PsychSymptoms = () => {
  const history = useHistory();

  const { psychSymptoms, togglePsychSymptomSelect } = useContext(
    ConsultationContext
  )!;

  const handlePsychSymptomClick = (
    symptomName: string,
    isSelected: boolean
  ) => {
    const selectedSymptom = psychSymptoms.find((s) => {
      return s.symptom === symptomName;
    });
    if (selectedSymptom) togglePsychSymptomSelect(selectedSymptom, isSelected);
    else console.log("symptom not found");
  };

  // redirect to patient notes.
  const handleNextPageClick = (): void => {
    history.push("/consultation/symptoms/further");
  };

  return (
    <Transition
    appear={true}
    show={true}
    enter="transition-opacity ease-in-out duration-700"
    enterFrom="opacity-0"
    enterTo="opacity-100"
    className="h-screen overflow-hidden flex flex-col"
  >
      <div className="min-h-16 top-0 flex justify-between items-center w-screen py-4 px-16 bg-green-light">
        <img src={PsychIcon} alt="brain icon" className="w-16" />
        <h1 className="font-bold">Psychological Symptoms</h1>
      </div>
      <ul className="w-full  overflow-scroll px-3 flex-grow flex flex-col items-center pt-5 cursor-pointer">
        {psychSymptoms &&
          psychSymptoms.map((symptom) => (
            <QuestionCard
              key={symptom.symptom}
              handleSymptomSelect={handlePsychSymptomClick}
              symptom={symptom}
            />
          ))}
        <div className="h-18 flex justify-center items-center py-5 w-full">
          <OKButton
            name={"Next Page"}
            type="button"
            value={"NEXT"}
            onClick={handleNextPageClick}
            text={"NEXT"}
          />
        </div>
      </ul>
    </Transition>
  );
};

export default PsychSymptoms;
