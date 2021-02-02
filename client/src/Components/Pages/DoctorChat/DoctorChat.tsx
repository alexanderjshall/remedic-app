import React, {useEffect, useState} from "react";
import OKButton from "../../Globals/OKButton/OKButton";
import DoctorMessageBubble from "../ConsultationChat/MessageBubbles/DoctorMessageBubble";
import PatientMessageBubble from "../ConsultationChat/MessageBubbles/PatientMessageBubble";
import { Message } from "../../../types";
import io from "socket.io-client";


const handleSubmit = () => {};

// const patientMessage: Message = {
//   name: "Miss Doubtfire",
//   isAuthor: true,
//   content: "This is a patient message",
//   timestamp: "7:20am",
// };

// const doctorMessage: Message = {
//   name: "Doctor Zivago",
//   isAuthor: false,
//   content: "this is a doctor message",
//   timestamp: "7:21am",
// };

const consultationSocket = io('http://localhost:5000',);
const consultationId = '1';

const DoctorChat = () => {

  const [currentMsg, setCurrentMsg] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const sendMessage = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  try {
    if (currentMsg.length > 0)
    {
      consultationSocket.emit('doctor message', consultationId, currentMsg);
      setCurrentMsg('');
    }
  } catch (error) {
    throw new Error(error);
  }
  }

  useEffect(() => {
    consultationSocket.emit('join chat', consultationId);
    consultationSocket.on('doctor message', (msg: string) => {
      const newMessage = {
        name: 'Doctor',
        content: msg,
        isAuthor: true,
        timestamp:''
      }
      setMessages(prevMesages => [...prevMesages, newMessage])
    });

    consultationSocket.on('patient message', (msg: string) => {
      const newMessage = {
        name: 'Me',
        content: msg,
        isAuthor: false,
        timestamp:''
      }
      setMessages(prevMesages => [...prevMesages, newMessage])
    });
  }, [])

  return (
    <div className="h-screen overflow-hidden">
      <div className="mt-8 mx-6 h-screen">
        <div className="p-4">
          <h1 className="text-3xl">Patient name</h1>
        </div>
        <div className="flex p-6 min-h-3/4 rounded-lg">
          <div className="flex flex-1 flex-col">
            <form className="flex items-center flex-col">
              <label
                htmlFor="doctor_notes"
                className="font-bold text-lg text-opacity-75"
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
            <h1 className="text-lg font-bold text-opacity-75 text-center ">
              Your chat:
            </h1>

            <div className=" flex flex-col pb-3">
              <div className=" flex border border-black pb-8 h-1/2 rounded-lg flex-col overflow-auto">
              {messages && messages.map((message, idx) => message.isAuthor ?
            <DoctorMessageBubble message ={message} key={idx}/> :
            <PatientMessageBubble message ={message} key={idx}/>
            )}
              </div>
              <form className="relative flex justify-center items-center p-3 bg-white" onSubmit={sendMessage}>
                <label hidden htmlFor="chat input" />
                <input
                  type="text"
                  name="chat input"
                  className="p-3 rounded-lg cursor-text focus:border-blue-dark h-16 border-2 border-blue border-solid w-full"
                  placeholder="Start messaging"
                  value={currentMsg}
                  onChange={e => setCurrentMsg(e.target.value)}
                />
                <button className="absolute right-16">
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
                  onClick={handleSubmit}
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
