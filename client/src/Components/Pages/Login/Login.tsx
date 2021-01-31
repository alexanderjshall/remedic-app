import React from "react";

const Login = () => {
  return (
    <div className="flex items-center justify-content-center flex-col bg-white-dark mt-8 h-full">
      <form className="flex items-center justify-center bg-white flex-col h-2/3 w-1/3 shadow-lg mt-20 rounded-lg">
        <h2 className="text-green-default font-title">Login</h2>
        <input
          placeholder="Email"
          type="email"
          name="email"
          id="email"
          className="mt-3 rounded-md shadow-sm p-2 ring-2 focus:ring-blue-dark"
        />
        <input
          placeholder="Password"
          type="password"
          name="password"
          id="password"
          className="mt-3 rounded-md shadow-sm p-2 ring-2 focus:ring-blue-dark"
        />
        <button
          type="submit"
          className="mt-4 p-2 bg-gray-light focus:bg-white hover:bg-gray rounded-md"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
