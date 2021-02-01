import React, { useState } from 'react'
import FormInput, { FormInputType } from '../../Globals/FormInput/FormInput';

interface Props {}

function Register(props: Props) {
  const {} = props;
  const initialInfo = [
    {name: 'firstName', value:''},
    {name: 'lastName', value:''},
    {name: 'postCode', value:''},
    {name: 'email', value:''},
    {name: 'password', value:''},
  ]
  const [userInfo, setUserInfo] = useState<FormInputType[]>(initialInfo);

  const updateInput  = (inputName: string, value: string) => {
    console.log(`state before: ${userInfo[0].value}`);
    const newUserInfo = userInfo.map(field => {
      if (field.name === inputName) field.value = value;
      return field;
    })
    setUserInfo(newUserInfo);
    console.log(`state after: ${userInfo[0].value}`);
  }

  const handleSubmit= () => {
    console.log('submit being handled!');
    // Apply data validation and pass to the context
  }

  return (
    <div className="flex items-center justify-content-center flex-col bg-white-dark mt-8 h-full">
      <form className="flex items-center justify-center bg-white flex-col h-4/5 w-1/2 shadow-lg mt-20 rounded-lg">
        <h2 className="text-green-default">Register</h2>
        <div className="mt-3 flex items-center justify-items-center">
          <label htmlFor="firstName" className="mr-4">First Name</label>
          <FormInput
            type="text"
            placeholder="First Name"
            id="firstName"
            name="firstName"
            updateInput={updateInput}
            onSubmit={handleSubmit}
          />
        </div>
        <div className="mt-3 flex items-center justify-items-center">
          <label htmlFor="lastName">Last Name</label>
          <FormInput
            type="text"
            placeholder="Last Name"
            id="lastName"
            name="lastName"
            updateInput={updateInput}
            onSubmit={handleSubmit}
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
            onSubmit={handleSubmit}
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
            onSubmit={handleSubmit}
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
            onSubmit={handleSubmit}
          />
        </div>
        <button
          type="submit"
          className="mt-4 p-2 bg-gray-light focus:bg-white hover:bg-gray rounded-md"
        >
          Register
        </button>
      </form>
    </div>
  )
}

export default Register