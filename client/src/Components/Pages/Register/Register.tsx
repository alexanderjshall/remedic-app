import React from 'react'

interface Props {}

function Register(props: Props) {
  const {} = props

  return (
    <div className="flex items-center justify-content-center flex-col bg-white-dark mt-8 h-full">
      <form className="flex items-center justify-center bg-white flex-col h-4/5 w-1/2 shadow-lg mt-20 rounded-lg">
        <h2 className="text-green-default">Register</h2>
        <div className="mt-3 flex items-center justify-items-center">
          <label htmlFor="firstName" className="mr-4">First Name</label>
          <input
            placeholder="First Name"
            type="firstName"
            name="firstName"
            id="firstName"
            className="rounded-md shadow-sm p-2 pr-6 ring-2 focus:ring-blue-dark"
          />
        </div>
        <div className="mt-3 flex items-center justify-items-center">

        </div>
        <label htmlFor="lastName">Last Name</label>
        <input
          placeholder="Last Name"
          type="lastName"
          name="lastName"
          id="lastName"
          className="mt-3 rounded-md shadow-sm p-2 ring-2 focus:ring-blue-dark"
        />
        <label htmlFor="postCode">Postcode</label>
        <input
          placeholder="SW1A 1AA"
          type="postCode"
          name="postCode"
          id="postCode"
          className="mt-3 rounded-md shadow-sm p-2 ring-2 focus:ring-blue-dark"
        />
        <label htmlFor="email">Email Address</label>
        <input
          placeholder="Email"
          type="email"
          name="email"
          id="email"
          className="mt-3 rounded-md shadow-sm p-2 ring-2 focus:ring-blue-dark"
        />
        <label htmlFor="password">Password</label>
        <input
          placeholder="Password"
          type="password"
          name="password"
          id="password"
          className="mt-3 rounded-md shadow-sm p-2 ring-2 focus:ring-blue-dark"
        />
        <label htmlFor="repeatPassword">Repeat password: </label>
        <input
          placeholder="Password"
          type="password"
          name="repeatPassword"
          id="repeatPassword"
          className="mt-3 rounded-md shadow-sm p-2 ring-2 focus:ring-blue-dark"
        />
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