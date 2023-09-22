import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RowDetails1 from '../components/RowDetails1'
import RowDetails5 from '../components/RowDetails5'
import { GetEventLists } from '../redux/actions/eventListActions'

function Admin() {
  
  const events = useSelector(state => state.events)
  const dispatch  = useDispatch()
  useEffect(()=>{async function fetchData(){
    await dispatch(GetEventLists())
    console.log(events)
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
 console.log("objClean")
 console.log(objClean)
 
  return (
    <div className="container p-4 mt-4">
    <div className="row justify-content-evenly mt-4">
       
       <div className="col-lg-12 col-md-12 mt-4">
           <div className="d-flex">
            <i className="fa-solid fa-user fs-1 mx-2"></i> <h2>Liste des événements</h2>
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
                    events.events.map(({_id, title, date})=>(
                       <RowDetails1 key={_id} _id={_id} title={title} date={date} />
                    ))
                  }
                  
                </tbody>
              </table>
        </div>
       </div>


       <div className="col-lg-12 col-md-12 mt-4">
           <div className="d-flex">
            <i className="fa-solid fa-user fs-1 mx-2"></i> <h2>Événement : Liste des commentaires</h2>
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
                    objClean.map(({_id, title, date})=>(
                       <RowDetails5 key={_id} _id={_id} title={title} date={date} />
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