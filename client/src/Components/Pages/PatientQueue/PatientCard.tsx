import React from "react";
import { GiBackPain } from "react-icons/gi";

interface Props {
  patientName: string;
  painLevel: number;
  startTime: string;
}

function PatientCard(props: Props) {
  const { patientName, painLevel, startTime } = props;
  const currentTime = new Date();
  const startTimeInMS = new Date(startTime);
  // Time waiting, converted to minutes
  const timeWaiting = Math.floor((currentTime.valueOf() - startTimeInMS.valueOf())/1000/60);


  return (
    <div className="flex justify-between content-center shadow-lg rounded-lg mt-4 bg-white p-2 w-3/4 w-full">
      <p className="flex-grow-2">{patientName}</p>
      <p>
        {timeWaiting > 59
          ? `${Math.floor(timeWaiting / 60)}h, ${timeWaiting % 60}mns`
          : `${timeWaiting}mns`}
      </p>
      <p>
        {" "}
        <GiBackPain className="inline" /> {painLevel}
      </p>
    </div>
  );
}

export default PatientCard;
