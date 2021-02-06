import React from "react";

interface Props {
  name: string;
  type: "button" | "submit" | "reset";
  value: string;
  text: string;
  onClick: () => void;
}

function OKButton(props: Props) {
  const { name, type, value, text, onClick } = props;

  return (
    <button
      className="px-6 py-3 -full ring-2 bg-blue-light rounded-lg lg:m-0 hover:bg-blue-dark ring-opacity-50 max-w-1/2  hover:ring-4 hover:ring-blue-dark font-bold text-white"
      name={name}
      type={type}
      value={value}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default OKButton;
//
//px-4 w-30 mt-3 rounded-md shadow-sm p-2 ring-2 focus:ring-blue-dark
