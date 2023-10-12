import React, { useEffect ,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RowDetails6 from '../components/RowDetails6'
import { GetAllEventByTitle } from "src/redux/actions/eventUserActions";
import { useTranslation } from 'react-i18next';
function Admin() {
  const { t, i18n } = useTranslation();
  const Datacomment = useSelector(state => state.eventUser.eventsUser)
  const events = useSelector(state => state.events)
  const dispatch  = useDispatch()
  const [event, setEvent] = useState(() => {
    // getting stored value
  const saved = localStorage.getItem("event");
  const initialValue = JSON.parse(saved);
  return initialValue || "";
});
const test= JSON.parse(Datacomment);
let newArray = test.filter((word) => word.comment ="");
 
    const result = test.filter((word) => {
      console.log(word)
    if (word.comment !=="") {
      return word;
    }});
    console.log(test)
  useEffect(()=>{async function fetchData(){ 
    await dispatch(GetAllEventByTitle(event.title))
  }; fetchData()},[])
 Datacomment
  return (
    <div className="container ">
    <div >
       
       <div >
           <div className="d-flex">
            <i className="fa-solid fa-user fs-1 mx-2"></i> <h2>{t('Liste des commentaires')}</h2>
           </div>
           <div className="shadow-lg p-3 mb-5 bg-body rounded" style={{backgroundColor: "white"}}>
            <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">{t('comment')}</th>
                    <th scope="col">{t('date')}</th>
                    <th scope="col">{t('actions')} </th>

                  </tr>
                </thead>
                <tbody>
                  {
                    result.map(({_id, comment, title,user,date,createdAt})=>(
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