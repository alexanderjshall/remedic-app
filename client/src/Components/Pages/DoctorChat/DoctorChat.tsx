import React, { useState } from "react";
import useChat from "../../../hooks/useChat";
import OKButton from "../../Globals/OKButton/OKButton";
import DoctorMessageBubble from "../ConsultationChat/MessageBubbles/DoctorMessageBubble";
import PatientMessageBubble from "../ConsultationChat/MessageBubbles/PatientMessageBubble";
import { ReactComponent as SendMessage } from "../../../assets/utils/send_message.svg";
import languages from "../../../utils/supported-languages.json";
import { useDrContext } from "../../../Contexts/Doctor.context";
import { useHistory } from "react-router-dom";
import DoctorPrescriptions from "./DoctorPrescriptions";

const langEnglishName = (langCode: string) =>
  languages.languages.find((l) => l.langCode === langCode)?.englishName;



  const DoctorChat = () => {

  const [showPrescriptions, setShowPrescriptions] = useState<boolean>(false)

  const {
    currentConsultation,
    editConsultation,
    doctorNotes,
    setDoctorNotes,
    prescriptions,
    setPrescriptions
  } = useDrContext();
  const history = useHistory();
  const [currentMsg, setCurrentMsg] = useState<string>("");

  const patientFullName = `${currentConsultation!.patientId.firstName} ${
    currentConsultation!.patientId.lastName
  }`

  const { messages, addMessage, endConsultation } = useChat(
    String(currentConsultation!.id),
    true,
    '',
    patientFullName,
    currentConsultation!.patientId!.language,
    () => endChat()
  );

  const endChat = () => {
    editConsultation.mutate();
    history.push("/doctor/queue");
  };

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

  const renderSymptoms = () => (
    <>
      <h1 className="text-xl font-bold text-blue-dark">
        Pain intensity:{" "}
        <span className="text-black">{currentConsultation!.painLevel}</span>
      </h1>
      <h1 className="text-xl font-bold text-blue-dark mt-4">
        Patient language:{" "}
        <span className="text-black">
          {langEnglishName(currentConsultation!.patientId.language)}
        </span>
      </h1>
      <h1 className="text-xl font-bold mt-4 text-blue-dark">
        General symptoms
      </h1>
      <ul>
        {currentConsultation!.symptomsByArea
          .filter((s: any) => s.area === "Global")
          .map((s: any) =>
            s.symptom.split(",").map((sym: string, i: number) => (
              <li className="list-disc ml-12" key={i}>
                {sym}
              </li>
            ))
          )}
      </ul>
      <h1 className="text-xl font-bold mt-4 text-blue-dark">
        Specific Symptoms by Area
      </h1>
      {currentConsultation!.symptomsByArea
        .filter((s: any) => s.area !== "Global")
        .map((s: any, i: number) => (
          <React.Fragment key={i}>
            <h3 className="font-semibold ml-4 text-green-dark">{s.area}</h3>
            <ul>
              {s.symptom.split(",").map((sym: string, j: number) => (
                <li className="list-disc ml-12" key={j}>
                  {sym}
                </li>
              ))}
            </ul>
          </React.Fragment>
        ))}
    </>
  );

  return (
    <div className="h-full overflow-y-scroll">
      {showPrescriptions &&
      <DoctorPrescriptions
        close={()=>setShowPrescriptions(false)}
        prescriptions={prescriptions}
        setPrescriptions={setPrescriptions}
      />}
      <div className="w-full fixed h-20 bg-blue-light top-0 left-0 flex items-center justify-center">
        <h1 className="font-bold text-2xl text-white-ghost">
          {patientFullName}
        </h1>
      </div>
      <div className="grid grid-cols-1 px-5 pt-20 mt-2 gap-2 md:grid-cols-2">
        <div className="pt-2">
          <div className="h-full ml-4 mr-4">
            <form className="h-full shadow-sm">
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
                value={doctorNotes}
                onChange={(e) => setDoctorNotes(e.target.value)}
                className="resize-none border-black border w-full p-2 h-1/3 rounded-lg outline-none focus:border-4 mt-2"
              ></textarea>
            </form>
          </div>
        </div>
        <div className="pt-2 shadow-sm">
          <div className="flex flex-auto flex-col ml-4 mr-4 h-full">
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

        <div className="col-start-1 md:col-start-2">
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
        <div className="col-start-1 md:col-start-1 md:-mt-20">
          <div className="flex justify-evenly">
            <button
            className="px-6 py-3 -full ring-2 bg-red-600 rounded-lg lg:m-0 hover:bg-red-800 ring-opacity-50 max-w-1/2 ring-red-800 font-bold text-white"
            onClick={() =>  endConsultation()}
            >
              End Consultation
            </button>

            <button
            className="px-6 py-3 -full ring-2 bg-blue rounded-lg lg:m-0 hover:bg-blue-800 ring-opacity-50 max-w-1/2 ring-blue-800 font-bold text-white"
            onClick={() => setShowPrescriptions(true)}
            >
              Prescriptions
            </button>
          </div>
        </div>
        <div className="m-2">
          <span> </span>
        </div>
      </div>
    </div>
  );
};

export default DoctorChat;
