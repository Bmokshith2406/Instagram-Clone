import React,{useContext} from 'react';
import Logo from "../images/instagram.svg";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from '../context/LoginContext';

export default function Short_Navbar() {
  const {setModalOpen} = useContext(LoginContext);
  return (
    <>
    <aside className="sidebars" data-sidebar>
      <div className="sidebar-info">
        <Link to='/'>
        <figure className="avatar-box">
          <img src={Logo} className="Logo_Imagess" alt="Instagram Logo"  />
        </figure>
        </Link>
      </div>
      <div className="sidebar-info_more">
        <div className="separator"></div>

        <ul className="contacts-lists">
          <li className="contact-item">
            <Link to='/' style={{textDecoration:"none",color:"black"}}>
              <div className="icon-box">
                <span className="material-symbols-outlined">house</span>
              </div>
            </Link>
          </li>

          <li className="contact-item">
            <a href='/'>
              <div className="icon-box">
                <span className="material-symbols-outlined">search</span>
              </div>
              
            </a>
          </li>

          <li className="contact-item">
            <a href='/'> 
              <div className="icon-box">
                <span className="material-symbols-outlined">explore</span>
              </div>
              
            </a>
          </li>

          <li className="contact-item">
            <a href='/'> 
              <div className="icon-box">
              <span className="material-symbols-outlined">animated_images</span>
              </div>
              
            </a>
          </li>

          <li className="contact-item">
            <a href='/'>
              <div className="icon-box">
                <span className="material-symbols-outlined">chat</span>
              </div>
              
            </a>
          </li>

          <li className="contact-item">
            <a href='/'>
              <div className="icon-box">
                <span className="material-symbols-outlined">favorite</span>
              </div>
              
            </a>
          </li>

          <li className="contact-item">
            <Link to='/createpost'>
              <div className="icon-box">
                <span className="material-symbols-outlined">add_circle</span>
              </div>
              
            </Link>
          </li>

          <li className="contact-item">
            <Link to='/profile'>
              <div className="icon-box">
                <span className="material-symbols-outlined">account_circle</span>
              </div>
              
            </Link>
          </li>

          <li className="contact-item" style={{marginTop:"60px"}}>
            <a href='https://www.threads.net/' target='_blank'>
              <div className="icon-box">
                <span className="material-symbols-outlined">alternate_email</span>
              </div>
              
            </a>
          </li>

          <li className="contact-items" onClick={()=>setModalOpen(true)}>
            <a>
              <div className="icon-box">
                <span className="material-symbols-outlined">logout</span>
              </div>
              
            </a>
          </li>
        </ul>

      </div>
    </aside>
    </>
  )
}
