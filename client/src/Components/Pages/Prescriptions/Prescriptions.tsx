
import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { useHistory } from "react-router-dom"
import BackArrow from "../../../assets/utils/back-arrow.svg"
import { useAuth } from "../../../Contexts/Auth.context"
import { getTranslatedText } from "../../../services/api.translate"
import client from "../../../services/graphqlService"
import queries from "../../../services/graphqlService/queries"
import { ConsultationInfo } from "../../../types"
import Spinner from "../../Globals/Spinner/Spinner"
import Prescription from "./Prescription"

interface PrescriptionData {
  date: string;
  medicine: string;
  dose: string;
  frequency: string;
  doctor: string;
}

const parseDate = (date: string) =>
  new Date(Date.parse(date)).toLocaleString().split(',')[0];

const Prescriptions = () => {
  const history = useHistory()
  const {user} = useAuth();
  const [userId, userLang] = [user!.id, user!.language]
  const [prescriptions, setPrescriptions] = useState<PrescriptionData[]>([])

  const translateFreq = async (freq: string) => {
    return await getTranslatedText(freq, "en", userLang);
  }

  const {data, isLoading} = useQuery([userId, "consultations"],
    async () => await client.request(queries.getPatientConsultations, {id: userId}));

  useEffect(() => {
    if (data) {
      (async () => {
        const parsedPrescr = getPrescriptions(data.getPatientConsultations)
        parsedPrescr.forEach(async  p => {p.frequency = await translateFreq(p.frequency)})
        setPrescriptions(parsedPrescr)
      })();
    }
  }, [data])

  const getPrescriptions = (consultationList : ConsultationInfo[]) => {
    return consultationList
      .filter(consult => consult.prescriptions && consult.prescriptions.length > 0)
      .flatMap(consult => consult.prescriptions
        .map(prescr => ({
          date: parseDate(consult.consultationDate),
          medicine: prescr.medicine,
          dose: prescr.dose,
          frequency: prescr.frequency,
          doctor: `${consult.doctorId.firstName} ${consult.doctorId.lastName}`
      })));
  }

  return(
    <div className="h-full w-full bg-white-dark">

      <div className="w-full h-20 bg-blue flex items-center">
        <img src={BackArrow} alt="back" className="h-12 ml-8 cursor-pointer" onClick={() => history.push("/patient/landing")}/>
      </div>

      <div className="w-full max-w-almostFull md:max-w-2xl min-h-3/4 m-8 mx-auto rounded-xl bg-white flex flex-col items-center p-4">
        <h1 className="text-2xl font-bold text-blue">Your prescriptions:</h1>
        {isLoading ?
          <Spinner size={24}/>
          :
        <>
          {
            prescriptions.map( (prescription, idx) =>
              <Prescription data={prescription} key={idx}/>
              )
          }
        </>
        }
      </div>

    </div>
  )
}
export default Prescriptions
