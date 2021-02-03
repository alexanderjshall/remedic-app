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

// Empty examples to use as default
export const blankUser: User = {
  _id: 0,
  firstname: '',
  lastname: 'Patient',
  email: '',
  postcode: '',
  language: ''
}

//
export const BlankConsultation: ConsultationInfo = {
  _consultation_id:'',
  date: new Date('2021-02-02T09:47:19.561Z'),
  transcriptOriginal: '',
  transcriptTranslated: '',
  doctorID: '',
  patientID: 'patientID123',
  doctorNotesOriginal: '',
  doctorNotesTranslated: '',
  painLevel: 5,
  symptomsByArea: [
    {
      area: '',
      symptom: '',
    }
  ],
  patientNotes: '',
  patientRating: 5,
}

export interface Symptom {
  area: string;
  symptom: string;
  img: string;
  selected: boolean;
}