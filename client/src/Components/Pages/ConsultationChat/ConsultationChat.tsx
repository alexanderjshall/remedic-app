import React, { useEffect, useRef, useState } from "react";
import DoctorMessageBubble from "./MessageBubbles/DoctorMessageBubble";
import PatientMessageBubble from "./MessageBubbles/PatientMessageBubble";
import useChat from "../../../hooks/useChat";
import send_message from "../../../assets/utils/send_message.svg";
import { useAuth } from "../../../Contexts/Auth.context";

// todo, this hardcoded value should instead be read from the context
const consultationId = "1";

// ROUTE -> '/consultation_chat'
const ConsultationChat = () => {
  const {user} = useAuth();

  const { messages, addMessage } = useChat(
    consultationId,
    false,
    user!.language
  );

  const [currentMsg, setCurrentMsg] = useState("");

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
    <div className="flex-col flex justify-center w-screen overflow-hidden">
      <div className="relative flex flex-col shadow-md justify-evenly items-center p-3">
        <div className="w-full h-screen flex flex-col justify-end pt-3 pb-10">
          <div className="h-20 fixed top-0 left-0 w-full z-10 bg-green-light p-3 flex items-center justify-center">
            <h1 className="text-3xl text-bold">Your chat</h1>
          </div>
          <div className="relative flex flex-col h-full overflow-auto pt-16">
            {messages &&
              messages.map((message, idx) =>
                message.isAuthor ? (
                  <PatientMessageBubble message={message} key={idx} />
                ) : (
                  <DoctorMessageBubble message={message} key={idx} />
                )
              )}
            <div ref={messagesEndRef}></div>
          </div>
          <form
            className="flex justify-center items-center p-3 fixed left-0 bottom-16 bg-white w-full"
            onSubmit={sendMessage}
          >
            <label hidden htmlFor="chat input" />
            <input
              type="text"
              name="chat input"
              className="p-3 rounded-lg cursor-text focus:border-blue-dark h-16 border-2 border-blue border-solid w-11/12"
              placeholder="Start messaging"
              onChange={(e) => setCurrentMsg(e.target.value)}
              value={currentMsg}
            />
            <button className="absolute right-12">
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
        </div>
        <div className="bg-blue h-16 w-screen fixed bottom-0 flex items-center justify-center">
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
          <h3 className="text-xl text-white-cream ml-3 font-extrabold">
            Doctor Zivago
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ConsultationChat;
