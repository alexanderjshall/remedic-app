import React, { useEffect, useState } from "react";
import FormInput from "../../Globals/FormInput/FormInput";
import OKButton from "../../Globals/OKButton/OKButton";
import { UserData } from "../../../types";
import { useAuth } from "../../../Contexts/Auth.context";
import { useHistory } from "react-router-dom";
import humanStanding from "../../../assets/background-images/humans-standing2.png";
import logoReduced from "../../../assets/logos/logo-reduced.svg";

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await registerPatient(userInfo);
    } catch (error) {
      console.error(error);
    }
  };
  // flex items-center justify-center
  return (
    <div className="flex justify-center bg-white-dark h-screen p-4">
      <form
        className="relative bg-white flex-col h-full shadow-lg rounded-lg w-full space-y-5 p-4 pt-8 grid place-items-center grid-rows-6 gap-y-10"
        onSubmit={handleSubmit}
      >
        <div className="mb-4 z-10">
          <h2 className="bg-gradient-to-r from-green-light to-blue-light bg-clip-text text-transparent text-5xl font-bold px-6 py-5">
            Register
          </h2>
        </div>

        <div className=" flex items-center justify-between flex-col w-3/4 tablet:w-2/3 pb-2 z-10">
          <label htmlFor="firstName" className="mb-2 font-bold text-blue">
            First Name:
          </label>
          <FormInput
            type="text"
            placeholder="First Name"
            id="firstName"
            name="firstName"
            updateInput={updateInput}
            onSubmit={() => {}}
          />
        </div>

        <div className=" flex items-center justify-between flex-col w-3/4 tablet:w-2/3 pb-2 z-10">
          <label htmlFor="lastName" className="mb-2 font-bold text-blue">
            Last Name:
          </label>
          <FormInput
            type="text"
            placeholder="Last Name"
            id="lastName"
            name="lastName"
            updateInput={updateInput}
            onSubmit={() => {}}
          />
        </div>
        <div className=" flex items-center justify-items-center flex-col w-3/4 tablet:w-2/3 pb-2 z-10">
          <label htmlFor="postCode" className="mb-2 font-bold text-blue">
            Postcode:
          </label>
          <FormInput
            type="text"
            placeholder="SW1A 1AA"
            id="postCode"
            name="postCode"
            updateInput={updateInput}
            onSubmit={() => {}}
          />
        </div>
        <div className=" flex items-center justify-items-center flex-col w-3/4 tablet:w-2/3 pb-2 z-10">
          <label htmlFor="email" className="mb-2 font-bold text-blue">
            Email Address:
          </label>
          <FormInput
            type="email"
            placeholder="Email"
            id="email"
            name="email"
            updateInput={updateInput}
            onSubmit={() => {}}
          />
        </div>
        <div className="flex items-center justify-items-center flex-col w-3/4 tablet:w-2/3 pb-2 z-10">
          <label htmlFor="password" className="mb-2 font-bold text-blue">
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
          <OKButton
            name="register"
            type="submit"
            value="Register"
            text="Register"
            onClick={() => {}}
          />
          <h2 className="center text-center my-2">——————</h2>
          <a
            href="/login"
            className="text-blue hover:text-blue-dark text-center"
          >
            Log in
          </a>
        </div>
        <img
          src={humanStanding}
          alt="background human"
          className="absolute w-96 opacity-10"
        ></img>
      </form>
      <img
        src={logoReduced}
        alt="background logo"
        className="absolute w-24 top-5 opacity-10"
      ></img>
    </div>
  );
};

export default Register;
