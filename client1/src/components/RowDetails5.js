import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DeleteEventList } from "../redux/actions/eventListActions";
import Button from '@mui/material/Button';
function RowDetails({ _id, title, date, description }) {
  const navigate = useNavigate();
  const handleOpen = () => 
  { localStorage.setItem("event", JSON.stringify({ title, date, description }));
    navigate("/dashboard/EventCommentList")};

  return (
    <tr>
      <th>{title}</th>
      <td>{date}</td>
      <td>
        <div>
          <Button onClick={handleOpen}>Comment List</Button>
        </div>
      </td>
    </tr>
  );
}

export default RowDetails;
