import React, { useEffect ,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RowDetails6 from '../components/RowDetails6'
import { GetAllEventByTitle } from "src/redux/actions/eventUserActions";

function Admin() {
  const Datacomment = useSelector(state => state.eventUser.eventsUser)
  const events = useSelector(state => state.events)
  const dispatch  = useDispatch()
  const [event, setEvent] = useState(() => {
    // getting stored value
  const saved = localStorage.getItem("event");
  const initialValue = JSON.parse(saved);
  return initialValue || "";
});
let newArray = Datacomment.filter(function (el) {
  return el.comment = "" 
      
}
);
  useEffect(()=>{
    const result = Datacomment.filter((word) => word.comment ="");
    console.log("result")
    console.log(result)
  },[])
  useEffect(()=>{async function fetchData(){
    console.log(event.title)
    await dispatch(GetAllEventByTitle(event.title))
  }; fetchData()},[])
 
  return (
    <div className="container ">
    <div >
       
       <div >
           <div className="d-flex">
            <i className="fa-solid fa-user fs-1 mx-2"></i> <h2>Liste des commentaires</h2>
           </div>
           <div className="shadow-lg p-3 mb-5 bg-body rounded" style={{backgroundColor: "white"}}>
            <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">comment</th>
                    <th scope="col">date</th>
                    <th scope="col">actions </th>

                  </tr>
                </thead>
                <tbody>
                  {
                    Datacomment.map(({_id, comment, title,user,date,createdAt})=>(
                       <RowDetails6 key={_id} _id={_id} user={user} title={title} date={date} comment={comment} createdAt={createdAt}  />
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