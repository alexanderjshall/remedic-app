import React from "react";
import { Message } from "../ConsultationChat";

interface Props {
  message: Message;
}

const DoctorMessageBubble = (props: Props) => {
  const { name, isAuthor, content, timestamp } = props.message;

  return (
    <div className="flex justify-end mt-5 mr-3">
      <div className="min-w-1/3 p-5 min-h-4 rounded-lg bg-blue shadow-md flex flex-col text-white">
        <h3 className="text-opacity-80 text-sm font-light">{name}</h3>
        <p className="text-m font-bold">{content}</p>
      </div>
    </div>
  );
};

export default DoctorMessageBubble;
