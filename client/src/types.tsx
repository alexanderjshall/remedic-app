export interface User {
  _id: number
  firstname: string;
  lastname: string;
  email: string;
  password?: string;
  postcode: string;
  language: string; // two letter code
  // consultations: consultation[];
}

// Empty user to use as default
export const blankUser: User = {
  _id: 0,
  firstname: '',
  lastname: 'Patient',
  email: '',
  postcode: '',
  language: ''  
}

export interface Message {
  name?: string;
  isAuthor: boolean;
  content: string;
  timestamp: string;
}

export interface ConsultationInfo {
  _consultation_id: string;
  date: string;
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
