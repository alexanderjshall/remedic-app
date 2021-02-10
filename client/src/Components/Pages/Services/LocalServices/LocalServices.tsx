import React, { useContext, useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { useAuth } from "../../../../Contexts/Auth.context";
import { PatientContext } from "../../../../Contexts/Patient.context";
import LocationPin from "./LocationPin/LocationPin";
import { getNHSServices } from "../../../../services/api.nhs";
import { Service } from "../../../../types";

import MapHomeIcon from "../../../Globals/MapHomeIcon/MapHomeIcon";
import TapIcon from "../../../../assets/utils/tap.svg";

import FilterButton from "./FilterButton/FilterButton";
import CurrentPracticeCard from "./CurrentPracticeCard/CurrentPracticeCard";

interface Coordinates {
  lat: number;
  lng: number;
}

interface QueryService {
  Latitude: number;
  Longitude: number;
  OrganisationName: string;
  OrganisationTypeID: string;
  Address1?: string | null;
  Address2?: string | null;
  Address3?: string | null;
  City?: string | null;
  County?: string | null;
  Postcode?: string | null;
  URL?: string | null;
}

export interface Filter {
  name: string; // translated name
  code: string; // 3-letter string
  selected: boolean;
  color: string;
}

enum serviceCodes {
  DEN = "DEN",
  GPB = "GPB",
  PHA = "PHA",
  HOS = "HOS",
  OPT = "OPT",
}

const LocalServices = () => {
  const { user } = useAuth();
  const { coords, postcode } = useContext(PatientContext)!;

  //STATES
  // The Selected Practice
  const [currentPractice, setCurrentPractice] = useState<Service>(
    {} as Service
  );

  const [filters, setFilters] = useState<Filter[]>([
    {
      name: "Dentist",
      code: serviceCodes.DEN,
      selected: true,
      color: "map-blue-600",
    },
    {
      name: "GP",
      code: serviceCodes.GPB,
      selected: true,
      color: "map-green-600",
    },
    {
      name: "Pharmacy",
      code: serviceCodes.PHA,
      selected: true,
      color: "map-orange-600",
    },
    {
      name: "Hospital",
      code: serviceCodes.HOS,
      selected: true,
      color: "map-red-600",
    },
    {
      name: "Optician",
      code: serviceCodes.OPT,
      selected: true,
      color: "map-purple-600",
    },
  ]);

  const [dentistServices, setDentistServices] = useState<Service[]>([]);
  const [gpServices, setGpServices] = useState<Service[]>([]);
  const [pharmacyServices, setPharmacyServices] = useState<Service[]>([]);
  const [hospitalServices, setHospitalServices] = useState<Service[]>([]);
  const [opticianServices, setOpticianServices] = useState<Service[]>([]);

  // Get the NHS services on mount
  useEffect(() => {
    if (postcode) {
      getNHSServices(postcode)
        .then((value) => {
          const NHSServices: Service[] = value.map((service: QueryService) => ({
            lat: service.Latitude,
            lng: service.Longitude,
            OrganisationName: service.OrganisationName,
            OrganisationTypeID: service.OrganisationTypeID,
            Address1: service.Address1,
            Address2: service.Address2,
            Address3: service.Address3,
            Postcode: service.Postcode,
            URL: service.URL,
          }));
          setDentistServices(
            NHSServices.filter((s) => s.OrganisationTypeID === serviceCodes.DEN)
          );
          setGpServices(
            NHSServices.filter((s) => s.OrganisationTypeID === serviceCodes.GPB)
          );
          setPharmacyServices(
            NHSServices.filter((s) => s.OrganisationTypeID === serviceCodes.PHA)
          );
          setHospitalServices(
            NHSServices.filter((s) => s.OrganisationTypeID === serviceCodes.HOS)
          );
          setOpticianServices(
            NHSServices.filter((s) => s.OrganisationTypeID === serviceCodes.OPT)
          );
        })
        .catch((e) => console.log(e));
    }
  }, [postcode]);

  const handleFilterToggle = (selectedFilter: Filter) => {
    const changedFilters = filters.map((filter) => {
      if (filter.code === selectedFilter.code)
        filter.selected = !filter.selected;
      return filter;
    });
    setFilters(changedFilters);
  };

  if (coords.lat !== 0 || coords.lng !== 0) {
    return (
      <div className="w-full h-full">
        <div className="h-1/2 w-full px-2 py-2 bg-gray-100">
          <GoogleMapReact
            bootstrapURLKeys={{
              language: user?.language,
              key: process.env.REACT_APP_GOOGLE_TRANSLATE_KEY as string,
              libraries: ["places", "geometry"],
            }}
            defaultCenter={coords}
            defaultZoom={12}
            yesIWantToUseGoogleMapApiInternals={true}
            onChildClick={(key, childProps) =>
              setCurrentPractice(childProps.service)
            }
          >
            <MapHomeIcon
              lat={coords.lat}
              lng={coords.lng}
              fillColor="text-black"
            />

            {/* RENDER SERVICES BY FILTER */}
            {filters[0].selected &&
              dentistServices.map((s, idx) => (
                <LocationPin key={idx} lat={s.lat} lng={s.lng} service={s} />
              ))}

            {filters[1].selected &&
              gpServices.map((s, idx) => (
                <LocationPin key={idx} lat={s.lat} lng={s.lng} service={s} />
              ))}

            {filters[2].selected &&
              pharmacyServices.map((s, idx) => (
                <LocationPin key={idx} lat={s.lat} lng={s.lng} service={s} />
              ))}
            {filters[3].selected &&
              hospitalServices.map((s, idx) => (
                <LocationPin key={idx} lat={s.lat} lng={s.lng} service={s} />
              ))}
            {filters[4].selected &&
              opticianServices.map((s, idx) => (
                <LocationPin key={idx} lat={s.lat} lng={s.lng} service={s} />
              ))}
          </GoogleMapReact>
        </div>
        <div className="h-1/2 flex flex-col bg overflow-y-scroll">
          <div className="grid grid-cols-3 h-10 px-2 py-2 gap-2 bg-gray-100">
            {filters &&
              filters
                .slice(0, 3)
                .map((filter, idx) => (
                  <FilterButton
                    key={idx}
                    filter={filter}
                    handleFilterToggle={handleFilterToggle}
                  />
                ))}
          </div>
          <div className="grid grid-cols-2 h-12 gap-2 px-2 py-2 bg-gray-100">
            {filters &&
              filters
                .slice(3, 5)
                .map((filter, idx) => (
                  <FilterButton
                    key={idx}
                    filter={filter}
                    handleFilterToggle={handleFilterToggle}
                  />
                ))}
          </div>
          {/* Practice Display */}
          <div className="relative flex-grow flex justify-center items-center p-3">
            {currentPractice && Object.keys(currentPractice).length > 0 ? (
              <CurrentPracticeCard currentPractice={currentPractice} />
            ) : (
              <img
                src={TapIcon}
                className="h-24 opacity-30 animate-pulse"
              ></img>
            )}
          </div>
        </div>
      </div>
    );
  } else return null;
};

export default LocalServices;
