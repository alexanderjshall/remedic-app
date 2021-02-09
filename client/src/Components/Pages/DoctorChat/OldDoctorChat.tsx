import React, { useState } from "react";
import useChat from "../../../hooks/useChat";
import OKButton from "../../Globals/OKButton/OKButton";
import DoctorMessageBubble from "../ConsultationChat/MessageBubbles/DoctorMessageBubble";
import PatientMessageBubble from "../ConsultationChat/MessageBubbles/PatientMessageBubble";
import { ReactComponent as SendMessage } from "../../../assets/utils/send_message.svg";
import languages from "../../../utils/supported-languages.json";
import { useDrContext } from "../../../Contexts/Doctor.context";
import { useHistory } from "react-router-dom";

const langEnglishName = (langCode: string) =>
  languages.languages.find((l) => l.langCode === langCode)?.englishName;

const DoctorChat = () => {
  const {
    currentConsultation,
    editConsultation,
    doctorNotes,
    setDoctorNotes,
  } = useDrContext();
  const history = useHistory();
  const [currentMsg, setCurrentMsg] = useState<string>("");

  const patientFullName = `${currentConsultation!.patientId.firstName} ${
    currentConsultation!.patientId.lastName
  }`;

  const { messages, addMessage, endConsultation } = useChat(
    String(currentConsultation!.id),
    true,
    "",
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

  return (
    <div className="grid grid-cols-1 px-5 pt-20 mt-2 gap-2 md:grid-cols-2">
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
        <div className="flex justify-center">
          <OKButton
            name="consultation_btn"
            type="submit"
            value="End consultation"
            text="End consultation"
            onClick={() => endConsultation()}
          />
        </div>
      </div>
      <div className="m-2">
        <span> </span>
      </div>
    </div>
  );
};

export default DoctorChat;
