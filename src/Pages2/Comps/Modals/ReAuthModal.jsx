import React from "react";
import { loginProfile, reAuth } from "../../../utils/firebase";
import LoginForm from "../LoginForm";

function ReAuthModal({ close }) {
  const handleSubmit = async (e, email, password) => {
    e.preventDefault();

    // const user = await loginProfile(email, password);
    const result = await reAuth(password);
    console.log(result);
    if (result) {
      close();
    }
  };

  return <LoginForm handleSubmit={handleSubmit} noEmail={true} />;
}

export default ReAuthModal;
