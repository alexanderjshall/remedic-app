import React from "react";
import { Message } from "../ConsultationChat";

interface Props {
  message: Message;
}

const PatientMessageBubble = (props: Props) => {
  const { content, name } = props.message;
  return (
    <div className="flex mt-5 ml-3">
      <div className="min-w-1/3 p-5 min-h-4 rounded-lg bg-green-light shadow-md flex flex-col">
        <h3 className="text-opacity-80 text-sm font-light">{name}</h3>
        <p className="text-m font-bold text-opacity-80">{content}</p>
      </div>
    </div>
  );
};

export default PatientMessageBubble;
