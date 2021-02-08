import React from "react";
import { GiBackPain, GiAlarmClock } from "react-icons/gi";

interface Props {
  patientName: string;
  painLevel: number;
  startTime: string;
  isEven: boolean;
}

function PatientCard(props: Props) {
  const { patientName, painLevel, startTime } = props;
  const currentTime = new Date();
  const startTimeInMS = new Date(startTime);
  // Time waiting, converted to minutes
  const timeWaiting = Math.floor((currentTime.valueOf() - startTimeInMS.valueOf())/1000/60);

  const cardClasses = "flex justify-between items-center shadow-xl rounded-lg mt-8 bg-white py-2 px-4 w-full transition duration-500 text-left"
  const bgColor = props.isEven ? "bg-blue hover:bg-blue-dark" : "bg-green hover:bg-green-light";
  const textColor = props.isEven ? "text-white" : "text-black";
  const info = "flex flex-col"
  const infoData = "flex justify-evenly items-center"

  return (
    <div className={`${cardClasses} ${bgColor} ${textColor}`}>
      <div className={info}>
        <h3 className="font-semibold">Name</h3>
        <p>{patientName}</p>
      </div>
      <div className={info}>
        <h3 className="font-semibold">Waiting for</h3>
        <div className={infoData}>
          <GiAlarmClock className="inline mr-2" />
          <p>
            {timeWaiting > 59
              ? `${Math.floor(timeWaiting / 60)}h, ${timeWaiting % 60}min`
              : `${timeWaiting}min`}
          </p>
        </div>
      </div>
      <div className={info}>
        <h3 className="font-semibold">Symptoms</h3>
        <div className={infoData}>
          <GiBackPain className="inline mr-2" />
          <p>{painLevel}</p>
        </div>
      </div>
    </div>
  );
}

export default PatientCard;
