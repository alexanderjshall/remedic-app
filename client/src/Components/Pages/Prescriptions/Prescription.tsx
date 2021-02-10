import { useContext } from "react";
import { PatientContext } from "../../../Contexts/Patient.context";

interface Props {
  data: {
    date: string;
    medicine: string;
    dose: string;
    frequency: string;
    doctor: string;
  };
}

const Prescription = (props: Props) => {
  const { data } = props;

  const { getTranslatedText } = useContext(PatientContext)!;
  const translatedText = getTranslatedText();
  const localText = translatedText.patientPrescription;

  const item =
    "flex flex-wrap justify-between w-full text-white text-lg px-4 py-1";

  return (
    <div className="w-full mx-4  mt-4 bg-blue rounded-xl flex flex-col p-2 max-w-l">
      <div className={item}>
        <p className="font-bold">{localText.medicine} :</p>
        <p>{data.medicine}</p>
      </div>

      <div className={item}>
        <p className="font-bold">{localText.dose} :</p>
        <p>{data.dose}</p>
      </div>

      <div className={item}>
        <p className="font-bold">{localText.frequency} :</p>
        <p>{data.frequency}</p>
      </div>

      <div className={item}>
        <p className="font-bold">{localText.date} :</p>
        <p>{data.date}</p>
      </div>

      <div className={item}>
        <p className="font-bold">{localText.prescribedBy} :</p>
        <p>{data.doctor}</p>
      </div>
    </div>
  );
};
export default Prescription;
