import React, { useState } from "react";

function LoginForm({ handleSubmit, forgot, noEmail = false }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handle = (e) => {
    handleSubmit(e, email, password);
  };

  return (
    <div>
      <form className="w-1/2 mx-auto my-10" onSubmit={handle}>
        {!noEmail && (
          <div>
            <label className="block text-lg  font-medium text-gray-700 ">
              Email
            </label>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow-sm mb-5 placeholder:text-slate-400 h-10 px-2 border-black focus:ring-indigo-500 focus:border-blue-500  w-full sm:text-sm"
            />
          </div>
        )}
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
            Login
          </button>
        </div>
      </form>
      <form className="w-1/2 mx-auto my-10" onSubmit={forgot}>
        <label className="block text-lg  font-medium text-gray-700 ">
          Email
        </label>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="shadow-sm mb-5 placeholder:text-slate-400 h-10 px-2 border-black focus:ring-indigo-500 focus:border-blue-500  w-full sm:text-sm"
        />
        <div className="ml-auto">
          <button type="submit" className="bg-gray-100 w-40 mx-auto">
            Forgot password
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
