import React, { useContext, useRef, useState } from 'react'
import { useAuth } from "../../../Contexts/Auth.context";
import { PatientContext } from "../../../Contexts/Patient.context";
import { useHistory } from "react-router-dom";
import OKButton from '../../Globals/OKButton/OKButton';
import FormInput from "../../Globals/FormInput/FormInput";
import PatientProfileField from './PatientProfileField';
import { UserData } from '../../../types';
import humanStanding from '../../../assets/background-images/humans-sitting3.png';
import defaultPicture from '../../../assets/profile-picture/default-profile-picture.png'


export interface ProfileField {
  name: string;
  value: string;
  type: string;
  info: 'firstName'|'lastName'|'postCode'|'email' | 'language';
  updateValue: (info: 'firstName'|'lastName'|'postCode'|'email'|'language', value: string) => void;
}

function PatientProfile() {
  const { getTranslatedText, patientInfo, updatePatient } = useContext(PatientContext)!;
  const [newPatientInfo, setNewPatientInfo] = useState<UserData>(patientInfo);
  const [selectedPicture, setSelectedPicture] = useState<string>('');
  const pictureInputRef = useRef(null);
  const history = useHistory();

  const translatedText = getTranslatedText();
  const localText = translatedText.loginAndRegisterTerms;
  const localTextUtils = translatedText.utils;

  const handleConfirmClick = () => {
    history.push('/patient/landing');
  }

  const updateValue = (info: 'firstName'|'lastName'|'postCode'|'email'|'language', value: string) => {
    let newPatient = Object.assign({}, newPatientInfo);
    newPatient[info] = value;
    setNewPatientInfo(newPatient);
    updatePatient(info, value);
  };

  const profileFields: ProfileField[] = [
    {
      name: localText.firstName,
      value: patientInfo.firstName,
      type: 'text',
      info: 'firstName',
      updateValue
    },
    {
      name: localText.lastName,
      value: patientInfo.lastName,
      type: 'text',
      info: 'lastName',
      updateValue
    },
    {
      name: localText.postcode,
      value: patientInfo.postCode,
      type: 'text',
      info: 'postCode',
      updateValue
    },
    {
      name: localText.email,
      value: patientInfo.email,
      type: 'email',
      info: 'email',
      updateValue
    }
  ];

  const handleUpload = (files: FileList | null) => {
    if (files) {
      const newPicture = files[0];
      console.log('newPicture:', newPicture);
      if(!newPicture.type.startsWith('image/')){return}
      const reader = new FileReader();
      reader.onload = function (e) {
        console.log('e:', e?.target?.result)
      }
      reader.readAsDataURL(newPicture);
    }
  }

  return (
    <div className="h-screen relative flex flex-col justify-start items-center w-screen overflow-hidden px-0">
      <div className="h-5/6 m-0 px-0 py-4 z-10 flex flex-col items-center">
        <h1 className="text-center text-xl font-extrabold text-blue border border-solid border-blue rounded-3xl py-2 px-1 min-w-full mb-5">
          {translatedText.patientLandingTerms.profile}
        </h1>
        <div className="flex items-center">
          <div className="shadow-xl rounded-xl border border-black border-3 border-opacity-20">
            <img src={defaultPicture} alt="profile"
              className="h-16"
            />
          </div>
          <label className="border-invisible rounded-md px-4 py-1 ml-2 bg-white-cream cursor-pointer">
            Change picture
            <input id="pictureUpload" type="file" ref={pictureInputRef}
            className="hidden"
            // onChange={(e) => {handleUpload(e.currentTarget.files?[0])}}
            onChange={(e) => {handleUpload(e.currentTarget.files)}}
            />
          </label>
        </div>
        <div>
          {profileFields.map((profile, i) => (
              <div key={i} className="mx-1">
                <PatientProfileField
                  name={profile.name}
                  value={profile.value}
                  type={profile.type}
                  info={profile.info}
                  updateValue={updateValue}
                />
              </div>
          )
          )}
        </div>
      </div>

      <OKButton
        name="Confirm"
        type="button"
        text={localTextUtils.confirm}
        value={localTextUtils.confirm}
        onClick={handleConfirmClick}
      />
      <img
          src={humanStanding}
          alt="background human"
          className="absolute opacity-10 top-1/2 left-10 -mt-56 w-5/6 max-w-3xl transform -scale-x-1"
        ></img>

    </div>
  )
}

export default PatientProfile
