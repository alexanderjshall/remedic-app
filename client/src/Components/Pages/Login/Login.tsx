import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../Contexts/Auth.context";
import { validateLoginForm } from "../../../utils/auth/validation.helper";
import AuthButton from "../../Globals/AuthButton/AuthButton";
import FormInput from "../../Globals/FormInput/FormInput";
import OKButton from "../../Globals/OKButton/OKButton";
import logoReduced from "../../../assets/logos/logo-reduced.svg";

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

  const toggleErrorBoard = () => {
    document
      .getElementById("error_board")
      ?.classList.remove("translate-y-full");
  };

  const updateInput = (inputName: string, value: string) => {
    setUserInfo({ ...userInfo, [inputName]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await loginUser(userInfo.email, userInfo.password);
      !res && toggleErrorBoard();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center flex-col bg-white-dark h-screen lg:m-1 w-inherit min-w-min py-4">
      <form
        className="relative bg-white h-full w-5/6 max-w-xl shadow-lg  rounded-lg p-12 grid place-items-center grid-rows-3 gap-y-20"
        onSubmit={handleSubmit}
      >
        <div className="z-10">
          <h2 className="bg-gradient-to-r from-green-light to-blue-light bg-clip-text text-transparent text-5xl font-bold px-6 py-5">
            Login
          </h2>
        </div>

        <div className="items-center flex flex-col space-y-3 z-10 tablet:w-3/4">
          <label htmlFor="email" className="font-bold">
            Email:
          </label>
          <FormInput
            type="email"
            placeholder="Email"
            id="email"
            name="email"
            updateInput={updateInput}
            onSubmit={() => {}}
          />
          <label htmlFor="password" className="font-bold">
            Password:
          </label>
          <FormInput
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            updateInput={updateInput}
            onSubmit={() => {}}
          />
        </div>
        <div className="flex flex-col align-center">
          <AuthButton
            name="Login Button"
            value="Login"
            text="Login"
            condition={validateLoginForm(userInfo.email, userInfo.password)}
          />
          <h2 className="center my-4 text-center">— OR —</h2>
          <Link to="/register">
            <p className="text-blue hover:text-blue-dark text-center">
              Register
            </p>
          </Link>
        </div>
        <img src={logoReduced} className="w-72 opacity-10 absolute top-0"></img>
      </form>
      <div
        className=" flex items-center justify-center p-3 w-2/3 shadow-lg rounded-lg bg-red-500 fixed bottom-0 left-1/2 transform-gpu -translate-x-1/2 translate-y-full h-16"
        id="error_board"
      >
        <p className="text-lg text-center">Invalid email or password</p>
      </div>
    </div>
  );
};

export default Login;
