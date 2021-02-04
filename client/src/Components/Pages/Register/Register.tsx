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
    <div className="flex items-center justify-content-center flex-col bg-white-dark h-full">
      <form
        className="flex items-center justify-center bg-white flex-col h-4/5 w-1/2 shadow-lg mt-20 rounded-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-green-default">Register</h2>
        <div className="mt-3 flex items-center justify-between">
          <FormInput
            type="text"
            placeholder="First Name"
            id="firstName"
            name="firstName"
            updateInput={updateInput}
            onSubmit={() => {}}
          />
        </div>
        <div className="mt-3 flex items-center justify-between">
          <label htmlFor="lastName">Last Name</label>
          <FormInput
            type="text"
            placeholder="Last Name"
            id="lastName"
            name="lastName"
            updateInput={updateInput}
            onSubmit={() => {}}
          />
        </div>
        <div className="mt-3 flex items-center justify-items-center">
          <label htmlFor="postCode">Postcode</label>
          <FormInput
            type="text"
            placeholder="SW1A 1AA"
            id="postCode"
            name="postCode"
            updateInput={updateInput}
            onSubmit={() => {}}
          />
        </div>
        <div className="mt-3 flex items-center justify-items-center">
          <label htmlFor="email">Email Address</label>
          <FormInput
            type="email"
            placeholder="Email"
            id="email"
            name="email"
            updateInput={updateInput}
            onSubmit={() => {}}
          />
        </div>
        <div className="mt-3 flex items-center justify-items-center">
          <label htmlFor="password">Password</label>
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
