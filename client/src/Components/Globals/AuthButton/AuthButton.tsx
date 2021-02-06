import React from 'react';

interface Props {
  name: string;
  value: string;
  text: string;
  condition: boolean;
}

function AuthButton(props: Props) {
  const { name, value, text, condition } = props;

  return (
    <button
      className='px-6 py-3 -full ring-2 bg-blue-light rounded-lg lg:m-0 hover:bg-blue-dark ring-opacity-50 w-40 hover:ring-4 hover:ring-blue-dark disabled:opacity-30'
      name={name}
      type='submit'
      value={value}
      disabled={condition}
    >
      {text}
    </button>
  );
}

export default AuthButton;
