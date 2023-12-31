import React, { useEffect ,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RowDetails6 from '../components/RowDetails6'
import { GetAllEventByTitle } from "src/redux/actions/eventUserActions";
import { useTranslation } from 'react-i18next';
import MaterialTable5 from '../components/pagination/material-table5';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage } from '@fortawesome/free-solid-svg-icons'

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
console.log("Datacomment")
console.log(Datacomment)
// const test= JSON.parse(Datacomment);
// const test= Datacomment;
// let newArray = test.filter((word) => word.comment ="");
 
    // const result = test.filter((word) => {
    //   console.log(word)
    // if (word.comment !=="") {
    //   return word;
    // }});
  useEffect(()=>{async function fetchData(){ 
    await dispatch(GetAllEventByTitle(event.title))
  }; fetchData()},[])
 Datacomment
  return (
    <div className="container ">
    <div >
       
       <div >
       <div className="col-lg-12 col-md-12 mt-4">
           <div className="d-flex">
           <FontAwesomeIcon icon={faMessage} className=" fs-1 mx-2"></FontAwesomeIcon> 
             <h2>{t('Liste des commentaires')}</h2>
           </div>
           <div className="shadow-lg p-3 mb-5 bg-body rounded" style={{backgroundColor: "white"}}>
                  <MaterialTable5 data={Datacomment}/>
                  </div>
                  </div>
          
                  </div>
                  </div>
</div>

)
}

export default Admin