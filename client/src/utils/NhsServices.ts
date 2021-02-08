export interface ServiceType {
  [key: string]: string;
  DEN: string;
  GPB: string;
  HOS: string;
  OPT: string;
  PHA: string;
}

export const serviceColors: ServiceType = {
  DEN: "text-map-blue-600",
  GPB: "text-map-green-600",
  HOS: "text-map-red-600",
  OPT: "text-map-purple-600",
  PHA: "text-map-orange-600",
};

export const serviceBGColors: ServiceType = {
  DEN: "bg-map-blue-600",
  GPB: "bg-map-green-600",
  HOS: "bg-map-red-600",
  OPT: "bg-map-purple-600",
  PHA: "bg-map-orange-600",
};

const idToServiceMap: ServiceType = {
  DEN: "Dentist",
  GPB: "GP",
  HOS: "Hospital",
  OPT: "Optician",
  PHA: "Pharmacy",
};

export function IDToServiceName(id: string) {
  return idToServiceMap[id];
}
