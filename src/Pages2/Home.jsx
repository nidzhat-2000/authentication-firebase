import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../redux/auth";
import {
  addTodo,
  deleteTodo,
  signOutProfile,
  verifyEmail,
} from "../utils/firebase";

function Home() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { todos } = useSelector((state) => state.todos);

  const [todo, setTodo] = useState("");
  const submitTodo = async (e) => {
    e.preventDefault();
    await addTodo({
      todo,
      uid: user.uid,
    });
    setTodo("");
  };

  // console.log(user);

  const logout = async () => {
    await signOutProfile();
    dispatch(logOut());
    navigate("/", {
      replace: "true",
    });
  };

  const verify = async () => {
    await verifyEmail();
  };

  const handleDelete = async (id) => {
    const result = await deleteTodo(id);
  };

  if (user && !user.emailVerified) {
    return (
      <div>
        <h2>Please verify your email adress here</h2>
        <button onClick={verify}>Verify</button>
      </div>
    );
  }

  if (user && user.emailVerified) {
    return (
      <div className="w-1/2 m-auto">
        <img style={{ widht: "40px", height: "40px" }} src={user.photoURL} />
        <h2>Welcome {user.displayName ?? user.email}</h2>
        <button onClick={logout}>Log out</button> <br />
        <Link to="/settings">Update your Profile</Link>
        <form className="mt-4" onSubmit={submitTodo}>
          <label className="block text-lg  font-medium text-gray-700 ">
            Todo
          </label>
          <input
            type="text"
            placeholder="add to do"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            className="shadow-sm mb-5 placeholder:text-slate-400 h-10 px-2 border-black focus:ring-indigo-500 focus:border-blue-500  w-full sm:text-sm"
          />
          <button disabled={!todo}>Add To do</button>
        </form>
        <ul className="mt-4 flex flex-col g-y-2">
          {todos.map((todo) => {
            return (
              <li
                className="p-4 flex justify-between align-center rounded bg-indigo-50 text-sm text-indigo-700"
                key={todo.id}
              >
                {todo.todo} - {todo.id}
                <button
                  onClick={() => handleDelete(todo.id)}
                  className="h-7 rounded px-3 text-xs bg-indigo-700 text-white"
                >
                  delete
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  return (
    <div className="w-1/2 h-20 flex justify-between align-center mx-auto my-10 text-xl">
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </div>
  );
}

export default Home;
