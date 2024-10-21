import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Mysnap from "../images/FOTO0225.JPG";
import "./Main_Home.css";
import { toast } from "react-toastify";
import Navbar from './Navbar';

export default function Main_Home() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [comment, setComment] = useState("")
  const [show, setShow] = useState(false)
  const [item, setItem] = useState()

  const notifyB = (msg) => toast.success(msg);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("/signup");
    }
    // Fetching Posts
    fetch("http://localhost:5000/allposts", {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    })
      .then(res => res.json())
      .then(result => {
        setData(result);
      })
      .catch(err => console.log(err));
  }, [navigate]);

  //To Show Comments in Alternate Screen Above
  const  toggleComment =(post)=>{
    if(show){
      setShow(false)
    }else{
      setShow(true)
      setItem(post)
    }
  };

  const likePost = (id) => {
    fetch("http://localhost:5000/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then(res => res.json())
      .then(result => {
        const newData = data.map(post => {
          return post._id === result._id ? result : post;
        });
        setData(newData);
        console.log(result);
      })
      .catch(err => console.log(err));
  };

  const unlikePost = (id) => {
    fetch("http://localhost:5000/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then(res => res.json())
      .then(result => {
        const newData = data.map(post => {
          return post._id === result._id ? result : post;
        });
        setData(newData);
        console.log(result);
      })
      .catch(err => console.log(err));
  };

  const makeComment=(text,id)=>{
    fetch("http://localhost:5000/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        text:text,
        postId: id,

      }),
    })
      .then(res => res.json())
      .then(result => {
        const newData = data.map(post => {
          return post._id === result._id ? result : post;
        });
        setData(newData);
        setComment("")
        notifyB("Comment Posted Successfully.");
        console.log(result);
      })
      .catch(err => console.log(err));
  }

  return (
    <>
      <Navbar />
      <div className='home'>
        {data.map((post) => (
          <div className='card' key={post._id}>
            <div className="card-header">
              <div className="card-pic">
                <img src={Mysnap} alt="Profile" />
              </div>
              <h5>{post.postedBy.name}</h5>
            </div>
            <div className="card-image">
              <img src={post.photo} alt="Post" />
            </div>
            <div className="card-content">
              {
                post.likes.includes(JSON.parse(localStorage.getItem("user"))._id)?
                (<span className="material-symbols-outlined material-symbols-outlined-red" onClick={() => unlikePost(post._id)}>
                favorite
              </span>):
              (<span className="material-symbols-outlined" onClick={() => likePost(post._id)}>
              favorite
            </span>)
              }
              <p>{post.likes.length} Likes</p>
              <p>{post.body}</p>
              <p style={{ fontWeight: "bold", cursor: "pointer" }} onClick={() => {
                  toggleComment(post);
                }}>View all Comments!</p>
            </div>
            <div className="add-comment">
              <span className="material-symbols-outlined">mood</span>
              <input type='text' placeholder='Add a Comment' value={comment} onChange={(e)=>{setComment(e.target.value)}} />
              <button className='comment' onClick={()=>{makeComment(comment,post._id)}}>Post</button>
            </div>
          </div>
        ))}

        {/* Show Comment */}
        {show && (<div className="showComment">
          <div className="container">
            <div className="postPic">
              <img src={item.photo} alt='Uploaded Photo' />
            </div>
            <div className="details">
              {/* Card Header */}
            <div className="card-header" style={{ borderBottom: "1px solid #00000029" }}>
              <div className="card-pic">
                <img src={Mysnap} alt="Profile" />
              </div>
              <h5>{item.postedBy.name}</h5>
            </div>

            {/* Comment Section */}
            <div className="comment-section" style={{ borderBottom: "1px solid #00000029" }}>

              {item.comments.map((comment)=>{
                return(<p className="comm">
                <span className="commenter" style={{ fontWeight: "bolder" }}>{comment.postedBy.name} &nbsp; </span>
                <span className="commentText"> {comment.comment}</span>
              </p>)
              })}
              
            </div>

            {/* card content */}
            <div className="card-content">
              <p>{item.likes.length} Likes</p>
              <p>{item.body}</p>
            </div>

            {/* Add Comment */}
            <div className="add-comment">
              <span className="material-symbols-outlined">mood</span>
              <input type='text' placeholder='Add a Comment' value={comment} onChange={(e)=>{setComment(e.target.value)}} />
              <button onClick={()=>{
                makeComment(comment,item._id)
              }} className='comment' >Post</button>
            </div>
            </div>
          </div>
          <div className="close-comment" onClick={()=>{toggleComment()}}>
          <span className="material-symbols-outlined material-symbols-outlined-comment">
              close
            </span>
          </div>
        </div>)
        }
      </div>
    </>
  );
}
