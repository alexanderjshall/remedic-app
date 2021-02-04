import React, { useContext } from "react";
import { ConsultationContext } from "../../../Contexts/Consultation.context";

const SymptomsChecker = () => {
  const { generalSymptoms, toggleGeneralSymptomSelect, changePainLevel } = useContext(ConsultationContext)!;

  const handleGeneralSymptomClick = (symptomName: string, isSelected: boolean): void => {
    const selectedSymptom = generalSymptoms.find((s) => {
      return s.symptom === symptomName
    });
    if (selectedSymptom) toggleGeneralSymptomSelect(selectedSymptom, isSelected);
    else console.log('symptom not found');
  }

  return (
    <div className=" h-full overflow-hidden">
      <div className="fixed top-0 whitespace-nowrap w-screen py-4 bg-green-light">
        <h1 className="text-bold text-xl text-center">
          Please specify your symptoms:
        </h1>
      </div>

      <ul className="mt-10 w-full px-3 flex flex-col items-center pt-10">
        <h1 className="text-center font-bold text-2xl">Pain level:</h1>
        <li className="mt-6 px-4 flex items-center">
          <div className="flex items-center justify-center flex-wrap">
            <button 
              className="h-20 w-20 flex justify-center flex-col hover:bg-blue-light mx-2"
              onClick={() => changePainLevel(4)}
            >
              <p className="text-3xl self-center">😢</p>
              <p>Bad</p>
            </button>
            <button 
              className="flex-col h-20 w-20 flex justify-center hover:bg-blue-light mx-2"
              onClick={() => changePainLevel(3)}
            >
              <p className="text-3xl self-center">🙂</p>
              <p>Ok</p>
            </button>
            <button 
              className="flex-col h-20 w-20 flex justify-center hover:bg-blue-light mx-2"
              onClick={() => changePainLevel(2)}
            >
              <p className="text-3xl self-center">😃</p>
              <p>Good</p>
            </button>
            <button 
              className="flex-col h-20 w-20 flex justify-center hover:bg-blue-light mx-2"
              onClick={() => changePainLevel(1)}
              >
              <p className="text-3xl self-center">😎</p>
              <p>Very good!</p>
            </button>
            <button 
              className="flex-col h-20 w-20 flex justify-center hover:bg-blue-light mx-2"
              onClick={() => changePainLevel(0)}
              >
              <p className="text-3xl self-center">🤩</p>
              <p>Amazing!</p>
            </button>
          </div>
        </li>
        <li className="mt-10 w-full bg-blue-superlight rounded-md p-2">
          <h1 className="text-center whitespace-nowrap">
            Are you sleeping well?
          </h1>
          <div className="flex justify-center mt-3">
            <button 
              className="px-4 py-2 bg-green-light rounded-lg hover:bg-green-dark  text-opacity-50 mr-3"
              onClick={() => handleGeneralSymptomClick('Sleeping Poorly', true)}
              >
              Yes
            </button>
            <button 
              className="px-4 py-2 bg-red-negative rounded-lg  hover:bg-red-dark  text-opacity-50 ml-3"
              onClick={() => handleGeneralSymptomClick('Sleeping Poorly', false)}
              >
              No
            </button>
          </div>
        </li>
        <li className="mt-10 w-full bg-blue-light p-2 rounded-md">
          <h1 className="text-center whitespace-nowrap">Are you eating?</h1>
          <div className="flex justify-center mt-3">
            <button 
              className="px-4 py-2 bg-green-light rounded-lg hover:bg-green-dark  text-opacity-50 mr-3"
              onClick={() => handleGeneralSymptomClick('Eating Poorly', true)}
            >
              Yes
            </button>
            <button 
              className="px-4 py-2 bg-red-negative  rounded-lg  hover:bg-red-dark text-opacity-50 ml-3"
              onClick={() => handleGeneralSymptomClick('Eating Poorly', false)}
              >
              No
            </button>
          </div>
        </li>

        <li className="mt-10 w-full  bg-blue-superlight rounded-md p-2">
          <h1 className="text-center whitespace-nowrap">
            Do you have a high temperature?
          </h1>
          <div className="flex justify-center mt-3">
            <button 
              className="px-4 py-2 bg-green-light rounded-lg hover:bg-green-dark  text-opacity-50 mr-3"
              onClick={() => handleGeneralSymptomClick('High Temperature', true)}
            >
              Yes
            </button>
            <button 
              className="px-4 py-2 bg-red-negative  rounded-lg  hover:bg-red-dark  text-opacity-50 ml-3"
              onClick={() => handleGeneralSymptomClick('High Temperature', false)}
            >
              No
            </button>
          </div>
        </li>
        <li className="mt-10 w-full bg-blue-light rounded-md p-2">
          <h1 className="text-center whitespace-nowrap">
            Are you taking any medications?
          </h1>
          <div className="flex justify-center mt-3">
            <button 
              className="px-4 py-2 bg-green-light rounded-lg hover:bg-green-dark  text-opacity-50 mr-3"
              onClick={() => handleGeneralSymptomClick('Taking Medications', true)}
              >
              Yes
            </button>
            <button 
              className="px-4 py-2 bg-red-negative  rounded-lg  text-opacity-50 ml-3"
              onClick={() => handleGeneralSymptomClick('Taking Medications', false)}
              >
              No
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default SymptomsChecker;
