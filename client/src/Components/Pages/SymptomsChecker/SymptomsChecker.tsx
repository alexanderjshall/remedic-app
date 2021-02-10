import React, { useContext, useRef, useState, useEffect } from "react";
import { ConsultationContext } from "../../../Contexts/Consultation.context";
import OKButton from "../../Globals/OKButton/OKButton";
import faceBad from "../../../assets/utils/face-bad.svg";
import faceGood from "../../../assets/utils/face-good.svg";
import faceNotGood from "../../../assets/utils/face-notgood.svg";
import facePain from "../../../assets/utils/face-pain.svg";
import { useHistory } from "react-router-dom";
import { PatientContext } from "../../../Contexts/Patient.context";
import QuestionCard from "../../Globals/QuestionCard/QuestionCard";
import { Transition } from "@headlessui/react";
import LogoReduced from "../../../assets/logos/logo-reduced.svg";

interface PainLevel {
  label: string;
  img: string;
  selected: boolean;
  level: number;
}

const SymptomsChecker = () => {
  const history = useHistory();
  const { getTranslatedText } = useContext(PatientContext)!;
  const translatedText = getTranslatedText();
  const localText = translatedText.generalSymptomsTerms;
  const localTextUtils = translatedText.utils;

  const [painLevels, setPainLevels] = useState<PainLevel[]>([
    { label: localText["good"], img: faceGood, selected: false, level: 0 },
    {
      label: localText["notGood"],
      img: faceNotGood,
      selected: false,
      level: 1,
    },
    { label: localText["bad"], img: faceBad, selected: false, level: 2 },
    { label: localText["inPain"], img: facePain, selected: false, level: 3 },
  ]);

  const {
    generalSymptoms,
    toggleGeneralSymptomSelect,
    changePainLevel,
  } = useContext(ConsultationContext)!;

  generalSymptoms.forEach((symptom) => {
    symptom.question = localText[symptom.id!];
  });

  const handleGeneralSymptomClick = (
    symptomName: string,
    isSelected: boolean
  ): void => {
    const selectedSymptom = generalSymptoms.find((s) => {
      s.symptom === symptomName;
    });
    if (selectedSymptom) {
      selectedSymptom.interactedWith = true;
      toggleGeneralSymptomSelect(selectedSymptom, isSelected);
    } else console.log("symptom not found");
  };

  const togglePainLevelClick = (pressedPainLevel: PainLevel): void => {
    changePainLevel(pressedPainLevel.level);
    const newPainLevels = painLevels.map((painLevel) => {
      if (painLevel.label === pressedPainLevel.label) painLevel.selected = true;
      else painLevel.selected = false;
      return painLevel;
    });
    setPainLevels(newPainLevels);
  };

  const handleNextPageClick = (): void => {
    history.push("/consultation/symptoms/physical");
  };

  return (
    <Transition
      appear={true}
      show={true}
      enter="transition-opacity ease-in-out duration-700"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      className="h-screen relative overflow-hidden flex flex-col items-center"
    >
      <div className="h-16 py-3 whitespace-nowrap w-screen max-w-2xl w-2xl">
        <h1 className="text-center font-extrabold text-blue border border-l-0 border-r-0 border-blue py-2 px-1">
          {localText.generalQuestions}
        </h1>
      </div>
      <div className="w-full overflow-scroll px-3 flex-grow flex flex-col items-center pt-5 cursor-pointer">
        <h1 className="text-center font-bold text-2xl text-green-dark">
          Pain level:
        </h1>
        <div className="grid grid-cols-4 w-full gap-2 pt-4">
          {painLevels &&
            painLevels.map((pL, i) => (
              <div
                className={`flex flex-col items-center p-1 justify-between ${
                  pL.selected && "bg-green"
                }`}
                key={i}
                onClick={() => togglePainLevelClick(pL)}
              >
                <img src={pL.img} alt={pL.label} className="w-8 stroke-2" />
                <h2 className="mt-2 font-bold text-sm text-center">
                  {pL.label}
                </h2>
              </div>
            ))}
        </div>
        {generalSymptoms &&
          generalSymptoms.map((symptom) => (
            <QuestionCard
              key={symptom.symptom}
              handleSymptomSelect={handleGeneralSymptomClick}
              symptom={symptom}
            />
          ))}
        <div className="h-18 flex justify-center items-center py-5 w-full">
          <OKButton
            name={"Next Page"}
            type="button"
            value={localTextUtils.next}
            onClick={handleNextPageClick}
            text={localTextUtils.next}
          />
        </div>
      </div>
      <img
        src={LogoReduced}
        alt="background logo"
        className="absolute top-1/2 -mt-36 opacity-10 animate-spin-slow max-w-xl"
      />
    </Transition>
  );
};

export default SymptomsChecker;
