import React, { useState } from "react";
import LocalServices from "./LocalServices/LocalServices";

interface ServiceView {
  serviceName: string;
  current: boolean;
}

const Services = () => {
  const [services, setServices] = useState<ServiceView[]>([
    { serviceName: "Local Services", current: true },
    { serviceName: "Translate Terms", current: false },
  ]);

  const selectService = (selectedService: string) => {
    const alteredServiceViews = services.map((service) => {
      if (selectedService === service.serviceName) service.current = true;
      else service.current = false;
      return service;
    });
    setServices(alteredServiceViews);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <div className="flex-grow w-full">
        <LocalServices />
      </div>
      <div className="h-14 bg-blue w-full flex justify-between items-center font-bold">
        {services.map((service, idx) => (
          <div
            className="w-1/2 text-white flex justify-center items-center"
            key={idx}
          >
            <h1>{service.serviceName}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
