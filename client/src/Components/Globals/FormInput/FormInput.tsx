import React from "react";

export interface FormInputType {
  name: string;
  value: string;
}

interface Props {
  type: string;
  placeholder: string;
  id: string;
  name: string;
  updateInput: (name: string, value: string) => void;
  onSubmit: () => void;
}

function FormInput(props: Props) {
  const { type, placeholder, id, name, updateInput, onSubmit } = props;

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    updateInput(name, e.currentTarget.value);
  };

  const handleEnter: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <input
      type={type}
      placeholder={placeholder}
      id={id}
      name={name}
      onChange={handleInputChange}
      onKeyPress={handleEnter}
      className="px-4 rounded-md shadow-sm p-2 ring-2 focus:ring-blue-dark w-full tablet:w-2/3"
    />
  );
}

export default FormInput;
