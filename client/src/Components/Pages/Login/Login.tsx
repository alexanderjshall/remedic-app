import React, { useState } from "react";
import { useAuth } from "../../../Contexts/Auth.context";
import FormInput from "../../Globals/FormInput/FormInput";
import OKButton from "../../Globals/OKButton/OKButton";

const Login = () => {
  const { loginUser } = useAuth();

  interface Credentials {
    email: string;
    password: string;
  }

  const [userInfo, setUserInfo] = useState<Credentials>({
    email: "",
    password: "",
  });

  const updateInput = (inputName: string, value: string) => {
    setUserInfo({ ...userInfo, [inputName]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await loginUser(userInfo.email, userInfo.password);
      console.log("res", res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center h-screen justify-content-center flex-col bg-white-dark">
      <form
        className="flex items-center justify-center bg-white flex-col h-2/3 w-1/3 shadow-lg mt-20 rounded-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-green-default font-title">Login</h2>
        <FormInput
          type="email"
          placeholder="Email"
          id="email"
          name="email"
          updateInput={updateInput}
          onSubmit={() => {}}
        />
        <FormInput
          type="password"
          placeholder="Password"
          id="password"
          name="password"
          updateInput={updateInput}
          onSubmit={() => {}}
        />
        <OKButton
          name="login"
          type="submit"
          value="Login"
          text="Login"
          onClick={() => {}}
        />
      </form>
    </div>
  );
};

export default Login;
