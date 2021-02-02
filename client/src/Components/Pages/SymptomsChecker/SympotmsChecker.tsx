import React from "react";

const SymptomsChecker = () => {
  return (
    <div className=" h-full ">
      <div className="mt-12"></div>
      <h1 className="text-bold text-xl text-center">
        Please specify your symptoms:
      </h1>
      <ul className="mt-10 w-full px-3 flex flex-col items-center">
        <li className="mt-6 w-full px-4">
          <h1 className="text-center">Pain level:</h1>
          <input
            type="range"
            name="pain_level"
            id="pain_level"
            min="1"
            max="10"
            value="1"
            className="appearance-none w-full h-10 bg-green-light p-3 outline-none opacity-70 transition-opacity rounded-lg hover:opacity-100 mt-3"
          />
        </li>
        <li className="mt-10 w-full bg-blue-superlight rounded-md p-2">
          <h1 className="text-center whitespace-nowrap">
            Are you sleeping well?
          </h1>
          <div className="flex justify-center mt-3">
            <button className="px-4 py-2 bg-green-light rounded-lg hover:bg-green-dark  text-opacity-50 mr-3">
              Yes
            </button>
            <button className="px-4 py-2 bg-red-negative rounded-lg  hover:bg-red-dark  text-opacity-50 ml-3">
              No
            </button>
          </div>
        </li>
        <li className="mt-10 w-full bg-blue-light p-2 rounded-md">
          <h1 className="text-center whitespace-nowrap">Are you eating?</h1>
          <div className="flex justify-center mt-3">
            <button className="px-4 py-2 bg-green-light rounded-lg hover:bg-green-dark  text-opacity-50 mr-3">
              Yes
            </button>
            <button className="px-4 py-2 bg-red-negative rounded-lg  hover:bg-red-dark text-opacity-50 ml-3">
              No
            </button>
          </div>
        </li>

        <li className="mt-10 w-full  bg-blue-superlight rounded-md p-2">
          <h1 className="text-center whitespace-nowrap">
            Do you have a high temperature?
          </h1>
          <div className="flex justify-center mt-3">
            <button className="px-4 py-2 bg-green-light rounded-lg hover:bg-green-dark  text-opacity-50 mr-3">
              Yes
            </button>
            <button className="px-4 py-2 bg-red-negative rounded-lg  hover:bg-red-dark  text-opacity-50 ml-3">
              No
            </button>
          </div>
        </li>
        <li className="mt-10 w-full bg-blue-light rounded-md p-2">
          <h1 className="text-center whitespace-nowrap">
            Are you taking any medications?
          </h1>
          <div className="flex justify-center mt-3">
            <button className="px-4 py-2 bg-green-light rounded-lg hover:bg-green-dark  text-opacity-50 mr-3">
              Yes
            </button>
            <button className="px-4 py-2 bg-red-negative rounded-lg  hover:bg-red-dark  text-opacity-50 ml-3">
              No
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default SymptomsChecker;
