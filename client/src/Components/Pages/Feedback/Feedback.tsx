import React, { useContext, useState } from "react";
import starIcon from "../../../assets/utils/star.svg";
import { useAuth } from "../../../Contexts/Auth.context";
import filledStarIcon from "../../../assets/utils/filled-star.svg";
import logoReduced from "../../../assets/logos/logo-reduced.svg";
import { useHistory } from "react-router-dom";
import { ConsultationContext } from "../../../Contexts/Consultation.context";
import { useMutation } from "react-query";
import { ConsultationFeedback } from "../../../types";
import client from "../../../services/graphqlService";
import mutations from "../../../services/graphqlService/mutations";
import { PatientContext } from "../../../Contexts/Patient.context";
import { Transition } from "@headlessui/react";

interface RatingStar {
  filled: boolean;
}

const Feedback = () => {
  //Local States
  const { logout } = useAuth();
  const [rating, setRating] = useState(0);
  const [stars, setStars] = useState(
    Array<RatingStar>(5).fill({ filled: false })
  );

  const { getTranslatedText } = useContext(PatientContext)!;
  const translatedText = getTranslatedText();
  const localText = translatedText.feedbackTerms;
  const localTextUtils = translatedText.utils;

  const { getConsultationId } = useContext(ConsultationContext)!;

  const history = useHistory();

  const handleStarClick = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
    i: number
  ): void => {
    const ratingNum: number = i + 1;
    setRating(ratingNum);

    const newStarSet: RatingStar[] = [];
    for (let j = 0; j < ratingNum; j++) {
      newStarSet.push({ filled: true });
    }
    for (let j = ratingNum; j < 5; j++) {
      newStarSet.push({ filled: false });
    }
    setStars(newStarSet);
  };

  const mutation = useMutation(
    "update consultation",
    async (variables: ConsultationFeedback) => {
      await client.request(mutations.updateConsultation, variables),
        {
          onSuccess: () => console.log("FeedbackRating Updated Successfully"), //!
        };
    }
  );

  const handleEndConsultation = (): void => {
    const consultationId = getConsultationId();
    if (rating !== 0 && consultationId) {
      const consultationFeedback: ConsultationFeedback = {
        patientRating: rating,
        id: consultationId,
      };
      mutation.mutate(consultationFeedback);
      // logout disabled to keep patient side of app functional
      // logout();
    }
    history.push("/patient_landing");
  };

  return (
    <Transition
    appear={true}
    show={true}
    enter="transition-opacity delay-75 ease-in-out duration-500"
    enterFrom="opacity-0"
    enterTo="opacity-100"
    className="flex items-center justify-center flex-col bg-white h-full"
  >
      <div className="flex items-center justify-center flex-col h-5/6 w-5/6 shadow-lg">
        <img
          src={logoReduced}
          alt="logo"
          className="w-32 mb-10 animate-pulse"
        />
        <div className="flex flex-col items-center justify mt-8">
          <h2 className="text-blue-light font-bold">{localText.end}</h2>
          <h1 className="font-bold text-xl pt-4">{localText.rate}</h1>
          <div className="flex items-center justify-between mt-8">
            {stars &&
              stars.map((star, i) => (
                <img
                  key={i}
                  src={star.filled ? filledStarIcon : starIcon}
                  alt={`${i} star`}
                  className="w-8 mx-1"
                  onClick={(
                    e: React.MouseEvent<HTMLImageElement, MouseEvent>
                  ): void => {
                    handleStarClick(e, i);
                  }}
                ></img>
              ))}
          </div>
        </div>
        <button
          className="mt-16 bg-blue w-3/4 max-w-2xl py-4 rounded-lg font-bold text-white text-2xl"
          onClick={handleEndConsultation}
        >
          {localTextUtils.end}
        </button>
      </div>
      <footer className="bg-blue-dark w-100 h-4"></footer>
    </Transition>
  );
};

export default Feedback;
