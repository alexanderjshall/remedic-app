import React from "react";
import OKButton from "../../../Globals/OKButton/OKButton";

interface Props {
  doctorNotes: string;
  setDoctorNotes: React.Dispatch<React.SetStateAction<string>>;
  endConsultation: () => void;
}

const DoctorNotes = (props: Props) => {
  const { doctorNotes, setDoctorNotes, endConsultation } = props;

  return (
    <>
      <form className="h-full pt-32 mx-2">
        <label
          htmlFor="doctor_notes"
          className="font-bold text-lg text-opacity-75 whitespace-nowrap w-full"
        >
          <h2 className="text-center">Consultation Notes</h2>
        </label>
        <textarea
          wrap="soft"
          name="doctor_notes"
          id="doctor_notes"
          value={doctorNotes}
          onChange={(e) => setDoctorNotes(e.target.value)}
          className="resize-none w-full p-2 rounded-lg outline-none focus:border-4 mt-2 h-3/4 shadow-2xl placeholder-blue"
          placeholder="Write your notes here"
        ></textarea>
        <div className="flex justify-center w-full mt-10">
          <OKButton
            name="consultation_btn"
            type="button"
            value="End consultation"
            text="End consultation"
            onClick={() => endConsultation()}
          />
        </div>
      </form>
    </>
  );
};

export default DoctorNotes;
