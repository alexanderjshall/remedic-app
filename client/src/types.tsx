export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  postCode: string;
  language: string;
}
export interface User extends UserData {
  _id: number;
}

export interface Message {
  name?: string;
  isAuthor: boolean;
  content: string;
  timestamp: string;
}

export interface ConsultationInfo {
  _consultation_id: string;
  date: Date;
  transcriptOriginal: string;
  transcriptTranslated: string;
  doctorID: string;
  patientID: string;
  doctorNotesOriginal: string;
  doctorNotesTranslated: string;
  painLevel: number;
  symptomsByArea: [
    {
      area: string;
      symptom: string;
    }
  ];
  patientNotes: string;
  patientRating: number;
}

//
export const BlankConsultation: ConsultationInfo = {
  _consultation_id: "",
  date: new Date("2021-02-02T09:47:19.561Z"),
  transcriptOriginal: "",
  transcriptTranslated: "",
  doctorID: "",
  patientID: "patientID123",
  doctorNotesOriginal: "",
  doctorNotesTranslated: "",
  painLevel: 5,
  symptomsByArea: [
    {
      area: "",
      symptom: "",
    },
  ],
  patientNotes: "",
  patientRating: 5,
};
