import React from "react";
import { useDispatch } from "react-redux";
import { DeleteEventList } from "../redux/actions/eventListActions";
import { DeleteEventTitle } from "../redux/actions/eventUserActions";


function RowDetails({_id, title, date}) {
   const dispatch =  useDispatch()
    const DeleteHandler = (id)=>{
      dispatch(DeleteEventList(id))
      dispatch(DeleteEventTitle(title))
    }
  return (
    <tr>
      <th>{title}</th>
      <td>{date}</td>
      <td>
        <button className="btn btn-outline-danger" onClick={()=>DeleteHandler(_id)}>Delete</button>
      </td>
    </tr>
  );
}

export default RowDetails;
