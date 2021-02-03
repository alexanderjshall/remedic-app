import { queries } from "@testing-library/react";
import React, { createContext, useState, ReactChild, useContext } from "react";
import {
  getTokenFromStorage,
  checkUser,
  AuthUser,
} from "../utils/auth/auth.helper";

export interface AppContextInterface {
  user: AuthUser | null;
}

export const AuthContext = createContext<AppContextInterface>({ user: null });

interface Props {
  children: ReactChild | ReactChild[];
}

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = (props: Props) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  async function setUpContext() {
    const savedUser = getTokenFromStorage();
    const checkedUser = await checkUser(savedUser);
    setUser(checkedUser);
  }

  setUpContext();

  return (
    <AuthContext.Provider value={{ user }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
