import React, {useEffect, useState} from "react";
import { IoLanguageSharp } from "react-icons/io5";
import "./LanguageChoice.css";
import OKButton from '../../Globals/OKButton/OKButton';
import { Redirect } from 'react-router-dom';
import supportedLanguages from "../../../utils/supported-languages.json";
import RemedicLogo from "../../../assets/logos/Remedic Text Logo.png";

const LanguageChoice = () => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>('en');

  const handleSubmit = () => {
    // TODO: save language choice to context
    setSubmitted(true);
  }

  useEffect (() => {
    console.log('language:', language)
  }, [language])

  const updateLanguage:React.MouseEventHandler<HTMLInputElement> = (e) => {
    setLanguage(e.currentTarget.value);
  }




  if (submitted) return <Redirect to='/login'/>

  return (
    <div className="flex-col flex justify-center w-screen">
      <div className="flex flex-col shadow-md px-16 h-screen rounded-lg justify-evenly items-center overflow-hidden">
        {" "}
        <div className="flex justify-center w-full tablet:w-2/3">
          <img src={RemedicLogo} alt="Remedic Logo" />
        </div>
        <div className="flex flex-col items-center mb-4 w-full tablet:w-3/4">
          <IoLanguageSharp className="inline mr-3 h-5 w-5 self-center" />
          <p className=" text-lg inline whitespace-nowrap">
            Please choose your language:
          </p>
          <form className="mt-5 divide-y-2 divide-black divide-opacity-30 p-3 max-h-96 overflow-y-auto w-full">
            {supportedLanguages &&
              supportedLanguages.languages.map((language) => (
                <div className="flex align-center justify-between my-2">
                  <label htmlFor={language.langCode} className="text-lg">
                    {language.nativeName}
                  </label>
                  <input
                    type="radio"
                    name="lang"
                    id={language.langCode}
                    value={language.englishName}
                  />
                </div>
              ))}
          </form>
        </div>
        <OKButton
          name="confirm"
          type="submit"
          value="confirm"
          text="Confirm"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default LanguageChoice;
