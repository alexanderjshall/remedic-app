import React from "react";
import { IoLanguageSharp } from "react-icons/io5";
import RemedicLogo from "../../../assets/logos/Remedic Text Logo.png";
import OKButton from "../../Globals/OKButton/OKButton";
import supportedLanguages from "../../../utils/supported-languages.json";

const LanguageChoice = () => {
  const handleSubmit = () => {};

  return (
    <div className="flex-col flex justify-center w-screen">
      <div className="flex flex-col shadow-md px-16 h-screen rounded-lg justify-evenly items-center overflow-hidden">
        <div>
          {" "}
          {/* <h1 className="text-3xl underline">Remedic</h1> */}
          <div>
            <img src={RemedicLogo} alt="Remedic Logo" />
          </div>
        </div>
        <div className="">
          <div className="flex flex-col items-center mb-4">
            <IoLanguageSharp className="inline mr-3 h-5 w-5 self-center" />
            <p className=" text-lg inline whitespace-nowrap">
              Please choose your language:
            </p>
          </div>
          <form className="mt-5 flex flex-col divide-y-2 divide-black divide-opacity-30 p-3 max-h-96 overflow-y-auto">
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
            {/* <div className="flex align-center justify-between my-2">
              <label htmlFor="hindi" className="text-lg">
                हिन्दी 🇮🇳
              </label>
              <input type="radio" name="lang" id="hindi" value="Hindi " />
            </div>

            <div className="flex align-center justify-between my-2">
              <label htmlFor="Pakistani" className="text-lg">
                اردو 🇵🇰
              </label>
              <input
                type="radio"
                name="lang"
                id="Pakistani"
                value="Pakistani"
              />
            </div>

            <div className="flex align-center justify-between my-2">
              <label htmlFor="Spanish" className="text-lg">
                Español 🇪🇸
              </label>
              <input type="radio" name="lang" id="Spanish" value="Spanish" />
            </div>

            <div className="flex align-center justify-between my-2">
              <label htmlFor="Vietnamese" className="text-lg">
                Tiếng Việt 🇻🇳
              </label>
              <input
                type="radio"
                name="lang"
                id="Vietnamese"
                value="Vietnamese"
              />
            </div>

            <div className="flex align-center justify-between my-2">
              <label htmlFor="Russian" className="text-lg">
                русский 🇷🇺
              </label>
              <input type="radio" name="lang" id="Russian" value="Russian" />
            </div>

            <div className="flex align-center justify-between my-2">
              <label htmlFor="Mandarin" className="text-lg">
                普通话 🇨🇳
              </label>
              <input type="radio" name="lang" id="Mandarin" value="Mandarin" />
            </div> */}
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
