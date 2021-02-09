import React, { useEffect, useState } from "react";
import FormInput from "../../Globals/FormInput/FormInput";
import { UserData } from "../../../types";
import { useAuth } from "../../../Contexts/Auth.context";
import { Link, useHistory } from "react-router-dom";

import AuthButton from "../../Globals/AuthButton/AuthButton";
import { validateSignupForm } from "../../../utils/auth/validation.helper";

import staticTranslations from "../../../utils/static-translations.json";
const translations = staticTranslations as any;

import humanStanding from "../../../assets/background-images/humans-standing2.png";
import logoReduced from "../../../assets/logos/logo-reduced.svg";
import { Transition } from "@headlessui/react";

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
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferredLanguage");
    if (!savedLanguage) {
      history.push("/language");
      return;
    }
    setUserInfo((prevInfo) => ({ ...prevInfo, language: savedLanguage }));
  }, [history]);

  const updateInput = (inputName: string, value: string) => {
    setError(false)
    setUserInfo({ ...userInfo, [inputName]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await registerPatient(userInfo);
      !res && setError(true);
    } catch (error) {
      console.error(error);
    }
  };

  const localText = translations[localLanguage].loginAndRegisterTerms;

  return (
    <Transition
    appear={true}
    show={true}
    enter="transition-opacity ease-in-out duration-700"
    enterFrom="opacity-0"
    enterTo="opacity-100"
    className="flex items-center justify-center flex-col bg-white-dark min-h-screen w-inherit min-w-min py-4"
  >
      <h2 className="bg-gradient-to-r from-green-light to-blue-light bg-clip-text text-transparent text-5xl font-bold px-6 py-5 text-center mt-8">
        {localText.register}
      </h2>
      <form
        className="relative bg-white flex flex-col shadow-lg rounded-lg w-5/6 p-12 gap-y-6 tablet:h-full"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col w-full items-center z-10">
          <label htmlFor="firstName" className=" font-bold text-blue self-start mb-2">
            {localText.firstName}
          </label>
          <FormInput
            type="text"
            placeholder={localText.firstName}
            id="firstName"
            name="firstName"
            updateInput={updateInput}
            onSubmit={() => {}}
          />
        </div>

        <div className="flex flex-col w-full items-center z-10">
          <label htmlFor="lastName" className="font-bold text-blue self-start mb-2">
            {localText.lastName}
          </label>
          <FormInput
            type="text"
            placeholder={localText.lastName}
            id="lastName"
            name="lastName"
            updateInput={updateInput}
            onSubmit={() => {}}
          />
        </div>

        <div className="flex flex-col w-full items-center z-10">
          <label htmlFor="postCode" className=" font-bold text-blue self-start mb-2">
            {localText.postcode}
          </label>
          <FormInput
            type="text"
            placeholder="SW1A 1AA"
            id={localText.postcode}
            name="postCode"
            updateInput={updateInput}
            onSubmit={() => {}}
          />
        </div>

        <div className="flex flex-col w-full items-center z-10">
          <label htmlFor="email" className=" font-bold text-blue self-start mb-2">
            {localText.email}
          </label>
          <FormInput
            type="email"
            placeholder={localText.email}
            id="email"
            name="email"
            updateInput={updateInput}
            onSubmit={() => {}}
          />
        </div>

        <div className="flex flex-col w-full items-center z-10">
          <label htmlFor="password" className=" font-bold text-blue self-start mb-2">
            {localText.password}
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

        <div className="flex flex-col items-center mt-4 z-10">
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
          <h2 className="center text-center my-2 text-blue-dark tracking-tighter">——————</h2>
          <Link to="/login">
          <p className="text-blue hover:text-blue-dark text-center">
            {localText.login}
          </p>
        </Link>
        </div>
        <div className="absolute mx-auto w-full left-0">
        <img
          src={humanStanding}
          alt="background human"
          className="opacity-10"
        ></img>
        </div>
      </form>
      <div
        className={`flex items-center justify-center p-3 w-2/3 shadow-lg rounded-lg
        bg-red-500 fixed bottom-5 bg-opacity-90 transition transform-gpu duration-500
        ${!error && "translate-y-full opacity-0"} h-16 text-white font-bold border-red-dark
        border-solid border-2 text-lg z-20`}
        id="error_board"
      >
        <p className="text-lg text-center">{localText.errorMessage}</p>
      </div>
      <img
        src={logoReduced}
        alt="background logo"
        className="absolute w-24 top-5 opacity-10 left-1/2 transform-gpu -translate-x-1/2"
      ></img>
    </Transition>
  );
};

export default Register;
