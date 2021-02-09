export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  postCode: string;
  language: string;
}
export interface User extends UserData {
  id: number;
}

export interface Message {
  name?: string;
  isAuthor: boolean;
  audio: string;
  content: string;
  timestamp: string;
}

export interface ConsultationInfo {
  id: string;
  consultationDate: string;
  transcriptOriginal: string;
  transcriptTranslated: string;
  doctorId: string;
  patientId: {
    firstName: string;
    lastName: string;
    language: string;
  };
  doctorNotesOriginal: string;
  doctorNotesTranslated: string;
  painLevel: number;
  symptomsByArea: Symptom[];
  patientNotes: string;
  patientRating: number;
  isActive: boolean;
}

export interface ConsultationFeedback {
  patientRating: number;
  id: number;
}

export interface Symptom {
  area: string;
  symptom: string;
  img?: string;
  question?: string;
  selected: boolean;
  id?: string;
  translation?: string;
  interactedWith?: boolean;
}

export interface Doctor {
  id: number;
  firstName: string;
  lastName: string;
  language: string;
  docPublicCode: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Service {
  lat: number;
  lng: number;
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
