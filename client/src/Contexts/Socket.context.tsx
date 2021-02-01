import React, { createContext, useState, ReactChild } from 'react';
import {Message} from '../types';


export interface AppContextInterface {
  
}

interface Props {
  children: ReactChild | ReactChild[]
}

export const SocketContext = createContext<AppContextInterface | null>(null);

const SocketContextProvider = (props: Props) => {
  
  const [messages, setMessages] = useState<Message[]>([])
  return (
    <SocketContext.Provider value={{}}>
      {props.children}
    </SocketContext.Provider>
  );
}

export default SocketContextProvider;
