import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RowDetails1 from '../components/RowDetails1'
import RowDetails5 from '../components/RowDetails5'
import { GetEventLists } from '../redux/actions/eventListActions'
import { useTranslation } from 'react-i18next';
import MaterialTable3 from '../components/pagination/material-table3';
import MaterialTable4 from '../components/pagination/material-table4';

function Admin() {
  const { t, i18n } = useTranslation();
  const events = useSelector(state => state.events)
  const dispatch  = useDispatch()
  useEffect(()=>{async function fetchData(){
    await dispatch(GetEventLists())
   
  }; fetchData()},[])
  const objClean= events.events.filter((item) => {
    // Create a new Date object for the given date
    const givenDate = new Date(item.date).getTime();
  // Get the current date
  const currentDate = new Date().getTime();
// Compare the two dates using getTime() method and check if the given date is in the past
if (givenDate < currentDate) {
 return item;
}} 
 ); 
 
 
  return (
    <div className="container p-4 mt-4">
    <div className="row justify-content-evenly mt-4">
    <div className="col-lg-12 col-md-12 mt-4">
           <div className="d-flex">
            <i className="fa-solid fa-user fs-1 mx-2"></i> <h2>{t('Liste des événements')}</h2>
           </div>
           <div className="shadow-lg p-3 mb-5 bg-body rounded" style={{backgroundColor: "white"}}>
                  <MaterialTable3 data={events.events}/>
                  </div>
                  </div>
                  <div className="col-lg-12 col-md-12 mt-4">
           <div className="d-flex">
            <i className="fa-solid fa-user fs-1 mx-2"></i> <h2>Événement : Liste des commentaires</h2>
           </div>
           <div className="shadow-lg p-3 mb-5 bg-body rounded" style={{backgroundColor: "white"}}>
                  <MaterialTable4 data={objClean}/>
                  </div>
                  </div>
       


      
   </div>
</div>

)
}

export default Admin