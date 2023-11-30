import axios from 'axios'
import { ERRORS, SET_PROFILE, SET_PROFILES, DELETE_PROFILE } from '../types';

export const AddProfile = (form, setShow, setMessage)=>dispatch=>{
    axios
      .post("/api/profiles", form)
      .then(res => {
        setShow(true)
        setMessage("User added with success")
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
export const SendPdf = (id,file, setShow, setMessage)=>dispatch=>{
    let formData = new FormData();
    formData.append("file", file);
    axios
      .post(`/api/send-email-pdf${id}`, file,{
        headers: {
          "Content-Type": "multipart/form-data",
        }})
      .then(res => {
        setShow(true)
        setMessage("User Send Pdf with success")
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

export const GetProfile = ()=>dispatch=>{
    axios
      .get("/api/profile")
      .then(res => {

          dispatch({
              type: SET_PROFILE,
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

export const GetProfiles = (page,size)=>dispatch=>{
    axios
      .get(`/api/profiles?page=${page}&size=${size}`)
      .then(res => {
          dispatch({
              type: SET_PROFILES,
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

export const DeleteProfile = (id)=>dispatch=>{
   if(window.confirm("are you sure to delete this user?")){
    axios
    .delete(`/api/profiles/${id}`)
    .then(res => {
        dispatch({
            type: DELETE_PROFILE,
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
}