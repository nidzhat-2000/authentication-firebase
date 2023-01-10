import { Link, Route, Routes } from "react-router-dom";
import Home from "./Pages2/Home";
import Login from "./Pages2/Login";
import Register from "./Pages2/Register";
import Settings from "./Pages2/Settings";

import { Toaster } from "react-hot-toast";
import Modal from "./Pages2/Comps/Modal";
import { useSelector } from "react-redux";

function App() {
  const { open, data } = useSelector((state) => state.modal);

  return (
    <div className="App">
      <Link to="/">
        <h1 className="text-red-600 text-3xl text-slate-300 text-center">
          Home
        </h1>
      </Link>
      <Toaster position="top-right" />
      {open && <Modal name={open} data={data} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
}

export default App;
