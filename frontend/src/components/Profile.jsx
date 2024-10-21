import React, { useEffect, useState } from 'react';
import Mysnap from "../images/FOTO0225.JPG";
import { useNavigate } from 'react-router-dom';
import "./Profile.css";
import Navbar from './Navbar';

export default function Profile() {
  const [pic, setPic] = useState([]);
  const [name, setName] = useState('User'); // State for user name
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    const user = localStorage.getItem("user");
    
    if (!token) {
      navigate("/signup");
    }
    
    if (user) {
      try {
        const userData = JSON.parse(user);
        setName(userData.name); 

        fetch("http://localhost:5000/myposts", {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(res => res.json())
        .then(result => {
          setPic(result); // Set the pics
        })
        .catch(error => console.error('Error fetching posts:', error));
      } catch (e) {
        console.error('Error parsing user data from localStorage:', e);
      }
    }
  }, [navigate]); // Depend on navigate to re-run if it changes

  return (
    <>
      <div className="part1s"><Navbar /></div>
      <div className="part2s">
        <div className='profile'>
          <div className="profile-frame">
            <div className="profile-pic">
              <img src={Mysnap} alt="Profile Pic" />
            </div>
            <div className="profile-data">
              <h1>{name}</h1> 
              <div className="profile-info" style={{ display: "flex" }}>
                <p>40 Posts</p>
                <p>50 Followers</p>
                <p>50 Following</p>
              </div>
            </div>
          </div>
          <hr className='Linesu' style={{ width: "auto", margin: "auto", opacity: "0.75", marginTop: "50px" }} />
          <div className="gallery">
            {pic.map((item) => (
              <img className='item' key={item._id} src={item.photo} alt="Post" />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
