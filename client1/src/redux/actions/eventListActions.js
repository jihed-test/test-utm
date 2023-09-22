import axios from 'axios'
import { ERRORS, DELETE_EVENT_LIST, SET_EVENT_LIST, SET_EVENTS_LIST } from "../types";

export const AddEventList = (form, setShow, setMessage)=>dispatch=>{
    axios
      .post("/api/eventList", form)
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
export const GetEventLists = ()=>dispatch=>{
    axios
      .get("/api/eventsList")
      .then(res => {
          dispatch({
              type: SET_EVENTS_LIST,
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
export const DeleteEventList = (id)=>dispatch=>{
     axios
     .delete(`/api/eventsList/${id}`)
     .then(res => {
         dispatch({
             type: DELETE_EVENT_LIST,
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

