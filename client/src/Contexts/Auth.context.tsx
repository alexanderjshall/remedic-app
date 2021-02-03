import React, { createContext, useState, ReactChild, useContext } from "react";
import {
  getTokenFromStorage,
  checkUser,
  AuthUser,
  loginWithCredentials,
} from "../utils/auth/auth.helper";

export interface AppContextInterface {
  user: AuthUser | null;
  logout: () => void;
  loginUser: (email: string, password: string) => Promise<AuthUser | null>;
}

const initialContext = {
  user: null,
  logout: () => {},
  loginUser: (email: string, password: string) => Promise.resolve(null),
};

export const AuthContext = createContext<AppContextInterface>(initialContext);

interface Props {
  children: ReactChild | ReactChild[];
}

const AuthContextProvider = (props: Props) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  async function setUpContext() {
    console.log("Setting up context...");
    const savedUser = getTokenFromStorage();
    console.log("saved user", savedUser);
    // await checkUser(savedUser);
    const checkedUser = await checkUser(savedUser);
    console.log("Setting user from inside setupcontext, ", user);
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

  return (
    <AuthContext.Provider value={{ user, logout, loginUser }} {...props} />
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContextProvider;
