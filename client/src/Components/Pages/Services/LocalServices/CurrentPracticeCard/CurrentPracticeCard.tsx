import React from "react";
import { Service } from "../../../../../types";
import {
  IDToServiceName,
  serviceBGColors,
} from "../../../../../utils/NhsServices";
import NHSIcon from "../../../../../assets/background-images/NHS-Logo (1).svg";
import HospitalIcon from "../../../../../assets/background-images/hospital.svg";

interface Props {
  currentPractice: Service;
}

const CurrentPracticeCard = (props: Props) => {
  const { currentPractice } = props;

  return (
    <div className="relative h-full w-full max-w-xl max-h-64 flex flex-col p-3 shadow-2xl rounded-3xl overflow-y-scroll">
      <h1 className="text-sm pl-2">
        {IDToServiceName(currentPractice.OrganisationTypeID)}
      </h1>
      <h1
        className={`${
          serviceBGColors[currentPractice.OrganisationTypeID]
        } px-2 py-1 w-max max-w-full rounded-md text-white font-bold text-xl z-10`}
      >
        {currentPractice.OrganisationName}
      </h1>
      <h2 className="pl-2 font-semibold">{currentPractice.Address1}</h2>
      <h2 className="pl-2 font-semibold">{currentPractice.Address2}</h2>
      <h2 className="pl-2 font-semibold">{currentPractice.Address3}</h2>
      <h2 className="pl-2 font-semibold">
        {currentPractice.City}{" "}
        {currentPractice.City && currentPractice.County ? ", " : null}{" "}
        {currentPractice.County}
      </h2>
      <h2 className="pl-2 font-semibold">{currentPractice.Postcode}</h2>
      <hr></hr>
      {currentPractice.URL && (
        <a
          className="pl-2 text-blue hover:text-underline break-all"
          href={currentPractice.URL}
        >
          {currentPractice.URL}
        </a>
      )}
      <img src={NHSIcon} className="absolute top-4 w-24 right-4 opacity-20" />
      <img
        src={HospitalIcon}
        className="absolute bottom-4 w-16 right-4 opacity-20"
      />
    </div>
  );
};

export default CurrentPracticeCard;
