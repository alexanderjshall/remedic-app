import React, { useContext, useRef, useState, useEffect } from "react";
import { ConsultationContext } from "../../../Contexts/Consultation.context";
import OKButton from "../../Globals/OKButton/OKButton";
import faceBad from "../../../assets/utils/face-bad.svg";
import faceGood from "../../../assets/utils/face-good.svg";
import faceNotGood from "../../../assets/utils/face-notgood.svg";
import facePain from "../../../assets/utils/face-pain.svg";
import { useHistory } from "react-router-dom";
import { fullGeneralSymptoms } from "../../../Contexts/AllSymptoms";
import QuestionCard from "./QuestionCard";
interface PainLevel {
  label: string;
  img: string;
  selected: boolean;
  level: number;
}

const SymptomsChecker = () => {
  const history = useHistory();

  const [painLevels, setPainLevels] = useState<PainLevel[]>([
    { label: "Good", img: faceGood, selected: false, level: 0 },
    { label: "Not Good", img: faceNotGood, selected: false, level: 1 },
    { label: "Bad", img: faceBad, selected: false, level: 2 },
    { label: "In Pain", img: facePain, selected: false, level: 3 },
  ]);

  const {
    generalSymptoms,
    toggleGeneralSymptomSelect,
    changePainLevel,
  } = useContext(ConsultationContext)!;

  const handleGeneralSymptomClick = (
    symptomName: string,
    isSelected: boolean
  ): void => {
    const selectedSymptom = generalSymptoms.find((s) => {
      return s.symptom === symptomName;
    });
    if (selectedSymptom)
      toggleGeneralSymptomSelect(selectedSymptom, isSelected);
    else console.log("symptom not found");
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
    history.push("/symptoms_physical");
  };

  return (
    <div className="h-screen overflow-hidden flex flex-col">
      <div className="h-16 top-0 whitespace-nowrap w-screen py-4 bg-green-light">
        <h1 className="font-bold text-xl text-center">
          Please specify your symptoms:
        </h1>
      </div>
      <ul className="w-full  overflow-scroll px-3 flex-grow flex flex-col items-center pt-5 cursor-pointer">
        <h1 className="text-center font-bold text-2xl">Pain level:</h1>
        <div className="grid grid-cols-4 w-full gap-2 pt-4">
          {painLevels &&
            painLevels.map((pL, i) => (
              <li
                className={`flex flex-col items-center p-1 justify-center ${
                  pL.selected && "bg-green"
                }`}
                key={i}
                onClick={() => togglePainLevelClick(pL)}
              >
                <img src={pL.img} alt={pL.label} className="w-8" />
                <h2 className="mt-2 font-bold text-sm">{pL.label}</h2>
              </li>
            ))}
        </div>
        {generalSymptoms &&
          generalSymptoms.map((symptom) => (
            <QuestionCard
              key={symptom.symptom}
              handleGeneralSymptomClick={handleGeneralSymptomClick}
              symptom={symptom}
            />
          ))}
        <div className="h-18 flex justify-center items-center py-5">
          <OKButton
            name="Next Page"
            type="button"
            value="Next Page"
            onClick={handleNextPageClick}
            text="Next Page"
          />
        </div>
      </ul>
    </div>
  );
};

export default SymptomsChecker;
