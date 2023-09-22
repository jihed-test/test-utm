import React from "react";
import { useDispatch } from "react-redux";
import { DeleteEventUser } from "../redux/actions/eventUserActions";
import { useNavigate } from "react-router-dom";

function RowDetails({_id, title, date , description }) {
   const dispatch =  useDispatch()
   const navigate = useNavigate();
    const DeleteHandler = (id)=>{
      dispatch(DeleteEventUser(id))
    }
    const handleOpen = () => 
    { localStorage.setItem("event", JSON.stringify({ title, date, description }));
      navigate("/dashboard/EventQrCode")};
  
  return (
    <tr>
      <th>{title}</th>
      <td>{date}</td>
      <td>
      <button className="btn btn-outline-danger" onClick={()=>handleOpen(_id)}>QRCode</button>
      <button className="btn btn-outline-danger" onClick={()=>DeleteHandler(_id)}>Delete</button>
      </td>
    </tr>
  );
}

export default RowDetails;
