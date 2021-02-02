import { gql } from 'graphql-request';

const queries = {
  // will return an access token.
  loginPatient: gql`
    query ($password: String!, $email: String!) {
      loginPatient(password: $password, email: $email)
    }`,


  // will return null if there's no refresh token sent in the cookie. Otherwise, creates an access token.
  loginPatientWithToken: gql`
    query {
      loginWithTokenPatient
    }`,

  // returns a token.
  loginDoctor: gql`
    query($password: String!, $email: String!) {
      loginDoctor(password:$password, email:$email)
    }
  `,

  loginDoctorWithToken: gql`
    query {
      loginWithTokenDoctor
    }`,

  //todo confirm list of fields returned from BE
  // get a patient by the DB id.
  getPatient: gql`
    query($id: Float!) {
      getPatient(id: $id) {
        firstName
        lastName
        language
      }
    }`,

  // todo: confirm list of fields returned
  // get a doctor by db Id or the publicCode. Both fields are optional
  getDoctor: gql`
    query($code: String, $id:Float) {
      getDoctor(docPublicCode: $code, id: $id) {
        id
        firstName
        lastName
        # email - guessing we don't need this
        language
        docPublicCode
        # consultations {
        #   id
        # }
      }
    }
  `,

//todo remove fields not needed.
// get one consultation by the consultation id.
  getConsultation: gql`
    query($id: Float!) {
      getOneConsultation (id: $id) {
        id
        consultationDate
        symptomsByArea {
          area
          symptom
        }
        painLevel
        patientNotes
        transcriptOriginal
        transcriptTranslated
        patientRating
        doctorNotesOriginal
        doctorNotesTranslated
        patientId {
          firstName
          lastName
          language
        }
        doctorId {
          firstName
          lastName
        }
      }
    }
  `,


  //todo remove fields not needed. note, not added all the patient/doctor fields available
  // gets all consultations associated with one patient.
  getPatientConsultations: gql `
    query($id: Float!) {
      getPatientConsultations(patientId: $id) {
        id
        consultationDate
        symptomsByArea {
          area
          symptom
        }
        painLevel
        patientNotes
        transcriptOriginal
        transcriptTranslated
        patientRating
        doctorNotesOriginal
        doctorNotesTranslated
        patientId {
          firstName
        }
        doctorId {
          id
          firstName
        }
      }
    }`,


}

export default queries;