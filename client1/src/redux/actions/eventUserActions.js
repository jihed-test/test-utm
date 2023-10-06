import axios from 'axios'
import { ERRORS,SET_EVENT_USER,SET_EVENT_USERS,DELETE_EVENT_USER,DELETE_EVENT_TITLE } from "../types";

export const AddEventUser = (form, setShow, setMessage)=>dispatch=>{
    axios
      .post("/api/event", form)
      .then(res => {
        setShow(true)
        setMessage("Event added with success")
        dispatch({
            type: ERRORS,
            payload: {}
        })
        setTimeout(() => {
            setShow(false)
        }, 4000);
      })
      .catch(err => {
          dispatch({
              type: ERRORS,
              payload: err.response.data
          })
      });
}
//delaitCommentEvent
export const delaitCommentEvent = (form, setMessage)=>dispatch=>{
    axios
      .post("/api/event2", form)
      .then(res => {
        setShow(true)
        setMessage("Event updated with success")
        dispatch({
            type: ERRORS,
            payload: {}
        })
        
      })
      .catch(err => {
          dispatch({
              type: ERRORS,
              payload: err.response.data
          })
      });
}
export const UpdateEventUser = (form, setMessage)=>dispatch=>{
    axios
      .post("/api/event1", form)
      .then(res => {
        setShow(true)
        setMessage("Event updated with success")
        dispatch({
            type: SET_EVENT_USERS,
              payload: res.data
        })
        
      })
      .catch(err => {
          dispatch({
              type: ERRORS,
              payload: err.response.data
          })
      });
}
//AllEvent
export const GetAllEventUser = ()=>dispatch=>{
    
    axios
      .get("/api/AllEvent")
      .then(res => {
          dispatch({
              type: SET_EVENT_USERS,
              payload: res.data
          })
      })
      .catch(err => {
          dispatch({
              type: ERRORS,
              payload: err.response.data
          })
      });
}

//GetAllEventByTitle
export const GetAllEventByTitle = (title)=>dispatch=>{
    
    axios
      .get(`/api/eventTitle/${title}`)
      .then(res => {
          dispatch({
              type: SET_EVENT_USERS,
              payload: res.data
          })
      })
      .catch(err => {
          dispatch({
              type: ERRORS,
              payload: err.response.data
          })
      });
}
export const GetEventUser = (title)=>dispatch=>{
    
    axios
      .get(`/api/event/${title}` )
      .then(res => {

          dispatch({
              type: SET_EVENT_USER,
              payload: res.data
          })
      })
      .catch(err => {
          dispatch({
              type: ERRORS,
              payload: err.response.data
          })
      });
}
export const DeleteEventUser = (id)=>dispatch=>{
     axios
     .delete(`/api/event/${id}`)
     .then(res => {
         dispatch({
             type: DELETE_EVENT_USER,
             payload: id
         })
     })
     .catch(err => {
         dispatch({
             type: ERRORS,
             payload: err.response.data
         })
     });
    
 }
 export const DeleteEventTitle = (title)=>dispatch=>{
     axios
     .delete(`/api/eventTitle/${title}`)
     .then(res => {
         dispatch({
             type: DELETE_EVENT_TITLE,
             payload: title
         })
     })
     .catch(err => {
         dispatch({
             type: ERRORS,
             payload: err.response.data
         })
     });
    
 }