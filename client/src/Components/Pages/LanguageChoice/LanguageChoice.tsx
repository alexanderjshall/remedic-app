import React from "react";
import { IoLanguageSharp } from "react-icons/io5";
import "./LanguageChoice.css";
import OKButton from '../../Globals/OKButton/OKButton';


const LanguageChoice = () => {

  const handleSubmit = () => {

  }

  return (
    <div className="flex-col flex justify-center w-screen bg-gradient-to-b from-blue-light via-blue-50 to-white-ghost">
      <div className="flex flex-col shadow-md px-16 h-screen rounded-lg justify-evenly items-center">
        <div>
          {" "}
          <h1 className="text-3xl underline">Remedic</h1>
        </div>
        <div className="">
          <IoLanguageSharp className="inline mr-3 h-5 w-5" />
          <p className=" text-lg inline">Please choose your language:</p>
          <form
            action=""
            className="mt-5 flex flex-col divide-y-2 divide-black divide-opacity-30"
          >
            <div className="flex align-center justify-between my-2">
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
            </div>

            {/* <div className="flex flex-col relative overflow-hidden">
              <select
                name="languages"
                id="languages"
                className="h-10 border-4 border-blue-light appearance-none relative focus:border-6 text-center  bg-center bg-cover bg-no-repeat"
              >
                <option value="Hindi">Hindi</option>
                <option value="Pakistani">Pakistani</option>
                <option value="Spanish">Spanish</option>
                <option value="Vietnamese">Vietnamese</option>
                <option value="Russian">Russian</option>
                <option value="Mandarin">Mandarin</option>
              </select>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="text-blue-light h-6 w-6 absolute right-1 top-2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"
                />
              </svg>
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
