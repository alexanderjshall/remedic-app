import React, { useState } from "react";
import useChat from "../../../hooks/useChat";
import OKButton from "../../Globals/OKButton/OKButton";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";

import { useDrContext } from "../../../Contexts/Doctor.context";
import { useHistory } from "react-router-dom";
import SymptomDescriptor from "./SymptomDescriptor/SymptomDescriptor";

// Import Swiper styles
import "swiper/swiper-bundle.css";
import DoctorNotes from "./DoctorNotes/DoctorNotes";
import Chat from "./Chat/Chat";

const DoctorChat2 = () => {
  const {
    currentConsultation,
    editConsultation,
    doctorNotes,
    setDoctorNotes,
  } = useDrContext();
  const history = useHistory();
  const [currentMsg, setCurrentMsg] = useState<string>("");

  const patientFullName = `${currentConsultation!.patientId.firstName} ${
    currentConsultation!.patientId.lastName
  }`;

  const { messages, addMessage, endConsultation } = useChat(
    String(currentConsultation!.id),
    true,
    "",
    patientFullName,
    currentConsultation!.patientId!.language,
    () => endChat()
  );

  const endChat = () => {
    editConsultation.mutate();
    history.push("/doctor/queue");
  };

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (currentMsg.length > 0) {
        addMessage(currentMsg);
        setCurrentMsg("");
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

  return (
    <>
      <div className="w-full fixed h-20 bg-blue-light top-0 left-0 flex items-center justify-center z-10">
        <h1 className="font-bold text-2xl text-white-ghost">
          {patientFullName}
        </h1>
      </div>
      <Swiper
        className="h-full"
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>
          <SymptomDescriptor currentConsultation={currentConsultation} />
        </SwiperSlide>
        <SwiperSlide>
          <DoctorNotes
            doctorNotes={doctorNotes}
            setDoctorNotes={setDoctorNotes}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Chat messages={messages} addMessage={addMessage} />
          {/* <h1>CHAT</h1> */}
        </SwiperSlide>
      </Swiper>
      {/* <SymptomDescriptor currentConsultation={currentConsultation} /> */}
    </>
  );
};

export default DoctorChat2;
