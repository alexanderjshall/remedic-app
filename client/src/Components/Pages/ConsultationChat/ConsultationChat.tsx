import React from "react";

// bg-gradient-to-b from-blue-light via-blue-50 to-white-ghost
interface Message {
  isAuthor: boolean;
  content: string;
  timestamp: string;
}

const message: Message = {
  isAuthor: true,
  content: "This is a patient message",
  timestamp: "7:20am",
};

// '/consultation_chat'
const ConsultationChat = () => {
  return (
    <div className="flex-col flex justify-center w-screen">
      <div className="relative flex flex-col shadow-md justify-evenly items-center p-3 pb-16 overflow-hidden h-screen">
        <div className="border border-gray rounded-lg w-full flex flex-col justify-end h-full mb-3">
          <div className="h-5/6 flex flex-col justify-end">
            <form className="w-full m-4 p-3">
              <label hidden htmlFor="chat input" />
              <input
                type="text"
                name="chat input"
                className="p-3 rounded-lg cursor-text focus:border-blue-dark h-16 border-2 border-blue border-solid w-11/12"
                placeholder="Start messaging"
              />
            </form>
          </div>
        </div>
        <div className="bg-blue h-16 w-screen fixed bottom-0"></div>
      </div>
    </div>
  );
};

export default ConsultationChat;
