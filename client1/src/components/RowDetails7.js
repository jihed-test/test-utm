import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


function RowDetails({_id, title, date,description}) {
  const navigate = useNavigate()

   const dispatch =  useDispatch()
   const handleOpen = () => 
   { localStorage.setItem("event", JSON.stringify({ title, date,description }));
     navigate("/dashboard/EventShow")};
  return (
    <tr >
      <th>{title}</th>
      <td>{date}</td>
      <td>
        <button className="btn btn-outline-danger" onClick={()=>handleOpen(_id)}>afficher les détails</button>
      </td>
    </tr>
  );
}

export default RowDetails;
