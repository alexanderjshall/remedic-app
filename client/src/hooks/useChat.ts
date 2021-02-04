import { useEffect, useRef, useState } from "react";
import io , {Socket} from "socket.io-client";
import { Message } from "../types";

const useChat = (roomId: string, isDoctor: boolean) => {


  const [messages, setMessages] = useState<Message[]>([]);
  const socketRef = useRef<typeof Socket>();

  useEffect(()=> {

    socketRef.current = io(process.env.REACT_APP_SOCKET_URL || "http://localhost:5000")
    socketRef.current.emit('join chat', roomId);

    socketRef.current.on('doctor message', (msg: string) => {
      const newMessage = {
        name: 'Doctor',
        content: msg,
        isAuthor: isDoctor,
        timestamp:''
      }
      setMessages(prevMesages => [...prevMesages, newMessage])
    });

    socketRef.current.on('patient message', (msg: string) => {
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

  return {messages, addMessage}
}

export default useChat
