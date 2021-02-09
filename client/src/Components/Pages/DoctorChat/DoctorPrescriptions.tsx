import { useState } from "react";
import BackArrow from "../../../assets/utils/back-arrow.svg"
import { Prescription } from "../../../types";

interface Props {
  close: () => void;
  prescriptions: Prescription[];
  setPrescriptions: (prescriptions: Prescription[]) => void
}

const initPresc = {
  medicine: "",
  dose :"",
  frequency:""
}

const DoctorPrescriptions = (props: Props) =>{
  const [showForm, setShowForm] = useState<boolean>(false)
  const [prescription, setPrescription] = useState(initPresc)
  const {close, prescriptions, setPrescriptions} = props;

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setPrescription({...prescription, [e.target.name] : e.target.value})
  }

  const addPresctiption = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (prescription.medicine && prescription.dose && prescription.frequency) {
      setPrescriptions([...prescriptions, prescription])
      setPrescription(initPresc)
      setShowForm(false)
    }
  }

  return(
  <div className ="absolute w-full h-full bg-gray-800 bg-opacity-30 z-30">
    <div className="w-3/4 mt-40 min-h-1/2 mx-auto bg-white rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <img src={BackArrow} alt="back" className="bg-blue hover:bg-blue-dark rounded-full p-1 h-8 cursor-pointer" onClick={close}/>
        <h1 className="text-center text-blue font-title font-bold text-2xl flex-grow">PRESCRIPTIONS</h1>
      </div>
      {
        showForm ?
        <form className="bg-white-dark rounded-xl p-2" onSubmit={addPresctiption}>
          <div className="flex justify-between">
          <div className="flex flex-col">
            <label htmlFor="medicine" className="font-bold text-blue">Medicine</label>
            <input type="text" id="medicine" name="medicine" value={prescription.medicine} onChange={handleChange}/>
          </div>
          <div className="flex flex-col">
            <label htmlFor="dose" className="font-bold text-blue">Dose</label>
            <input type="text" id="dose" name="dose" value={prescription.dose} onChange={handleChange}/>
          </div>
          <div className="flex flex-col">
            <label htmlFor="Frequency" className="font-bold text-blue">Frequency</label>
            <input type="text" id="Frequency" name="frequency" value={prescription.frequency} onChange={handleChange}/>
          </div>
          </div>
          <div className="flex justify-evenly mt-4">
            <button className="py-1 px-2 bg-blue text-white rounded-lg hover:bg-blue-800"
            type="submit">
              SAVE
            </button>
            <button
            className="py-1 px-2 bg-red-500 text-white rounded-lg hover:bg-red-800"
            onClick={() => setShowForm(false)}>
              CLOSE
            </button>
          </div>
        </form>
        :
        <button
        className="px-2 py-2 -full ring-2 bg-blue rounded-lg ml-4 hover:bg-blue-800 ring-opacity-50 max-w-1/2 ring-blue-800 font-bold text-white"
        onClick={() => setShowForm(true)}
        >
          New Prescription
        </button>
      }
      {
        <div className="flex flex-wrap mt-4">
          {prescriptions.map((p,i) => (
            <div key={i} className="flex flex-col mx-4 mb-4 px-4 py-2 rounded-lg bg-green">
              <p className="font-bold">{p.medicine}</p>
              <p>{p.dose}</p>
              <p>{p.frequency}</p>
            </div>
          ))}
        </div>
      }
    </div>

  </div>
  )
}

export default DoctorPrescriptions
