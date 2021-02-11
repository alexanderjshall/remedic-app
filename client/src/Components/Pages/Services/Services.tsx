import { Transition } from "@headlessui/react";
import React, { useContext, useState } from "react";
import MapNavIcon from "../../Globals/MapNavIcon/MapNavIcon";
import TranslationIcon from "../../Globals/TranslationIcon/TranslationIcon";
import LocalServices from "./LocalServices/LocalServices";
import TranslateTerms from "./TranslateTerms/TranslateTerms";
import { PatientContext } from "../../../Contexts/Patient.context";

const Services = () => {
  const [currentService, setCurrentService] = useState<string>(
    "Local Services"
  );
  const { getTranslatedText } = useContext(PatientContext)!;
  const localText = getTranslatedText().servicesPage;
  const services: string[] = ["Local Services", "Translate Terms"];
  const localizedServices: string[] = [
    localText.localServices,
    localText.translateTerms,
  ];

  return (
    <Transition
      appear={true}
      show={true}
      enter="transition-opacity delay-75 ease-in-out duration-500"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      className="flex flex-col justify-center items-center h-screen w-screen"
    >
      {currentService === services[0] && (
        <div className="flex-grow w-full">
          <LocalServices />
        </div>
      )}

      {currentService === services[1] && (
        <div className="flex-grow w-full">
          <TranslateTerms />
        </div>
      )}

      <div
        className={`h-14 bg-blue w-full grid grid-cols-${services.length} font-bold cursor-pointer`}
      >
        {services.map((service, idx) => (
          <div
            className={`flex flex-col justify-center px-1 items-center row-auto ${
              service === currentService
                ? "text-blue bg-white"
                : "text-white bg-blue"
            }`}
            key={idx}
            onClick={() => setCurrentService(service)}
          >
            {service === services[0] && (
              <MapNavIcon
                color={service === currentService ? "text-blue" : "text-white"}
              />
            )}
            {service === services[1] && (
              <TranslationIcon
                color={service === currentService ? "text-blue" : "text-white"}
              />
            )}
            <h1 className="text-center text-xl font-extrabold">
              {localizedServices[idx]}
            </h1>
          </div>
        ))}
      </div>
    </Transition>
  );
};

export default Services;
