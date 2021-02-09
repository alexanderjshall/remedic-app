import React from "react";

interface Props {
  doctorNotes: string;
  setDoctorNotes: React.Dispatch<React.SetStateAction<string>>;
}

const DoctorNotes = (props: Props) => {
  const { doctorNotes, setDoctorNotes } = props;

  return (
    <form className="h-full shadow-sm pt-24 mx-2">
      <label
        htmlFor="doctor_notes"
        className="font-bold text-lg text-opacity-75 whitespace-nowrap w-full"
      >
        <h2 className="text-center">Consultation Notes:</h2>
      </label>
      <textarea
        wrap="soft"
        name="doctor_notes"
        id="doctor_notes"
        value={doctorNotes}
        onChange={(e) => setDoctorNotes(e.target.value)}
        className="resize-none border-black border w-full p-2 rounded-lg outline-none focus:border-4 mt-2 h-3/4"
      ></textarea>
    </form>
  );
};

export default DoctorNotes;
