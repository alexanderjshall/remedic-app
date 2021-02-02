import React, { useState } from "react";
import FormInput, { FormInputType } from '../../Globals/FormInput/FormInput';
import OKButton from '../../Globals/OKButton/OKButton';

const Login = () => {
  const initialInfo = [
    {name: 'firstName', value:''},
    {name: 'lastName', value:''},
    {name: 'postCode', value:''},
    {name: 'email', value:''},
    {name: 'password', value:''},
  ]
  const [userInfo, setUserInfo] = useState<FormInputType[]>(initialInfo);


  const updateInput  = (inputName: string, value: string) => {
    const newUserInfo = userInfo.map(field => {
      if (field.name === inputName) field.value = value;
      return field;
    })
    setUserInfo(newUserInfo);
  }

  const handleSubmit= () => {
    console.log('submit being handled!');
    // Apply data validation and pass to the context
  }

  return (
    <div className="flex items-center justify-content-center flex-col bg-white-dark h-full">
      <form className="flex items-center justify-center bg-white flex-col h-2/3 w-1/3 shadow-lg mt-20 rounded-lg">
        <h2 className="text-green-default font-title">Login</h2>
        <FormInput
            type="email"
            placeholder="Email"
            id="email"
            name="email"
            updateInput={updateInput}
            onSubmit={handleSubmit}
        />
        <FormInput
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            updateInput={updateInput}
            onSubmit={handleSubmit}
        />
        <OKButton
          name="login"
          type="submit"
          value="Login"
          text="Login"
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
};

export default Login;
