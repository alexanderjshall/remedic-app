import React from "react";
import { Message } from "../../../../types";

interface Props {
  message: Message;
}

const PatientMessageBubble: React.FC<Props> = (props: Props) => {
  const { content, name, isAuthor } = props.message;
  return (
    <div
      className={` ${
        isAuthor ? "justify-end" : "justify-start"
      } flex my-5 ml-3`}
    >
      <div className="min-w-1/2 p-5 min-h-4 rounded-lg bg-green-light shadow-md flex flex-col">
        <h3 className="text-opacity-80 text-sm font-light">{name}</h3>
        <p className="text-m font-bold text-opacity-80">{content}</p>
      </div>
    </div>
  );
};

export default PatientMessageBubble;
