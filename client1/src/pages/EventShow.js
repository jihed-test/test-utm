import React, { useEffect,useLayoutEffect, useState ,useRef } from "react";
import Inputs from "../components/Inputs";
import Date from "../components/date"
import Button from '@mui/material/Button';
import isEmpty from "../util/isEmpty";
import QRCode from 'qrcode.react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux'
import { AddEventUser,GetEventUser } from "src/redux/actions/eventUserActions";
import { jsPDF } from "jspdf";
import { GetEventLists } from '../redux/actions/eventListActions'
export default function EventListPage() {
  const dispatch = useDispatch()
  useLayoutEffect(()=>{async function fetchData(){
    await dispatch(GetEventLists())
  }; fetchData()},[])
  const { t, i18n } = useTranslation();
  const events = useSelector(state =>{return state.events.events } )

   
  
  const [event, setEvent] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem("event");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });
  const certificateTemplateRef = useRef(null);

  useEffect(() => {async function fetchData (){
    await dispatch(GetEventUser(event.title))
  };
  fetchData()},[])
  const Datacomment = useSelector(state => {return state.eventUser.eventUser||{}})
  const [message, setMessage] = useState("")
  const [show, setShow] = useState(false)
  var user = useSelector(state => {return state.auth.user||{}})
  const result = (events.filter((test) => test.title == event.title))||[];
  const handleOpen = async() => 
  {    
    setEvent({event,user})
    await dispatch(AddEventUser(event, setShow, setMessage))
    dispatch(GetEventUser(event.title))
    
  };
  const handleOpen1= () => {
    // var doc = new jsPDF({
    //   orientation: 'landscape',
    //   unit: 'px',
    //   format: [300, 250]
    // })
    var doc = new jsPDF("p", "mm", "a4");
    var imgData = './assets/images/products/utm-mesrs.jpg';
    doc.addImage(imgData, 'JPEG', 0, 0, 216, 96);
    doc.text(20, 90, 'Événement:');
    doc.text(event.title,20, 100,{maxWidth:180});
    const length = Math.ceil(event.title.length/69);
    doc.line(20, 93+(length*10), 150, 93+(length*10) ,'DF')
    doc.text(20, 100+(length*10), `* Nom : ${user.nom}`);
    doc.text(20, 110+(length*10), `* Prénom : ${user.prenom}`);
    doc.text(20, 120+(length*10), `* Email : ${user.email}`);
    
    let base64Image = document.getElementById('qrcode').toDataURL("image/png");
    doc.addImage(base64Image, 'png', 60, 130+(length*10), 90, 90)
    doc.setProperties({
      title: 'Title',
      subject: 'This is the subject',
      author: 'James Hall',
      keywords: 'generated, javascript, web 2.0, ajax',
      creator: 'MEEE'
    });
    doc.save('Test.pdf');
      }
  return (
    <div className="container p-4 mt-4">
<div className="alert alert-success" role="alert" style={{ display: show ? "block" : "none" }}>
    {message}
</div>
    <div >
       
       <div >
           <div className="d-flex">
            <div><h2>{t('Event')}: {event.title||Datacomment.title}</h2>
           <br/> <p>{event.date||""}</p></div>
           </div>
           {!isEmpty(result) ? (<> {!isEmpty(result[0].description) ? (<> 
            <div className="shadow-lg p-3 mb-5 bg-body rounded" style={{backgroundColor: "white"}}>
         <span  dangerouslySetInnerHTML={{ __html: result[0].description }} /> </div> </>): (<></>)} </>): (<></>)}
           
            </div>
            

            {Datacomment.user!==undefined ? (<>
            <QRCode id="qrcode" ref={certificateTemplateRef} size={250} value={JSON.stringify(Datacomment)} />
            <br/><Button variant="outlined" onClick={handleOpen1}>{t('télécharger invitation')}</Button></>
            ): (<>            <Button variant="outlined" onClick={handleOpen}>{t('interested')}</Button>
            </>)}

            </div>
            </div>
  );
}