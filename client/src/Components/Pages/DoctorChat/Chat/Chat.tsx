import React, { useState, useRef, useEffect } from "react";
import OKButton from "../../../Globals/OKButton/OKButton";

import DoctorMessageBubble from "../../ConsultationChat/MessageBubbles/DoctorMessageBubble";
import PatientMessageBubble from "../../ConsultationChat/MessageBubbles/PatientMessageBubble";
import { ReactComponent as SendMessage } from "../../../../assets/utils/send_message.svg";
import { Message } from "../../../../types";

interface Props {
  messages: Message[];
  addMessage: (mesg: string) => void;
  patientFullName: string;
}

const Chat = (props: Props) => {
  const { messages, addMessage, patientFullName } = props;
  const [currentMsg, setCurrentMsg] = useState<string>("");
  const chatBottom = useRef<null | HTMLDivElement>(null);

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

  const scrollToBottom = () => {
    chatBottom.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-full pt-32 w-full">
      <div className="flex-grow overflow-auto flex flex-col mx-6 shadow-2xl rounded-xl pb-3">
        {!messages ? (
          <div>
            <h1 className="text-center font-bold text-lg text-opacity-75">
              Start chatting with {patientFullName}
            </h1>
          </div>
        ) : null}

        {messages &&
          messages.map((message, idx) =>
            message.isAuthor ? (
              <DoctorMessageBubble message={message} key={idx} />
            ) : (
              <PatientMessageBubble message={message} key={idx} />
            )
          )}
        <div ref={chatBottom} className="h-12"></div>
      </div>
      <form
        className="flex justify-center items-center p-2 bg-white w-full tablet:mb-24"
        onSubmit={sendMessage}
      >
        <label hidden htmlFor="chat input" />
        <div className="w-full flex rounded-lg border-blue border-2 border-solid focus:border-blue-dark bg-gray-100 mt-8">
          <input
            type="text"
            name="chat input"
            className="p-3 cursor-text h-12 w-11/12 rounded-lg bg-transparent"
            placeholder="Start messaging"
            onChange={(e) => setCurrentMsg(e.target.value)}
            value={currentMsg}
          />
          <button>
            <SendMessage />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
