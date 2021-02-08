import React, { useContext, useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { useAuth } from "../../../../Contexts/Auth.context";
import getCoordsByPostcode from "../../../../services/api.geocode";
import client from "../../../../services/graphqlService";
import queries from "../../../../services/graphqlService/queries";
import { PatientContext } from "../../../../Contexts/Patient.context";
import LocationPin from "./LocationPin/LocationPin";
import { getNHSServices } from "../../../../services/api.nhs";

interface Coordinates {
  lat: number;
  lng: number;
}

//lat lng
//OrganisationName
// OrganisationTypeID
// "Address1": "53 Circuit Lane",
//  "Address2": null,
//       "Address3": null,
//       "City": "Reading",
//       "County": null,
//       "Latitude": 51.442909240722656,
//       "Longitude": -1.00676691532135,
//       "Postcode": "RG30 3AN",
//"URL": "http://www.berkshireindependenthospital.co.uk",

interface Service {
  lat: number;
  lng: number;
  OrganisationName: string;
  OrganisationTypeId: string;
}

interface QueryService {
  Latitude: number;
  Longitude: number;
  OrganisationName: string;
  OrganisationTypeId: string;
}

const LocalServices = () => {
  const { user } = useAuth();

  getNHSServices;

  const { coords, postcode } = useContext(PatientContext)!;
  const [services, setServices] = useState<Service[]>([]);

  console.log("services", services);

  useEffect(() => {
    console.log("postcode", postcode);
    getNHSServices(postcode)
      .then((value) => {
        const NHSServices = value.map((service: QueryService) => ({
          lat: service.Latitude,
          lng: service.Longitude,
          OrganisationName: service.OrganisationName,
          OrganisationTypeId: service.OrganisationTypeId,
        }));
        setServices(NHSServices);
      })
      .catch((e) => console.log(e));
  }, [postcode]);

  if (coords.lat !== 0 || coords.lng !== 0) {
    return (
      <div className="h-2/3 w-full px-2 py-2 rounded-xl">
        <GoogleMapReact
          bootstrapURLKeys={{
            language: user?.language,
            key: process.env.REACT_APP_GOOGLE_TRANSLATE_KEY as string,
            libraries: ["places", "geometry"],
          }}
          defaultCenter={coords}
          defaultZoom={11}
          yesIWantToUseGoogleMapApiInternals={true}
        >
          <LocationPin lat={51.5} lng={-0.1416} />
          {/* <AnyReactComponent
          lat={59.955413}
          lng={30.337844}
          text="My Marker"
        /> */}
        </GoogleMapReact>
      </div>
    );
  } else return null;
};

export default LocalServices;
