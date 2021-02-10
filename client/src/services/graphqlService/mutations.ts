import gql from 'graphql-tag';

//* Not added createDoctor as this will be handled by the sysAdmin.

const mutations = {
  // return an access token
  register: gql`
    mutation ($firstName: String!, $lastName: String!, $email: String!, $password: String!, $language: String!, $postCode: String!)  {
      createPatient (patientInput: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        password: $password
        language: $language
        postCode: $postCode
      })
    }`,

  //todo confirm list of fields returned from BE
  editPatient: gql`
    mutation ($id:Float!, $firstName: String, $lastName: String, $email: String, $password: String, $language: String, $postCode: String) {
      updatePatient (
        id: $id,
        newData: {
          firstName: $firstName
          lastName: $lastName
          email: $email
          password: $password
          language: $language
          postCode: $postCode
      }) {
        firstName
        lastName
        email
        language
        postCode
      }
    }`,

  //todo confirm list of fields returned from BE
  createConsultation: gql`
    mutation ($date: DateTime!, $symptomsByArea:[inputSymptoms!]!, $painLevel: Int!, $patientNotes: String, $patientId: Int!, $doctorId: Int!) {
      addConsultation (input: {
        consultationDate: $date,
        symptomsByArea: $symptomsByArea,
        painLevel: $painLevel,
        patientNotes: $patientNotes,
        patientId: $patientId,
        doctorId: $doctorId
      }) {
        id
        consultationDate
        symptomsByArea {
          area
          symptom
        }
        painLevel
        patientNotes
        patientId {
          firstName
          lastName
          language
        }
        doctorId {
          firstName
        }
      }
    }`,

  //todo confirm list of fields returned from BE
  updateConsultation: gql`
    mutation ($id: Float!, $date: DateTime, $isActive: Boolean, $symptomsByArea:[inputSymptoms!], $prescriptions:[inputPrescription!], $painLevel: Int, $patientNotes: String, $transcriptOriginal: String, $transcriptTranslated: String, $patientRating: Int, $doctorNotesOriginal: String, $doctorNotesTranslated: String) {
      updateConsultation (id:$id, newData: {
        consultationDate: $date,
        isActive: $isActive,
        symptomsByArea: $symptomsByArea,
        painLevel: $painLevel,
        prescriptions: $prescriptions,
        patientNotes: $patientNotes,
        transcriptOriginal: $transcriptOriginal,
        transcriptTranslated: $transcriptTranslated
        patientRating: $patientRating
        doctorNotesOriginal: $doctorNotesOriginal
        doctorNotesTranslated: $doctorNotesTranslated
      }) {
        id
        consultationDate
        isActive
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
        }
      }
    }`
}

export default mutations;
