import React, { useState } from "react";
import FormInput from "../../Globals/FormInput/FormInput";
import OKButton from "../../Globals/OKButton/OKButton";
import { UserData } from "../../../types";
import { useAuth } from "../../../Contexts/Auth.context";

const Register = () => {
  const { registerPatient } = useAuth();

  const initialInfo = {
    firstName: "",
    lastName: "",
    postCode: "",
    email: "",
    password: "",
    // todo: We should read the language from the language context
    language: "",
  };

  const [userInfo, setUserInfo] = useState<UserData>(initialInfo);

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

  return (
    <div className="flex items-center flex-col bg-white-dark h-screen px-5">
      <form
        className="flex items-center justify-center bg-white flex-col h-5/6 shadow-lg mt-20 rounded-lg w-full p-3"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <h2 className="text-green text-3xl font-bold">Register</h2>
        </div>

        <div className="my-4 flex items-center justify-between flex-col w-3/4 tablet:w-2/3">
          <label htmlFor="firstName" className="mb-2">
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

        <div className="my-4 flex items-center justify-between flex-col w-3/4 tablet:w-2/3">
          <label htmlFor="lastName" className="mb-2">
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
        <div className="my-4 flex items-center justify-items-center flex-col w-3/4 tablet:w-2/3">
          <label htmlFor="postCode" className="mb-2">
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
        <div className="my-4 flex items-center justify-items-center flex-col w-3/4 tablet:w-2/3">
          <label htmlFor="email" className="mb-2">
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
        <div className="my-4 flex items-center justify-items-center flex-col w-3/4 tablet:w-2/3">
          <label htmlFor="password" className="mb-2">
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
        <OKButton
          name="register"
          type="submit"
          value="Register"
          text="Register"
          onClick={() => {}}
        />
      </form>
    </div>
  );
};

export default Register;
