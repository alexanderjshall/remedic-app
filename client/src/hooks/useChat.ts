import { useState } from "react";
import { Socket } from "socket.io-client"
import { Message } from "../types";

const useChat = (socket: typeof Socket, roomId: string, isDoctor: boolean) => {

  socket.removeAllListeners()

  const [messages, setMessages] = useState<Message[]>([]);

  socket.emit('join chat', roomId);

  socket.on('doctor message', (msg: string) => {
    console.log('recieved doc mesg');

    const newMessage = {
      name: 'Doctor',
      content: msg,
      isAuthor: isDoctor,
      timestamp:''
    }
    setMessages(prevMesages => [...prevMesages, newMessage])
  });

  socket.on('patient message', (msg: string) => {
    const newMessage = {
      name: 'Me',
      content: msg,
      isAuthor: !isDoctor,
      timestamp:''
    }
    setMessages(prevMesages => [...prevMesages, newMessage])
  });

  const addMessage = (msg: string) => {

    const messageType = isDoctor ? 'doctor message' : 'patient message';
    socket.emit(messageType,roomId, msg);
  }

  return {messages, addMessage}
}

export default useChat
