import React, { useState } from "react";
import { IoLanguageSharp } from "react-icons/io5";
import "./LanguageChoice.css";
import OKButton from '../../Globals/OKButton/OKButton';
import supportedLanguages from "../../../utils/supported-languages.json";
import { useHistory } from "react-router-dom";
import RemedicLogo from "../../../assets/logos/Remedic Text Logo.png";

const LanguageChoice = () => {
  const history = useHistory()
  const [selectedLanguage, setSelectedLanguage] = useState<string>(localStorage.getItem("preferredLanguage") || '');

  const onLanguageChange = (e : React.ChangeEvent<HTMLFormElement>) => {
    setSelectedLanguage(e.target.id)
  }
  const handleSubmit = () => {
    if (selectedLanguage) {
      localStorage.setItem("preferredLanguage", selectedLanguage);
      history.push("/login")
    }
  };

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
          <form className="mt-5 divide-y-2 divide-black divide-opacity-30 p-3 max-h-96 overflow-y-auto w-full"
          onChange={onLanguageChange}
          >
            {supportedLanguages &&
              supportedLanguages.languages.map((language) => (
                <div className="flex align-center justify-between my-2" key={language.langCode}>
                  <label htmlFor={language.langCode} className="text-lg">
                    {language.nativeName}
                  </label>
                  <input
                    type="radio"
                    name="lang"
                    id={language.langCode}
                    value={language.englishName}
                    checked={selectedLanguage === language.langCode}
                    onChange={()=>{}}
                  />
                </div>
              ))}
          </form>
        <OKButton
          name="confirm"
          type="submit"
          value="confirm"
          text="Confirm"
          onClick={handleSubmit}
        />
        </div>
      </div>
    </div>
  );
};

export default LanguageChoice;
