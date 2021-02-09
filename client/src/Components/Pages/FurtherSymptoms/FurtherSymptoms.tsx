import React, { useContext } from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import {
  ConsultationContext,
  NewConsultation,
} from "../../../Contexts/Consultation.context";
import client from "../../../services/graphqlService";
import mutations from "../../../services/graphqlService/mutations";
import FinishTick from "../../../assets/utils/tick.svg";
import { Transition } from "@headlessui/react";

const FurtherSymptoms = () => {
  const history = useHistory();
  const { getVariables, setConsultationId, changePatientNotes } = useContext(ConsultationContext)!;

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

  const handlePatientInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    changePatientNotes(e.target.value);
  };

  const handleNextClick = async (): Promise<void> => {
    try {
      const variables = await getVariables();
      createConsultation.mutate(variables);
      
    } catch(e) {
      console.log(e);
    }
  };

  return (
    <Transition
    appear={true}
    show={true}
    enter="transition-opacity delay-75 ease-in-out duration-500"
    enterFrom="opacity-0"
    enterTo="opacity-100"
    className="flex flex-col justify-center items-center h-screen overflow-y-scroll"
  >
      <div className="h-24 w-full flex flex-col justify-between items-center pt-4 pb-2 bg-green">
        <h1 className="text-center font-bold text-xl bg-white text-green py-1 px-2">
          Further Information
        </h1>
        <p className="text-white font-semibold text-lg">
          Fill in any further symptoms and information
        </p>
      </div>
      <div className="flex-grow w-full flex justify-center py-8 px-2 max-w-4xl">
        <label htmlFor="patient input" hidden={true}>
          Enter additional symptoms here
        </label>
        <input
          type="text"
          name="patient input"
          className="bg-gray-200 focus:ring-2 flex self-start p-8 align-top rounded-3xl border-2 focus:border-solid focus:border-blue w-full h-full font-xl font-semibold cursor-text"
          placeholder="Enter Symptoms"
          onChange={handlePatientInput}
        />
      </div>
      <div className="bg-blue h-16 w-screen flex items-center justify-center">
        <button
          onClick={handleNextClick}
          className="flex flex-col justify-around items-center border-2 border-solid border-white text-white rounded-2xl w-36 py-1 target:border-black target:bg-white target:"
        >
          <img src={FinishTick} alt="tick" className="text-white w-6" />
          <h2 className="text-sm font-extrabold">{"Finish"}</h2>
        </button>
      </div>
    </Transition>
  );
};

export default FurtherSymptoms;
