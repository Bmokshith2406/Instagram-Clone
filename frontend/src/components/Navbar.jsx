import React, { useContext } from 'react';
import Logo from "../images/logo.png";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from '../context/LoginContext';


export default function Navbar() {
  const { setModalOpen } = useContext(LoginContext);
  return (
    <>
      <aside className="sidebar" data-sidebar>
        <div className="sidebar-info">
          <Link to='/'>
            <figure className="avatar-box">
              <img src={Logo} className="Logo_Image" alt="Instagram Logo" />
            </figure>
          </Link>
        </div>

        <div className="sidebar-info_more">
          <div className="separator"></div>

          <ul className="contacts-list">
            <li className="contact-item">
              <Link to='/'>
                <div className="icon-box">
                  <span className="material-symbols-outlined">house</span>
                </div>
                <span>Home</span>
              </Link>
            </li>

            <li className="contact-item">
              <a href='/'>
                <div className="icon-box">
                  <span className="material-symbols-outlined">search</span>
                </div>
                <span>Search</span>
              </a>
            </li>

            <li className="contact-item">
              <a href='/'>
                <div className="icon-box">
                  <span className="material-symbols-outlined">explore</span>
                </div>
                <span>Explore</span>
              </a>
            </li>

            <li className="contact-item">
              <a href='/'>
                <div className="icon-box">
                  <span className="material-symbols-outlined">animated_images</span>
                </div>
                <span>Reels</span>
              </a>
            </li>

            <li className="contact-item">
              <a href='/'>
                <div className="icon-box">
                  <span className="material-symbols-outlined">chat</span>
                </div>
                <span>Messages</span>
              </a>
            </li>

            <li className="contact-item">
              <a href='/'>
                <div className="icon-box">
                  <span className="material-symbols-outlined">favorite</span>
                </div>
                <span>Notifications</span>
              </a>
            </li>

            <li className="contact-item">
              <Link to='/createpost'>
                <div className="icon-box">
                  <span className="material-symbols-outlined">add_circle</span>
                </div>
                <span>Create Post</span>
              </Link>
            </li>

            <li className="contact-item">
              <Link to='/profile'>
                <div className="icon-box">
                  <span className="material-symbols-outlined">account_circle</span>
                </div>
                <span>Profile</span>
              </Link>
            </li>

            <li className="contact-item" style={{ marginTop: "45px" }}>
              <a href='https://www.threads.net/' target='_blank'>
                <div className="icon-box">
                  <span className="material-symbols-outlined">alternate_email</span>
                </div>
                <span>Threads</span>
              </a>
            </li>
            <li className="contact-items" onClick={() => setModalOpen(true)}>
              <Link>
                <div className="icon-box">
                  <span className="material-symbols-outlined">logout</span>
                </div>
                <span>Log Out</span>
              </Link>
            </li>
          </ul>

        </div>
      </aside>
    </>
  );
}
