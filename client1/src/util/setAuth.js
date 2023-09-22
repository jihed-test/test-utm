import axios from "axios";

export const setAuth = (token)=>{
  if(token){
    axios.defaults.headers.common['Authorization'] = token;
    //console.log(axios.defaults.headers.common['Authorization'])
  }else{
    delete axios.defaults.headers.common['Authorization']
  }
}