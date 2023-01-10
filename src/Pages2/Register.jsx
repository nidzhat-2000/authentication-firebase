import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerProfile } from "../utils/firebase";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandle = async (e) => {
    e.preventDefault();
    const user = await registerProfile(email, password);
    if (user) {
      navigate("/", {
        replace: true,
      });
    }
    console.log(user);
  };

  return (
    <form className="w-1/2 mx-auto my-10" onSubmit={submitHandle}>
      <label className="block text-lg  font-medium text-gray-700 ">Email</label>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="shadow-sm mb-5 placeholder:text-slate-400 h-10 px-2 border-black focus:ring-indigo-500 focus:border-blue-500  w-full sm:text-sm"
      />

      <label className="block text-lg  font-medium text-gray-700 ">
        Password
      </label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="shadow-sm mb-5 placeholder:text-slate-400 h-10 px-2 border-black focus:ring-indigo-500 focus:border-blue-500  w-full sm:text-sm"
      />
      <div className="ml-auto">
        <button type="submit" className="bg-gray-100 w-40 mx-auto">
          Register
        </button>
      </div>
    </form>
  );
}

export default Register;
