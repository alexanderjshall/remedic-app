import React from 'react'

interface Props {
  name: string;
  type: 'button' | 'submit' | 'reset';
  value: string;
  text: string;
  onClick: () => void;
}

function OKButton(props: Props) {
  const {name, type, value, text, onClick} = props

  return (
    <button
    className="mt-4 p-2 bg-gray-light focus:bg-white hover:bg-gray rounded-md"
      name={name}
      type={type}
      value={value}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default OKButton
