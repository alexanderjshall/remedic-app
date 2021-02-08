import React from "react";
import { Coordinates } from "../../../../../types";
import MapPin from "../../../../../assets/utils/map-pin.svg";

interface Props {
  lat: number;
  lng: number;
}

const LocationPin = ({ lat, lng }: Props) => {
  return (
    <div>
      <img src={MapPin} alt="pin" className="w-8 text-blue" />
    </div>
  );
};

export default LocationPin;
