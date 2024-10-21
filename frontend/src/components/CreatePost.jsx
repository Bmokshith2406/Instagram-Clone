import "./CreatePost.css"
import React,{useState,useEffect} from 'react'
import Mysnap from "../images/FOTO0225.JPG"
import { useNavigate } from "react-router-dom"
import Short_Navbar from "./Short_Navbar.jsx"
import Imagess from "../images/Image_Demo.png"
import { toast, Toast } from "react-toastify";


export default function CreatePost() {
  const [body,setBody] = useState("");
  const [image,setImage] = useState("");
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  //Toast
  const notifyA = (msg)=> toast.error(msg);
  const notifyB = (msg)=> toast.success(msg);

  useEffect(() => {
    //Saving Post to MongoDB
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("/signup");
    }
    if (url){
      fetch("http://localhost:5000/createpost",{
        method:"post",
        headers:{
          "Content-Type":"application/json",
          "Authorization":"Bearer "+localStorage.getItem("jwt") 
        },
        body:JSON.stringify({
          body,
          pic:url
        })
      }).then(res=>res.json())
      .then(data=>{if(data.error){
        notifyA("data.error")
      }else{
        navigate("/")
        notifyB("Posted Successfully")
      }})
      .catch(err =>console.log(err))

    }
  }, [url])
  

  const postDetails=()=>{
    console.log(body,image)
    const data = new FormData()
    data.append("file",image)
    data.append("upload_preset","Instagram")
    data.append("cloud_name","codesbytes")
    fetch("https://api.cloudinary.com/v1_1/codesbytes/image/upload",{
      method:"post",
      body:data
    }).then(res=>res.json())
    .then(data=>setUrl(data.url))
    .catch(err=>console.log(err))

  }


  const loadfile = (event) => {
    var output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function() {
        URL.revokeObjectURL(output.src);
    }
    document.getElementById('fileInput').style.display = 'none';
}
  const triggerFileInput = () => {
  document.getElementById('fileInput').click();
}
  

  return (
    <>
    <Short_Navbar/>
    <div className="createPost">
        <div className="post-header">
          <h4>Create New Post</h4>
          <button onClick={()=>{postDetails()}} id="post-btn">Share</button>
        </div>
        <div className="main-div">
          <img id="output" src={Imagess} onClick={()=>triggerFileInput()} />
          <input type="file" accept="image/*" id="fileInput" onChange={(event)=>{loadfile(event)
             setImage(event.target.files[0])}} />
        </div>
        <div className="details">
          <div className="card-header">
            <div className="card-pic">
              <img src={Mysnap} alt="Profile-Photo" />
            </div>
            <h5>Mokshith Balidi</h5>
          </div>
          <textarea value={body} onChange={(e)=>{
            setBody(e.target.value)
          }} type="text" placeholder="Caption Please"></textarea>
        </div>
    </div>

    </>

  )
}

