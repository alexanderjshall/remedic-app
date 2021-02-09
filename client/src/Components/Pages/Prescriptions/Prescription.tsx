
interface Props {
  data : {
    date: string;
    medicine: string;
    dose:string;
    frequency: string;
    doctor: string;
  }
}

const Prescription = (props: Props) => {
  const {data} = props;
  const item ="flex flex-wrap justify-evenly w-full text-white text-lg"

  return(
    <div className="w-full mx-4  mt-4 bg-blue rounded-xl flex flex-col p-2">

      <div className={item}>
        <p className="font-bold">MEDICINE :</p>
        <p>{data.medicine}</p>
      </div>

      <div className={item}>
        <p className="font-bold">DOSE :</p>
        <p>{data.dose}</p>
      </div>

      <div className={item}>
        <p className="font-bold">FREQUENCY :</p>
        <p>{data.frequency}</p>
      </div>

      <div className={item}>
        <p className="font-bold">DATE :</p>
        <p>{data.date}</p>
      </div>

      <div className={item}>
        <p className="font-bold">PRESCRIBED BY :</p>
        <p>{data.doctor}</p>
      </div>

    </div>
  )
}
export default Prescription
