import React, { useState } from "react";
import OKButton from "../../Globals/OKButton/OKButton";
import DoctorMessageBubble from "../ConsultationChat/MessageBubbles/DoctorMessageBubble";
import PatientMessageBubble from "../ConsultationChat/MessageBubbles/PatientMessageBubble";
import useChat from "../../../hooks/useChat";

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
    <div className="h-screen overflow-hidden">
      <div className="mt-8 mx-6 h-full">
        <div className=" absolute top-0 left-0 w-screen bg-blue flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="white"
            className="w-10 h-10"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
              clipRule="evenodd"
            />
          </svg>
          <h1 className="text-3xl p-4 text-white-dark text-bold">
            Patient name
          </h1>
        </div>
        <div className="flex px-6 pb-6 pt-12 min-h-3/4 rounded-lg">
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
          <div className="flex flex-auto flex-col ml-4">
            <h1 className="text-lg font-bold text-opacity-75 text-center whitespace-nowrap">
              Your chat:
            </h1>

            <div className=" flex flex-col pb-3 h-screen">
              <div className=" flex border border-black h-2/3 rounded-lg flex-col overflow-auto">
                {messages &&
                  messages.map((message, idx) =>
                    message.isAuthor ? (
                      <DoctorMessageBubble message={message} key={idx} />
                    ) : (
                      <PatientMessageBubble message={message} key={idx} />
                    )
                  )}
              </div>
              <form
                className="relative flex justify-center items-center p-3 bg-white"
                onSubmit={sendMessage}
              >
                <label hidden htmlFor="chat input" />
                <input
                  type="text"
                  name="chat input"
                  className="p-3 rounded-lg cursor-text focus:border-blue-dark h-16 border-2 border-blue border-solid w-full"
                  placeholder="Start messaging"
                  value={currentMsg}
                  onChange={(e) => setCurrentMsg(e.target.value)}
                />
                <button className="absolute right-5/100">
                  <svg
                    className="w-12 h-12 fill-current text-green-dark"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </form>
              <div className="flex justify-center">
                <OKButton
                  name="consultation_btn"
                  type="submit"
                  value="Start consultation"
                  text="Start a consultation"
                  onClick={()=>{}}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorChat;
