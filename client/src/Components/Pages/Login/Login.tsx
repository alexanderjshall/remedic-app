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
  // flex items-center justify-around flex-col
  return (
    <div className="flex items-center justify-center flex-col bg-white-dark h-screen lg:m-1 w-inherit min-w-min">
      <form
        className=" bg-white h-3/4 w-5/6 max-w-xl shadow-lg mt-20 rounded-lg space-y-5 p-4 grid place-items-center grid-rows-3 gap-y-10"
        onSubmit={handleSubmit}
      >
        <div>
          <h2 className="bg-gradient-to-r from-green-light to-blue-light bg-clip-text text-transparent text-5xl font-bold px-6 py-5">
            Login
          </h2>
        </div>

        <div className="items-center flex flex-col space-y-3">
          <label htmlFor="email">Email:</label>
          <FormInput
            type="email"
            placeholder="Email"
            id="email"
            name="email"
            updateInput={updateInput}
            onSubmit={() => {}}
          />
          <label htmlFor="password">Password:</label>
          <FormInput
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            updateInput={updateInput}
            onSubmit={() => {}}
          />
        </div>
        <div>
          <OKButton
            name="login"
            type="submit"
            value="Login"
            text="Login"
            onClick={() => {}}
          />
        </div>
      </form>
    </div>
  );
};

export default Login;
