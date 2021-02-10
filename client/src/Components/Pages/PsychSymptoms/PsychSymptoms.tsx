import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { ConsultationContext } from "../../../Contexts/Consultation.context";
import { Symptom } from "../../../types";
import OKButton from "../../Globals/OKButton/OKButton";
import QuestionCard from "../../Globals/QuestionCard/QuestionCard";
import PsychIcon from "../../../assets/symptoms/psych-general.svg";
import { Transition } from "@headlessui/react";
import LogoReduced from "../../../assets/logos/logo-reduced.svg";
import { PatientContext } from "../../../Contexts/Patient.context";

const PsychSymptoms = () => {
  const history = useHistory();

  const { getTranslatedText } = useContext(PatientContext)!;
  const translatedText = getTranslatedText();
  const localText = translatedText.psychSymptomsTerms;

  const { psychSymptoms, togglePsychSymptomSelect } = useContext(
    ConsultationContext
  )!;

  psychSymptoms.forEach((symptom) => {
    symptom.question = localText[symptom.id!]
  });

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
      className="h-screen relative overflow-hidden flex flex-col pt-1"
    >
      <div className="h-20 py-6 px-4 flex items-center justify-between w-screen max-w-2xl w-2xl border border-blue border-solid border-l-0 border-r-0">
        <img src={PsychIcon} alt="brain icon" className="w-16" />
        <h1 className="font-bold text-blue text-right">
          {localText.psychSymptoms}
        </h1>
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
        <img
          src={LogoReduced}
          alt="background logo"
          className="absolute top-1/2 -mt-36 opacity-10 animate-spin-slow max-w-xl"
        />
      </ul>
    </Transition>
  );
};

export default PsychSymptoms;
