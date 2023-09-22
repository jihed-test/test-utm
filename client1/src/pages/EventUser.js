import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RowDetails2 from '../components/RowDetails2'
import RowDetails3 from '../components/RowDetails3'
import RowDetails4 from '../components/RowDetails4'
import { GetEventLists } from '../redux/actions/eventListActions'
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { GetAllEventUser } from 'src/redux/actions/eventUserActions'

function Admin() {
  const navigate = useNavigate();

  const events = useSelector(state => state.events)
  const eventUser = useSelector(state => state.eventUser)
  const dispatch  = useDispatch()
  useEffect(() => { 
    dispatch(GetAllEventUser())
    console.log("eventUser")
    console.log(typeof(eventUser))
}, [])
  useEffect(() => {async function fetchData (){
    await dispatch(GetEventLists())
    console.log(events)
    console.log("objClean");
  console.log(objClean);
  console.log("objClean2");
  console.log(objClean2);
  };
  fetchData()},[])
  const recordsById = eventUser.eventsUser.reduce((ac, event) => {
    if (event.title) {
      return {
        ...ac,
        [event.title]: event
      }
    }
    return ac
  }, {});
 
  const objClean = events.events.filter((item) => {
    const isDuplicated = recordsById[item.title];
    return !isDuplicated;
  });
  const recordsById2 = objClean.reduce((ac, event) => {
    if (event.title) {
      return {
        ...ac,
        [event.title]: event
      }
    }
    return ac
  }, {});
  const objClean2 = events.events.filter((item) => {
    const isDuplicated = recordsById2[item.title];
    return !isDuplicated;
  });
  const objClean3 = eventUser.eventsUser.filter((item) => {
     // Create a new Date object for the given date
     const givenDate = new Date(item.date).getTime();
   // Get the current date
   const currentDate = new Date().getTime();
// Compare the two dates using getTime() method and check if the given date is in the past
if (givenDate < currentDate) {
  return item;
}} 
  );
  
  console.log("objClean3")
  console.log(objClean3)
  
  return (
    <div className="container p-4 mt-4">
    <div className="row justify-content-evenly mt-4">
       
       <div className="col-lg-12 col-md-12 mt-4">
           <div className="d-flex">
            <i className="fa-solid fa-user fs-1 mx-2"></i> <h2>Event list Not Add</h2>
           </div>
           <div className="shadow-lg p-3 mb-5 bg-body rounded" style={{backgroundColor: "white"}}>
            <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">title</th>
                    <th scope="col">date</th>
                    <th scope="col">actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    objClean.map(({_id, title, date,description})=>(
                       <RowDetails2 key={_id} _id={_id} title={title} date={date} description={description} />
                    ))
                  }
                  
                </tbody>
              </table>
        </div>
       </div>



       <div className="col-lg-12 col-md-12 mt-4">
           <div className="d-flex">
            <i className="fa-solid fa-user fs-1 mx-2"></i> <h2>Liste d'événements non ajoutés</h2>
           </div>
           <div className="shadow-lg p-3 mb-5 bg-body rounded" style={{backgroundColor: "white"}}>
            <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">titre</th>
                    <th scope="col">date</th>
                    <th scope="col">actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    eventUser.eventsUser.map(({_id, title, date,description})=>(
                       <RowDetails3 key={_id} _id={_id} title={title} date={date} description={description} />
                    ))
                  }
                  
                </tbody>
              </table>
        </div>
       </div>



       <div className="col-lg-12 col-md-12 mt-4">
           <div className="d-flex">
            <i className="fa-solid fa-user fs-1 mx-2"></i> <h2>Liste des événements commentés :</h2>
           </div>
           <div className="shadow-lg p-3 mb-5 bg-body rounded" style={{backgroundColor: "white"}}>
            <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">titre</th>
                    <th scope="col">date</th>
                    <th scope="col">actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    objClean3.map(({_id, title, date,description})=>(
                       <RowDetails4 key={_id} _id={_id} title={title} date={date} description={description} />
                    ))
                  }
                  
                </tbody>
              </table>
        </div>
       </div>
   </div>
</div>

)
}

export default Admin