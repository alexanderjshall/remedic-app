import React from "react";
// import FormInput from '../../Shared-components/FormInput/FormInput';

interface Props {}

function Register(props: Props) {
  const {} = props;

  const handleChange = () => {};

  const handleSubmit = () => {};

  return (
    <div className="flex items-center justify-content-center flex-col bg-white-dark mt-8 h-full">
      <form className="flex items-center justify-center bg-white flex-col h-4/5 w-1/2 shadow-lg mt-20 rounded-lg">
        <h2 className="text-green-default">Register</h2>
        <div className="mt-3 flex items-center justify-items-center">
          <label htmlFor="firstName" className="mr-4">
            First Name
          </label>
          {/* <FormInput
            type="text"
            placeholder="First Name"
            id="firstName"
            name="firstName"
            onChange={handleChange}
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
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </div>
        <div className="mt-3 flex items-center justify-items-center">
          <label htmlFor="postCode">Last Name</label>
          <FormInput
            type="text"
            placeholder="SW1A 1AA"
            id="postCode"
            name="postCode"
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </div>
        <div className="mt-3 flex items-center justify-items-center">
          <label htmlFor="repeatPassword">Password</label>
          <FormInput
            type="password"
            placeholder="Password"
            id="repeatPassword"
            name="repeatPassword"
            onChange={handleChange}
            onSubmit={handleSubmit}
          /> */}
        </div>
        <button
          type="submit"
          className="mt-4 p-2 bg-gray-light focus:bg-white hover:bg-gray rounded-md"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
