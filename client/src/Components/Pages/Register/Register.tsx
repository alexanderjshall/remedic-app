import React, { useEffect, useState } from "react";
import FormInput from "../../Globals/FormInput/FormInput";
import OKButton from "../../Globals/OKButton/OKButton";
import { UserData } from "../../../types";
import { useAuth } from "../../../Contexts/Auth.context";
import { useHistory } from "react-router-dom";

import AuthButton from "../../Globals/AuthButton/AuthButton";
import { validateSignupForm } from "../../../utils/auth/validation.helper";

import humanStanding from "../../../assets/background-images/humans-standing2.png";
import logoReduced from "../../../assets/logos/logo-reduced.svg";


import staticTranslations from "../../../utils/static-translations.json";
const translations = staticTranslations as any;

const Register = () => {
  const { registerPatient } = useAuth();
  const history = useHistory();
  const initialInfo = {
    firstName: "",
    lastName: "",
    postCode: "",
    email: "",
    password: "",
    language: "",
  };

  const localLanguage: string =
    localStorage.getItem("preferredLanguage") || "en";

  const [userInfo, setUserInfo] = useState<UserData>(initialInfo);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferredLanguage");
    if (!savedLanguage) {
      history.push("/language");
      return;
    }
    setUserInfo((prevInfo) => ({ ...prevInfo, language: savedLanguage }));
  }, [history]);

  const updateInput = (inputName: string, value: string) => {
    setUserInfo({ ...userInfo, [inputName]: value });
  };

  const toggleErrorBoard = () => {
    document
      .getElementById("error_board_register")
      ?.classList.remove("translate-y-full");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await registerPatient(userInfo);
      !res && toggleErrorBoard();
    } catch (error) {
      console.error(error);
    }
  };

  const localText = translations[localLanguage].loginAndRegisterTerms;

  return (
    <div className="flex justify-center flex-col bg-white-dark h-full px-4 py-8">
      <div className="mb-4 z-10">
        <h2 className="bg-gradient-to-r from-green-light to-blue-light bg-clip-text text-transparent text-5xl font-bold px-6 py-5 text-center">
          Register
        </h2>
      </div>
      <form
        className="relative bg-white flex-col shadow-lg rounded-lg w-full p-4 grid place-items-center gap-y-6 tablet:h-full"
        onSubmit={handleSubmit}
      >

        <div className="flex flex-col w-full items-center">
          <label htmlFor="firstName" className=" font-bold text-blue">
            First Name:
        <div className="mb-4 z-10">
          <h2 className="bg-gradient-to-r from-green-light to-blue-light bg-clip-text text-transparent text-5xl font-bold px-6 py-5">
            {localText.register}
          </h2>
        </div>

        <div className=" flex items-center justify-between flex-col w-3/4 tablet:w-2/3 pb-2 z-10">
          <label htmlFor="firstName" className="mb-2 font-bold text-blue">
            {localText.firstName}

        <div className="flex flex-col w-full items-center">
          <label htmlFor="lastName" className="font-bold text-blue">
            Last Name:
          </label>
          <FormInput
            type="text"
            placeholder={localText.lastName}
            id="lastName"
            name="lastName"
            updateInput={updateInput}
            onSubmit={() => {}}
          />
        </d

        <div className="flex flex-col w-full items-center">
          <label htmlFor="postCode" className=" font-bold text-blue">
            Postco
          </label>
          <FormInput
            type="text"
            placeholder="SW1A 1AA"
            id="postCode"
            name="postCode"
            updateInput={updateInput}
            onSubmit={() => {}}
          />
        </di
        <div className="flex flex-col w-full items-center">
          <label htmlFor="email" className=" font-bold text-blue">
            Email Addres
          </label>
          <FormInput
            type="email"
            placeholder={localText.email}
            id="email"
            name="email"
            updateInput={updateInput}
            onSubmit={() => {}}
          />
        </div

        <div className="flex flex-col w-full items-center">
          <label htmlFor="password" className=" font-bold text-blue">
            Password
          </label>
          <FormInput
            type="password"
            placeholder={localText.password}
            id="password"
            name="password"
            updateInput={updateInput}
            onSubmit={() => {}}
          />
        </div>
        <div className="flex flex-col align-center mt-4">
          <AuthButton
            name="Register Button"
            value="Register"
            text={localText.register}
            condition={validateSignupForm(
              userInfo.email,
              userInfo.password,
              userInfo.firstName,
              userInfo.lastName,
              userInfo.postCode,
              userInfo.language
            )}
          />
          <h2 className="center text-center my-2">——————</h2>
          <a
            href="/login"
            className="text-blue hover:text-blue-dark text-center"
          >
            {localText.login}
          </a>
        </div>
        <img
          src={humanStanding}
          alt="background human"
          className="absolute w-96 opacity-10"
        ></img>
      </form>
      <div
        className=" flex items-center justify-center p-3 w-2/3 shadow-lg rounded-lg bg-red-500 fixed bottom-0 left-1/2 transform-gpu -translate-x-1/2 translate-y-full h-16"
        id="error_board_register"
      >
        <p className="text-lg text-center">
          Uh oh! Seems like something went wrong!
        </p>
      </div>
      <img
        src={logoReduced}
        alt="background logo"
        className="absolute w-24 top-5 opacity-10 left-1/2 transform-gpu -translate-x-1/2"
      ></img>
    </div>
  );
};

export default Register;
