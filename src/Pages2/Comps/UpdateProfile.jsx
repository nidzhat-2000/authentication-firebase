import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth";
import { auth, update, updateParole } from "../../utils/firebase";

function UpdateProfile() {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const user = auth.currentUser;

  const updateInfo = async (e) => {
    e.preventDefault();
    await update({
      displayName: name,
      photoURL: avatar,
    });
    dispatch(
      logIn({
        displayName: user.displayName,
        photoURL: user.photoURL,
        uid: user.uid,
        emailVerified: user.emailVerified,
        email: user.email,
      })
    );
  };

  const updatePass = async (e) => {
    e.preventDefault();
    const isUpdated = await updateParole(password);
    if (isUpdated) {
      // navigate("/login", {
      //   replace: true,
      // });
      setPassword("");
    }
  };

  return (
    <div>
      <form className="w-1/2 mx-auto my-10" onSubmit={updateInfo}>
        <label className="block text-lg  font-medium text-gray-700 ">
          Your name
        </label>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="shadow-sm mb-5 placeholder:text-slate-400 h-10 px-2 border-black focus:ring-indigo-500 focus:border-blue-500  w-full sm:text-sm"
        />
        <label className="block text-lg  font-medium text-gray-700 ">
          Avatar
        </label>
        <input
          type="text"
          placeholder="Photo url"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          className="shadow-sm mb-5 placeholder:text-slate-400 h-10 px-2 border-black focus:ring-indigo-500 focus:border-blue-500  w-full sm:text-sm"
        />

        <div className="ml-auto">
          <button type="submit" className="bg-gray-100 w-40 mx-auto">
            Update Profile
          </button>
        </div>
      </form>

      <form className="w-1/2 mx-auto my-10" onSubmit={updatePass}>
        <label className="block text-lg  font-medium text-gray-700 ">
          Update Password
        </label>
        <input
          type="password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="shadow-sm mb-5 placeholder:text-slate-400 h-10 px-2 border-black focus:ring-indigo-500 focus:border-blue-500  w-full sm:text-sm"
        />

        <div className="ml-auto">
          <button type="submit" className="bg-gray-100 w-40 mx-auto">
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateProfile;
