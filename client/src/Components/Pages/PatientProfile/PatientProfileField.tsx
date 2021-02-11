import React, { useContext, useEffect, useState } from 'react'
import {ProfileField} from './PatientProfile';
import { PatientContext } from "../../../Contexts/Patient.context";

function PatientProfileField(props: ProfileField) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const {name, value, type, info, updateValue} = props;
  const [newValue, setNewValue] = useState<string>(value);

  const { getTranslatedText } = useContext(PatientContext)!;
  const translatedText = getTranslatedText();
  const localText = translatedText.profilePage;

  useEffect(() => {
    setNewValue(value);
  }, [])

  const onEditClick = () => {
    setIsEditing(true);
    setNewValue(value);
  }

  const handleSubmit = () => {
    updateValue(info, newValue);
    setIsEditing(false);
  }

  const handleEnter: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') handleSubmit();
  }

  const onCancelClick = () => {
    setNewValue(value);
    setIsEditing(false);
  }

  const handleValueChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    setNewValue(e.currentTarget.value);
  }

  return (
    <div className="flex flex-col mt-3 w-full h-36 rounded-xl p-2 bg-blue text-white">
      <h3 className="pl-2 font-extrabold text-sm text-green-light">{name}</h3>
        {isEditing
          ? <div className="flex-grow flex justify-between items-center m-1.5">
                <input type="text" id={info} value={newValue} onChange={handleValueChange} autoFocus={isEditing}
                className="text-black px-2 rounded-md shadow-sm py-1 ring-2 focus:ring-blue-dark w-1/2 cursor-text"
                onSubmit={()=>handleSubmit()} onKeyPress={handleEnter}/>
                <div className="flex flex-col justify-around h-full items-center py-1">
                  <button className="font-semibold border-invisible rounded-md px-4 py-1 bg-green-dark text-white ml-1"
                          onClick={() => handleSubmit()}
                          type='submit'
                  >{localText.save}</button>
                  <button className="font-semibold border-invisible rounded-md px-4 py-1 bg-red-negative text-white ml-1" onClick={() => onCancelClick()}
                  >{localText.cancel}</button>
                </div>

            </div>
          :  <div className="flex-grow flex justify-between items-center m-1.5">
              <p className="text-lg break-words"><b>{value}</b></p>
              <button className="text-blue font-semibold border-invisible rounded-md px-4 py-1 ml-2 bg-blue-superlight" onClick={() => onEditClick()}
              >{localText.edit}</button>
            </div>

        }
    </div>
  )
}

export default PatientProfileField;
