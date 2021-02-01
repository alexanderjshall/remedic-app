import React, { createContext, useState, ReactChild } from 'react';
import { User, blankUser } from '../types';

export interface AppContextInterface {
  user: User;
}

export const AuthContext = createContext<AppContextInterface | null>(null);

interface Props {
  children: ReactChild | ReactChild[]
}


const AuthContextProvider = (props: Props) => {
  const [user, setUser] = useState<User>(blankUser);

  return (
    <AuthContext.Provider value={{ user }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;