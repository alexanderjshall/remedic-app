import React, { createContext, useState, ReactChild, useContext } from "react";
import {
  getTokenFromStorage,
  checkUser,
  AuthUser,
  loginWithCredentials,
  createPatient,
} from "../utils/auth/auth.helper";
import { UserData } from "../types";

export interface AppContextInterface {
  user: AuthUser | null;
  logout: () => void;
  loginUser: (email: string, password: string) => Promise<AuthUser | null>;
  registerPatient: (inputData: UserData) => Promise<AuthUser | null>;
}

const initialContext = {
  user: null,
  logout: () => {},
  loginUser: (email: string, password: string) => Promise.resolve(null),
  registerPatient: () => Promise.resolve(null),
};

export const AuthContext = createContext<AppContextInterface>(initialContext);

interface Props {
  children: ReactChild | ReactChild[];
}

const AuthContextProvider = (props: Props) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  async function setUpContext() {
    const savedUser = getTokenFromStorage();
    const checkedUser = await checkUser(savedUser);
    setUser(checkedUser);
  }
  (async () => {
    if (!user) await setUpContext();
  })();

  function logout() {
    localStorage.removeItem("authToken");
    setUser(null);
  }

  async function loginUser(
    email: string,
    password: string
  ): Promise<AuthUser | null> {
    const user = await loginWithCredentials(email, password);
    if (!user) return null;
    setUser(user);
    return user;
  }

  async function registerPatient(userData: UserData) {
    const user = await createPatient(userData);
    if (!user) return null;
    setUser(user);
    return user;
  }

  return (
    <AuthContext.Provider
      value={{ user, logout, loginUser, registerPatient }}
      {...props}
    />
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContextProvider;
