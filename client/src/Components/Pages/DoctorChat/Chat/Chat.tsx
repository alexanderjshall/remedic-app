import React, { useState, useRef, useEffect } from "react";

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
    <div className="flex flex-col h-full w-full pt-32">
      <div className="flex-grow overflow-auto flex flex-col mx-6 rounded-t-xl shadow-2xl pb-3 bg-white">
        {messages.length === 0 ? (
            <h1 className="text-center font-bold text-lg text-blue mt-8 text-opacity-75 flex-grow">
              Start chatting with {patientFullName}
            </h1>
        ) : null}
        {messages &&
          messages.map((message, idx) =>
            message.isAuthor ? (
              <DoctorMessageBubble message={message} key={idx} />
            ) : (
              <PatientMessageBubble message={message} key={idx} />
            )
          )}
        <div ref={chatBottom} className="h-4"></div>
      </div>
      <form
        className="flex justify-center items-center bg-white rounded-b-xl mx-6 shadow-2xl mb-8 px-4 pb-2 z-10"
        onSubmit={sendMessage}
      >
        <label hidden htmlFor="chat input" />
        <div className="w-full flex rounded-lg border-blue border-2 border-solid focus:border-blue-dark bg-gray-100 mx-6">
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
