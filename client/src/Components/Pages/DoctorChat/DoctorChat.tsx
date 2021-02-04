import React, { useState } from "react";
import useChat from "../../../hooks/useChat";
import OKButton from "../../Globals/OKButton/OKButton";
import DoctorMessageBubble from "../ConsultationChat/MessageBubbles/DoctorMessageBubble";
import PatientMessageBubble from "../ConsultationChat/MessageBubbles/PatientMessageBubble";
import { ReactComponent as SendMessage } from "../../../assets/utils/send_message.svg";


// todo, this hardcoded values should instead be read from the context
const consultationId = "1";
const patientLanguage = "es";

const DoctorChat = () => {
  const [currentMsg, setCurrentMsg] = useState<string>("");
  const { messages, addMessage } = useChat(
    consultationId,
    true,
    patientLanguage
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

  return (
    <div className="h-full overflow-hidden">
      <div className="w-full fixed h-20 bg-blue-light top-0 left-0 flex items-center justify-center">
        <h1 className="font-bold text-2xl text-white-ghost">Patient XXX</h1>
      </div>
      <div className="grid grid-rows-2 grid-cols-2 grid-flow-row px-4 mt-6 pt-20">
        <div className="row-span-2">
          <div className="flex flex-auto flex-col">
            <form className="flex items-center flex-col">
              <label
                htmlFor="doctor_notes"
                className="font-bold text-lg text-opacity-75 whitespace-nowrap"
              >
                Your personal notes:
              </label>
              <textarea
                wrap="soft"
                name="doctor_notes"
                id="doctor_notes"
                className="resize-none border-black border w-full p-2 min-h-textarea rounded-lg outline-none focus:border-4"
              ></textarea>
            </form>
          </div>
        </div>
        <div className="row-span-3">
          <div className="flex flex-auto flex-col ml-4">
            <h1 className="text-lg font-bold text-opacity-75 text-center whitespace-nowrap">
              Your chat:
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
        <div className="col-span-full">
          <div className="flex col-span-full col-start-2">
            <form
              className="relative flex justify-end items-center p-3 bg-white w-full"
              onSubmit={sendMessage}
            >
              <label hidden htmlFor="chat_input" />
              <input
                type="text"
                name="chat input"
                className="rounded-md shadow-sm py-2 ring-2 focus:ring-blue-dark w-full tablet:w-1/2 cursor-text px-4"
                placeholder="Start messaging"
                value={currentMsg}
                onChange={(e) => setCurrentMsg(e.target.value)}
              />
              <button className="absolute right-12">
                <SendMessage />
              </button>
            </form>
          </div>
          <div className="col-span-full flex justify-center mt-6">
            <OKButton
              name="consultation_btn"
              type="submit"
              value="Start consultation"
              text="Start a consultation"
              onClick={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorChat;
