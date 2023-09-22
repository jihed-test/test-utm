import React, { useEffect, useState } from "react";
import Inputs from "../components/Inputs";
//import Date from "../components/date"
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux'
import { AddEventUser,delaitCommentEvent, UpdateEventUser,GetEventUser } from "src/redux/actions/eventUserActions";
import AddComment from "src/components/comment/AddComment";
import Comment from "src/components/comment/Comment";

export default function EventListPage() {
  const dispatch = useDispatch()
  const Datacomment = useSelector(state => state.eventUser.eventUser)

  useEffect(() => {
    dispatch(GetEventUser(event.title))
  },[])
  const events = useSelector(state => state.events.events)

  const [message, setMessage] = useState("")
  const [show, setShow] = useState(true)
  const [deleteModalState, setDeleteModalState] = useState(false);
  const [data, setData] = useState(Datacomment);
  console.log("show")
  console.log(data)
  const [event, setEvent] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem("event");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });
  const result = events.filter((test) => test.title == event.title);
  const onChangeHandler = (e) => {
    setData({
        ...data,
        "comment": e.target.value,
        "createdAt": new Date()
    })
    
}
  let onSubmit = (e) => {
   
    e.preventDefault();

   console.log("show1")
   console.log(data.comment)
    dispatch(UpdateEventUser(data, setMessage))
   
       dispatch(GetEventUser(event.title))
       setShow(false)
 };
  // add comments
  let addComments = (newComment) => {
   
     setData({
      ...data,
      "comment": newComment.comment,
      "createdAt":newComment.createdAt
    })
    console.log(show)
    console.log(data.comment)
     dispatch(UpdateEventUser(data, setMessage))
    
        dispatch(GetEventUser(event.title))

  };


  // edit comment
  let editComment = (content) => {
    dispatch(AddEventUser(data, setMessage))
    dispatch(GetEventUser(event.title))
    setShow(false)
  }
  // delete comment
  let commentDelete = async() => {
    setData({
      ...data,
      "comment": ""
    })
     await dispatch(delaitCommentEvent(data, setMessage))
    dispatch(GetEventUser(event.title))
    setShow(true)
  };
  return (
    <div className="container p-4 mt-4">
      <div className="alert alert-success" role="alert" style={{ display: show ? "block" : "none" }}>
        {message}
      </div>
      <div >

        <div >
          <div className="d-flex">
            <div><h2>Event: {event.title || ""}</h2>
              <br /> <p>{event.date || ""}</p></div>
          </div>
          <div className="shadow-lg p-3 mb-5 bg-body rounded" style={{ backgroundColor: "white" }}>
            <span dangerouslySetInnerHTML={{ __html: result[0].description || "" }} />
          </div>
          {show ?  (<div><form onSubmit={onSubmit}>
            <AddComment  value={data && data.comment ? data.comment : ""} buttonValue={"send"} onChangeHandler={onChangeHandler}
  /></form></div>) : (
            <Comment
            onChangeHandler={onChangeHandler}
            value={data && data.comment ? data.comment : ""}
              commentData={data}
              editComment={editComment}
              commentDelete={commentDelete}
              setDeleteModalState={setDeleteModalState}
            />)}
        </div>
        <p>{data.comment}</p>
      </div>
    </div>
  );
}