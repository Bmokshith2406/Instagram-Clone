import React from 'react'
import { RiCloseLine } from "react-icons/ri";
import "./Modal.css"
import { useNavigate } from 'react-router-dom';

export default function Modal({setModalOpen}) {
    const navigate = useNavigate();
  return (<>
  <div className="darkBg" onClick={()=>setModalOpen(false)}>
  <div className="centered">
  <div className="modal">
        <div className="modalHeader">
            <h5 className='heading'>Confirm Action</h5>
        </div>
        <button className='closeBtn' onClick={()=>setModalOpen(false)}>
        <RiCloseLine></RiCloseLine>
        </button>
        <div className="modalContent">
            D'ye Really want to Sign Out ?
        </div>
        <div className="modalActions">
            <div className="actionContainer">
                <button className='logOutBtn' onClick={()=>{
                    setModalOpen(false)
                    localStorage.clear()
                    navigate("./signup")
                }}>Sign Out</button>
                <button className='cancelBtn' onClick={()=>setModalOpen(false)}>Cancel</button>
            </div>
        </div>
    </div>
  </div>
  </div>  
    </> 
  )
}
