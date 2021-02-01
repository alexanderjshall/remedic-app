import React from 'react'

interface Props {
  type: string;
  placeholder: string;
  id: string;
  name: string;
  onChange: () => void;
  onSubmit: () => void;
}

function FormInput(props: Props){
  const {type, placeholder, id, name, onChange, onSubmit} = props
  return (
    <input
    type={type}
    placeholder={placeholder}
    id={id}
    name={name}
    onChange={onChange}
    onSubmit={onSubmit}
    className="mt-3 rounded-md shadow-sm p-2 ring-2 focus:ring-blue-dark"
    />
  )
}

export default FormInput
