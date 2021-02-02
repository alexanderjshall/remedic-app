import React from "react";
import DoctorMessageBubble from "./MessageBubbles/DoctorMessageBubble";
import PatientMessageBubble from "./MessageBubbles/PatientMessageBubble";
import {Message} from '../../../types';

// bg-gradient-to-b from-blue-light via-blue-50 to-white-ghost

const patientMessage: Message = {
  name: "Miss Doubtfire",
  isAuthor: true,
  content: "This is a patient message",
  timestamp: "7:20am",
};

const doctorMessage: Message = {
  name: "Doctor Zivago",
  isAuthor: false,
  content: "this is a doctor message",
  timestamp: "7:21am",
};

// ROUTE -> '/consultation_chat'
const ConsultationChat = () => {
  return (
    <div className="flex-col flex justify-center w-screen">
      <div className="relative flex flex-col shadow-md justify-evenly items-center p-3 pb-16">
        <div className="w-full flex flex-col justify-end py-3">
          {/* bubbles */}
          <div className="relative flex flex-col h-5/6 pb-8 overflow-auto">
            <DoctorMessageBubble message={doctorMessage} />
            <PatientMessageBubble message={patientMessage} />
            <DoctorMessageBubble message={doctorMessage} />
            <PatientMessageBubble message={patientMessage} />
            <DoctorMessageBubble message={doctorMessage} />
            <PatientMessageBubble message={patientMessage} />
            <DoctorMessageBubble message={doctorMessage} />
            <PatientMessageBubble message={patientMessage} />
            <DoctorMessageBubble message={doctorMessage} />
            <PatientMessageBubble message={patientMessage} />
            <DoctorMessageBubble message={doctorMessage} />
            <PatientMessageBubble message={patientMessage} />
            <DoctorMessageBubble message={doctorMessage} />
            <PatientMessageBubble message={patientMessage} />
            {/* input */}
          </div>
          <form className="flex justify-center items-center p-3 sticky bottom-16 bg-white">
            <label hidden htmlFor="chat input" />
            <input
              type="text"
              name="chat input"
              className="p-3 rounded-lg cursor-text focus:border-blue-dark h-16 border-2 border-blue border-solid w-11/12"
              placeholder="Start messaging"
            />
            <button className="absolute right-12">
              <svg
                className="w-12 h-12 fill-current text-green-dark"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                  clip-rule="evenodd"
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
