import React, { useState } from "react";
import useChat from "../../../hooks/useChat";
import OKButton from "../../Globals/OKButton/OKButton";
import DoctorMessageBubble from "../ConsultationChat/MessageBubbles/DoctorMessageBubble";
import PatientMessageBubble from "../ConsultationChat/MessageBubbles/PatientMessageBubble";
import { ReactComponent as SendMessage } from "../../../assets/utils/send_message.svg";
import languages from "../../../utils/supported-languages.json";
import { useDrContext } from "../../../Contexts/Doctor.context";

const langEnglishName = (langCode: string) =>
  languages.languages.find(l => l.langCode ===langCode )?.englishName

const DoctorChat = () => {

  const {currentConsultation} = useDrContext();

  const [currentMsg, setCurrentMsg] = useState<string>("");
  const { messages, addMessage } = useChat(
    String(currentConsultation!.id),
    true,
    currentConsultation!.patientId!.language
  );

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (currentMsg.length > 0) {
        addMessage(currentMsg);
        setCurrentMsg("");
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const renderSymptoms = () =>
      <>
        <h1 className="text-xl font-bold text-blue-dark">Pain intensity: <span className="text-black">{currentConsultation!.painLevel}</span></h1>
        <h1 className="text-xl font-bold text-blue-dark mt-4">
          Patient language: <span className="text-black">{langEnglishName(currentConsultation!.patientId.language)}</span>
        </h1>
        <h1 className="text-xl font-bold mt-4 text-blue-dark">General symptoms</h1>
        {
        currentConsultation!.symptomsByArea
          .filter((s: any) => s.area==="Global")
          .map((s : any) => <h3>{JSON.stringify(s)}</h3>)
        }
        <h1 className="text-xl font-bold mt-4 text-blue-dark">Specific Symptoms by Area</h1>
        {
        currentConsultation!.symptomsByArea
          .filter((s: any) => s.area!=="Global")
          .map((s : any) =>
          <>
          <h3 className="font-semibold ml-4 text-green-dark">{s.area}</h3>
          <ul>
            {s.symptom.split(",").map( (sym:string) =>
              <li className="list-disc ml-12">{sym}</li>
            )}
          </ul>
          </>)
          }
      </>


  return (
    <div className="h-full overflow-hidden">
      <div className="w-full fixed h-20 bg-blue-light top-0 left-0 flex items-center justify-center">
        <h1 className="font-bold text-2xl text-white-ghost">
          { `${currentConsultation!.patientId.firstName} ${currentConsultation!.patientId.lastName}`}
        </h1>
      </div>
      <div className="grid grid-rows-2 grid-cols-2 grid-flow-row px-4 mt-6 pt-20">
        <div className="row-span-2">
          <div className="h-full">
            <form className="h-full">
            <label
                  htmlFor="patient_notes"
                  className="font-bold text-lg text-opacity-75 whitespace-nowrap"
                >
                  Symptoms as described by patient:
                </label>
              <div className="border-black border h-1/2 w-full rounded-lg mb-2 overflow-auto p-4">
                {renderSymptoms()}

              </div>
                <label
                  htmlFor="doctor_notes"
                  className="font-bold text-lg text-opacity-75 whitespace-nowrap"
                >
                  Consultation Notes:
                </label>
                <textarea
                  wrap="soft"
                  name="doctor_notes"
                  id="doctor_notes"
                  className="resize-none border-black border w-full p-2 h-1/3 rounded-lg outline-none focus:border-4 mt-2"
                ></textarea>
                <div className="flex justify-center">
                  <OKButton
                  name="consultation_btn"
                  type="submit"
                  value="End consultation"
                  text="End consultation"
                  onClick={() => {}}
                  />
                </div>
            </form>
          </div>
        </div>
        <div className="row-span-3">
          <div className="flex flex-auto flex-col ml-4">
            <h1 className="text-lg font-bold text-opacity-75 text-center whitespace-nowrap">
              Chat:
            </h1>
            <div className=" flex flex-col pb-3">
              <div className=" flex border border-black rounded-lg flex-col overflow-auto min-h-textarea max-h-chat py-5">
                {messages &&
                  messages.map((message, idx) =>
                    message.isAuthor ? (
                      <DoctorMessageBubble message={message} key={idx} />
                    ) : (
                      <PatientMessageBubble message={message} key={idx} />
                    )
                  )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-start-2">
          <div className="flex">
            <form
              className="relative flex justify-end items-center p-3 bg-white w-full self-end"
              onSubmit={sendMessage}
            >
              <label hidden htmlFor="chat_input" />
              <input
                type="text"
                name="chat input"
                className="rounded-md shadow-sm py-2 ring-2 focus:ring-blue-dark w-full cursor-text px-4"
                placeholder="Start messaging"
                value={currentMsg}
                onChange={(e) => setCurrentMsg(e.target.value)}
              />
              <button className="absolute right-4">
                <SendMessage />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorChat;
