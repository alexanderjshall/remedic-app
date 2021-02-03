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
    <div className="flex items-center justify-content-center flex-col bg-white-dark h-full lg:m-1 w-inherit min-w-min">
      <form className="flex items-center justify-center bg-white flex-col h-3/4 w-5/6 max-w-xl shadow-lg mt-20 rounded-lg space-y-5">
        <h2 className="text-green-default font-title .text-3xl leading-3">Login</h2>
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
