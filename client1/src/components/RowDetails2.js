import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DeleteEventList } from "../redux/actions/eventListActions";
import Button from '@mui/material/Button';
function RowDetails({ _id, title, date, description }) {
  const navigate = useNavigate();
  const handleOpen = () => 
  { localStorage.setItem("event", JSON.stringify({ title, date, description }));
    navigate("/dashboard/EventShow")};

  return (
    <tr>
      <th>{title}</th>
      <td>{date}</td>
      <td>
        <div>
          <Button onClick={handleOpen}>Open detail</Button>
          {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <span dangerouslySetInnerHTML={{ __html: description||"" }} />          </Typography>
        </Box>
      </Modal> */}
        </div>
      </td>
    </tr>
  );
}

export default RowDetails;
