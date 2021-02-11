import React, { useState } from "react";
import useChat from "../../../hooks/useChat";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { ReactComponent as UserIcon } from "../../../assets/utils/user_icon.svg";

import { useDrContext } from "../../../Contexts/Doctor.context";
import { useHistory } from "react-router-dom";
import DoctorPrescriptions from "./DoctorPrescriptions";
import SymptomDescriptor from "./SymptomDescriptor/SymptomDescriptor";

// Import Swiper styles
import "swiper/swiper-bundle.css";
import DoctorNotes from "./DoctorNotes/DoctorNotes";
import Chat from "./Chat/Chat";

const DoctorChat = () => {
  const [showPrescriptions, setShowPrescriptions] = useState<boolean>(false);

  const {
    currentConsultation,
    editConsultation,
    doctorNotes,
    setDoctorNotes,
    prescriptions,
    setPrescriptions,
  } = useDrContext();
  const history = useHistory();

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

  SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

  return (
    <>
      {showPrescriptions && (
        <DoctorPrescriptions
          close={() => setShowPrescriptions(false)}
          prescriptions={prescriptions}
          setPrescriptions={setPrescriptions}
        />
      )}
      <div className="w-full fixed h-20 bg-blue-light top-0 left-0 flex items-center justify-center z-10">
        <div className="w-10 h-10 mr-2">
          <UserIcon className="h-full" />
        </div>
        <h1 className="font-bold text-2xl text-white-ghost">
          {patientFullName}
        </h1>
      </div>
      <Swiper
        watchSlidesVisibility={true}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
        }}
        grabCursor={true}
        className="h-full bg-white-dark"
        spaceBetween={40}
        slidesPerView={1}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{
          el: ".swiper-pagination",
          type: "progressbar",
        }}
        effect="fade"
      >
        <SwiperSlide>
          <DoctorNotes
            doctorNotes={doctorNotes}
            setDoctorNotes={setDoctorNotes}
            endConsultation={endConsultation}
            setShowPrescriptions={setShowPrescriptions}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Chat
            messages={messages}
            addMessage={addMessage}
            patientFullName={patientFullName}
          />
        </SwiperSlide>
        <SwiperSlide>
          <SymptomDescriptor currentConsultation={currentConsultation} />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default DoctorChat;
