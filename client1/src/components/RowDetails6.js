import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AddEventUser,GetAllEventByTitle } from "src/redux/actions/eventUserActions";

import Button from '@mui/material/Button';
function RowDetails({  _id, comment, title,user,date,createdAt}) {
  const dispatch =  useDispatch()
  const [message, setMessage] = useState("")
  const [show, setShow] = useState(false)
  const [data, setData] = useState({ _id,title,user,date,createdAt,"comment":""});
  const navigate = useNavigate();
  // delete comment
  let commentDelete = async() => {
    await dispatch(AddEventUser(data, setShow, setMessage))
    dispatch(GetAllEventByTitle(data.title))
  };
  const handleOpen = () => 
  { 
    navigate("/dashboard/EventCommentList")};
  return (
    <tr>
      <th>{comment}</th>
      <td>{createdAt}</td>
      <td>
        <div>
          <Button onClick={commentDelete}>Delete</Button>
        </div>
      </td>
    </tr>
  );
}

export default RowDetails;
