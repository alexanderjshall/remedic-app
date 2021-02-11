import React from "react";
interface Props {
  doctorNotes: string;
  setDoctorNotes: React.Dispatch<React.SetStateAction<string>>;
  endConsultation: () => void;
  setShowPrescriptions: React.Dispatch<React.SetStateAction<boolean>>;
}

const DoctorNotes = (props: Props) => {
  const {
    doctorNotes,
    setDoctorNotes,
    endConsultation,
    setShowPrescriptions,
  } = props;

  const preventDefaultAndEnd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    endConsultation();
  };

  return (
    <div className="h-full mx-4 pt-32">
      <form className="h-5/6" onSubmit={preventDefaultAndEnd}>
        <label
          htmlFor="doctor_notes"
          className="font-bold text-lg text-opacity-75 whitespace-nowrap w-full"
        >
          <h2 className="text-center text-xl text-blue">Consultation Notes</h2>
        </label>
        <textarea
          wrap="soft"
          name="doctor_notes"
          id="doctor_notes"
          value={doctorNotes}
          onChange={(e) => setDoctorNotes(e.target.value)}
          className="resize-none w-full p-2 rounded-lg outline-none focus:border-4 mt-2 h-5/6 shadow-2xl placeholder-blue"
          placeholder="Write your notes here"
        ></textarea>
        <div className="flex justify-evenly mt-4">
          <button
            type="submit"
            className="px-6 py-3 -full ring-2 bg-red-600 rounded-lg lg:m-0 hover:bg-red-800 ring-opacity-50 max-w-1/2 ring-red-800 font-bold text-white"
          >
            End Consultation
          </button>

          <button
            type="button"
            className="px-6 py-3 -full ring-2 bg-blue rounded-lg lg:m-0 hover:bg-blue-800 ring-opacity-50 max-w-1/2 ring-blue-800 font-bold text-white"
            onClick={() => setShowPrescriptions(true)}
          >
            Prescriptions
          </button>
        </div>
      </form>
    </div>
  );
};

export default DoctorNotes;
