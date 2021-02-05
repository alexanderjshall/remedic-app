import { useEffect, useRef, useState } from "react";
import io , {Socket} from "socket.io-client";
import { getTranslatedText } from "../services/api.translate";
import { Message } from "../types";

const useChat = (roomId: string, isDoctor: boolean, patientLanguage : string, onConsultationFinish: () => void) => {


  const [messages, setMessages] = useState<Message[]>([]);
  const socketRef = useRef<typeof Socket>();

  useEffect(()=> {

    socketRef.current = io(process.env.REACT_APP_CHAT_URL as string)
    socketRef.current.emit('join chat', roomId);
    
    socketRef.current.on('leave consultation', () => {
      if (socketRef.current) {
        socketRef.current.emit('leave consultation', roomId);
        onConsultationFinish();
      }
    });

    socketRef.current.on('doctor message', async (msg: string) => {

      if (!isDoctor) {
        msg = await getTranslatedText(msg, 'en', patientLanguage);
      }

      const newMessage = {
        name: 'Doctor',
        content: msg,
        isAuthor: isDoctor,
        timestamp:''
      }
      setMessages(prevMesages => [...prevMesages, newMessage])
    });

    socketRef.current.on('patient message',async (msg: string) => {

      if (isDoctor) {
        msg = await getTranslatedText(msg, patientLanguage, 'en');
      }

      const newMessage = {
        name: 'Me',
        content: msg,
        isAuthor: !isDoctor,
        timestamp:''
      }
      setMessages(prevMesages => [...prevMesages, newMessage])
    });

    

  }, [roomId, isDoctor])

  const addMessage = (msg: string) => {
    const messageType = isDoctor ? 'doctor message' : 'patient message';
    if (socketRef.current) {
      socketRef.current.emit(messageType, roomId, msg);
    }
  }

  const endConsultation = () => {
    if (socketRef.current) {
    socketRef.current.emit('end consultation', roomId);
    }
  }

  return {messages, addMessage, endConsultation}
}

export default useChat
