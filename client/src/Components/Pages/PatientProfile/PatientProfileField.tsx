import React, { useContext, useEffect, useState } from "react";
import { ProfileField } from "./PatientProfile";
import { PatientContext } from "../../../Contexts/Patient.context";

function PatientProfileField(props: ProfileField) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { name, value, type, info, updateValue } = props;
  const [newValue, setNewValue] = useState<string>(value);

  const { getTranslatedText } = useContext(PatientContext)!;
  const translatedText = getTranslatedText();
  const localText = translatedText.profilePage;

  useEffect(() => {
    setNewValue(value);
  }, []);

  const onEditClick = () => {
    setIsEditing(true);
    setNewValue(value);
  };

  const handleSubmit = () => {
    updateValue(info, newValue);
    setIsEditing(false);
  };

  const handleEnter: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  const onCancelClick = () => {
    setNewValue(value);
    setIsEditing(false);
  };

  const handleValueChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    setNewValue(e.currentTarget.value);
  };

  return (
    <div className="mt-3 w-full rounded-xl shadow-lg bg-gray-100 p-2">
      <h3 className="mb-1">{name}</h3>
      {isEditing ? (
        <div className="flex justify-between items-center flex-wrap m-1.5">
          <input
            type="text"
            id={info}
            value={newValue}
            onChange={handleValueChange}
            autoFocus={isEditing}
            className="px-2 rounded-md shadow-sm py-1 ring-2 focus:ring-blue-dark w-1/2 cursor-text"
            onSubmit={() => handleSubmit()}
            onKeyPress={handleEnter}
          />
          <button
            className="border-invisible rounded-md px-4 py-1 bg-green-dark text-white ml-1"
            onClick={() => handleSubmit()}
            type="submit"
          >
            {localText.save}
          </button>
          <button
            className="border-invisible rounded-md px-4 py-1 bg-red-negative text-white ml-1"
            onClick={() => onCancelClick()}
          >
            {localText.cancel}
          </button>
        </div>
      ) : (
        <div className="flex justify-between items-center flex-wrap">
          <p>
            <b>{value}</b>
          </p>
          <button
            className="border-invisible rounded-md px-4 py-1 ml-2 bg-blue-superlight"
            onClick={() => onEditClick()}
          >
            {localText.edit}
          </button>
        </div>
      )}
    </div>
  );
}

export default PatientProfileField;
