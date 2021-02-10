import React, { useContext, useEffect, useRef, useState } from "react";
import DoctorMessageBubble from "./MessageBubbles/DoctorMessageBubble";
import PatientMessageBubble from "./MessageBubbles/PatientMessageBubble";
import useChat from "../../../hooks/useChat";
import { ReactComponent as SendMessageArrow } from "../../../assets/utils/send_message.svg";
import { ReactComponent as UserIcon } from "../../../assets/utils/user_icon.svg";
import Doctor from "../../../assets/background-images/humans-standing.png";
import PatientImg from "../../../assets/background-images/humans-sitting3.png";
import ChatImg from "../../../assets/utils/chatsymbol.svg";

import { useAuth } from "../../../Contexts/Auth.context";
import { ConsultationContext } from "../../../Contexts/Consultation.context";
import SuccessTick from "../../Globals/SuccessTick/SuccessTick";
import { useHistory } from "react-router-dom";

import { PatientContext } from "../../../Contexts/Patient.context";
import { Transition } from "@headlessui/react";

// ROUTE -> '/consultation/chat'
const ConsultationChat = () => {
  const history = useHistory();

  const { user } = useAuth();
  const { getConsultationId, doctor, resetContext } = useContext(ConsultationContext)!;

  const doctorFullName = `${doctor.firstName} ${doctor.lastName}`;

  const { getTranslatedText } = useContext(PatientContext)!;
  const translatedText = getTranslatedText();
  const localText = translatedText.chat;
  const localConfirmationText = translatedText.confirmationPage;

  const { messages, addMessage } = useChat(
    String(getConsultationId()),
    false,
    doctorFullName,
    "",
    user!.language,
    () => {
      resetContext();
      history.push("/consultation/feedback");
    }
  );

  const [currentMsg, setCurrentMsg] = useState("");

  const chatBottom = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatBottom.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!getConsultationId()) {
      history.push("/consultation/enter_code");
    }
  }, []);

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
    <>
      {messages.length === 0 ? (
        <Transition
          appear={true}
          show={true}
          enter="transition-opacity delay-75 ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          className="h-full flex items-center px-3 flex-col"
        >
          <SuccessTick size={150} />
          <h1 className="text-bold text-2xl text-center">
            {localConfirmationText.thankYou}
          </h1>
          <h2 className="text-bold text-xl text-center">
            {localConfirmationText.doctorHereShortly}
          </h2>
          <img
            src={Doctor}
            alt="bg_human"
            className="absolute bottom-16 left-5 opacity-10 w-72 "
          />
        </Transition>
      ) : (
        <div className="flex flex-col w-full min-h-full">
          <div className="bg-blue-light h-16 w-full fixed top-0 flex items-center justify-center z-20">
            <img
              src={ChatImg}
              alt="Your Chat"
              className="w-12 text-white"
            ></img>
            <h3 className="text-xl text-white-cream mx-2 font-extrabold">
              {doctor.firstName} {doctor.lastName}
            </h3>
            <UserIcon />
          </div>
          <div className="flex-grow mt-16 overflow-auto flex flex-col px-2 w-full max-w-4xl mx-auto z-10">
            {messages &&
              messages.map((message, idx) =>
                message.isAuthor ? (
                  <PatientMessageBubble message={message} key={idx} />
                ) : (
                  <DoctorMessageBubble message={message} key={idx} />
                )
              )}
            <div ref={chatBottom} className="h-12"></div>
          </div>
          <form
            className="flex justify-center items-center p-2 fixed left-0 bottom-0 bg-white w-full z-20"
            onSubmit={sendMessage}
          >
            <label hidden htmlFor="chat input" />
            <div className="w-full flex rounded-lg border-blue border-2 border-solid focus:border-blue-dark bg-gray-100">
              <input
                type="text"
                name="chat input"
                className="p-3 cursor-text h-12 w-11/12 rounded-lg bg-transparent"
                placeholder={localText.startMessaging}
                onChange={(e) => setCurrentMsg(e.target.value)}
                value={currentMsg}
              />
              <button>
                <SendMessageArrow />
              </button>
            </div>
          </form>
          <img
            src={Doctor}
            alt="doctor image"
            className="fixed top-12 min-w-full mx-auto opacity-10"
          />
        </div>
      )}
    </>
  );
};

export default ConsultationChat;
