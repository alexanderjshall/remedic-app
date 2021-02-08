import React, { useContext, useState } from "react";
import Human from "./Human/Human";
import PhysicalSymptomsList from "./PhysicalList/PhysicalSymptomsList";
import logoReduced from "../../../assets/logos/logo-reduced.svg";
import finishTick from "../../../assets/utils/tick.svg";
import {
  ConsultationContext,
  NewConsultation,
} from "../../../Contexts/Consultation.context";
import { useHistory } from "react-router-dom";
import { PatientContext } from "../../../Contexts/Patient.context";
import { useMutation } from "react-query";
import client from "../../../services/graphqlService";
import mutations from "../../../services/graphqlService/mutations";

interface Props {
  area?: string;
}

const PatientSymptoms = (props: Props) => {
  const [view, setView] = useState<string>("Main");

  const { getVariables, setConsultationId } = useContext(ConsultationContext)!;
  const { getTranslatedText } = useContext(PatientContext)!;

  const translatedText = getTranslatedText();
  const localText = translatedText.physicalSymptomsTerms;
  const localTextUtils = translatedText.utils;

  const history = useHistory(); // Browser Router History

  const handleBodyPartClick = (newView: string): void => setView(newView);

  const handleBackArrowClick = (): void => setView("Main");

  const createConsultation = useMutation(
    "create consultation",
    async (variables: NewConsultation) =>
      await client.request(mutations.createConsultation, variables),
    {
      onSuccess: (data) => {
        setConsultationId(data.addConsultation.id);
        history.push("/consultation/chat");
      },
      onError: () => {
        history.push("/consultation/enter_code"); // if adding the consultation fails, re-route to the enter-code page.
      },
    }
  );

  const handleNextClick = async (): Promise<void> => {
    const variables = getVariables();
    createConsultation.mutate(variables);
  };

  return (
    <div className="h-screen relative flex justify-center w-screen overflow-hidden">
      {view === "Main" ? (
        <div className="h-5/6 m-0 py-4 z-10">
          <h1 className="text-center font-extrabold text-blue border border-solid border-blue rounded-3xl py-2 px-1">
            {localText.clickOnSymptom}
          </h1>
          <Human
            onHeadClick={() => handleBodyPartClick("Head")}
            onArmsClick={() => handleBodyPartClick("Arms")}
            onBodyClick={() => handleBodyPartClick("Body")}
            onLegsClick={() => handleBodyPartClick("Legs")}
          />
          <div
            className="bg-blue h-16 w-screen absolute bottom-0 left-0
                flex items-center justify-center
              "
          >
            <button
              onClick={handleNextClick}
              className="flex flex-col justify-around items-center border-2 border-solid border-white text-white rounded-2xl w-36 py-1 target:border-black target:bg-white target:"
            >
              <img src={finishTick} alt="tick" className="text-white w-6" />
              <h2 className="text-sm font-extrabold">{localTextUtils.next}</h2>
            </button>
          </div>
        </div>
      ) : (
        <PhysicalSymptomsList
          area={view}
          onBackArrowClick={() => handleBackArrowClick()}
        />
      )}

      <img
        src={logoReduced}
        alt="background logo"
        className="absolute top-1/2 -mt-52 opacity-10 animate-spin-slow max-w-xl"
      />
    </div>
  );
};

export default PatientSymptoms;
