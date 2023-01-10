import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logIn } from "../redux/auth";
import { forgotPassword, loginProfile } from "../utils/firebase";
import LoginForm from "./Comps/LoginForm";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e, email, password) => {
    e.preventDefault();
    const signedUser = await loginProfile(email, password);
    // console.log(signedUser);
    // dispatch(logIn(signedUser));
    if (signedUser) {
      navigate("/", {
        replace: true,
      });
    }
  };

  const forgot = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
  };

  return <LoginForm handleSubmit={handleSubmit} forgot={forgot} />;
}

export default Login;
