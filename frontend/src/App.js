import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import Main_Home from "./components/Main_Home";
import { ToastContainer } from "react-toastify";
import React, { createContext, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import CreatePost from "./components/CreatePost";
import { LoginContext } from "./context/LoginContext";
import Modal from "./components/Modal.jsx";

function App() {
  const [userLogin, setUserLogin] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <BrowserRouter>
      <div className="App">
        <LoginContext.Provider value={{ setUserLogin, setModalOpen }}>
          {userLogin}
          <Routes>
            <Route path="/" element={<Main_Home />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/signin" element={<SignIn />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/createpost" element={<CreatePost />}></Route>
          </Routes>
          <ToastContainer theme="dark" />
          {modalOpen && <Modal setModalOpen={setModalOpen}></Modal>}
        </LoginContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
