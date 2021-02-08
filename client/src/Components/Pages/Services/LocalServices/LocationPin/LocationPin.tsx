import React from "react";
import { Coordinates, Service } from "../../../../../types";
import { serviceColors } from "../../../../../utils/NhsServices";
import MapPinIcon from "../../../../Globals/MapPinIcon/MapPinIcon";

interface Props {
  lat: number;
  lng: number;
  service: Service;
}

const LocationPin = ({ lat, lng, service }: Props) => {
  return (
    <div>
      <MapPinIcon fillColor={serviceColors[service.OrganisationTypeID]} />
    </div>
  );
};

export default LocationPin;
