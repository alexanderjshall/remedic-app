import React from "react";
import useChat from "../../../hooks/useChat";
import { useAuth } from "../../../Contexts/Auth.context";
import { Redirect } from "react-router-dom";

const consultationId = "1";

const ConfirmationPage = () => {
  const { user } = useAuth();
  const { messages } = useChat(consultationId, false, user!.language);

  return (
    <>
      {messages.length === 0 ? (
        <div className="flex items-center justify-center">
          <h1 className="text-bold text-2xl ">
            Thank you for submitting! Your doctor will shortly be with you.
          </h1>
        </div>
      ) : (
        <Redirect to="/consultation_chat" />
      )}
    </>
  );
};

export default ConfirmationPage;
