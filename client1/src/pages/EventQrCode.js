import React, { useEffect,useLayoutEffect, useState,useRef } from "react";
import Inputs from "../components/Inputs";
import Date from "../components/date"
import Button from '@mui/material/Button';
import QRCode from 'qrcode.react';
import { AddEventUser,GetEventUser } from "src/redux/actions/eventUserActions";
import { useTranslation } from 'react-i18next';
import { jsPDF } from "jspdf";
import { useDispatch, useSelector } from 'react-redux';
import isEmpty from "../util/isEmpty";
import { GetEventLists } from '../redux/actions/eventListActions'
export default function EventListPage() {
  useLayoutEffect(()=>{async function fetchData(){
    await dispatch(GetEventLists())
  }; fetchData()},[])
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const certificateTemplateRef = useRef(null);
  const events = useSelector(state =>{return state.events.events } )
  const Datacomment = useSelector(state => {return state.eventUser.eventUser||{}})
  const user = useSelector(state => {return state.auth.user||{}})
  const [message, setMessage] = useState("")
  const [show, setShow] = useState(false) 
  const [result, setReselt] = useState()

  const [event, setEvent] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem("event");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });
  
  useEffect(() => { 
    dispatch(GetEventUser(event.title))
}, [])

  const result1 =events.filter((test) => test.title == event.title);
  console.log("events")
console.log(events)
console.log("result")
console.log(result1)





const data={
    heading: "Sample PDF Generator",
    moreText: [
      "This is another few sentences of text to look at it.",
      "Just testing the paragraphs to see how they format.",
      "jsPDF likes arrays for sentences.",
      "Do paragraphs wrap properly?",
      "Yes, they do!",
      "What does it look like?",
      "Not bad at all."
    ],
    items: [
      { title: "Item 1", body: "I am item 1 body text" },
      { title: "Item 2", body: "I am item 2 body text" },
      { title: "Item 3", body: "I am item 3 body text" },
      { title: "Item 4", body: "I am item 4 body text" }
    ],
  
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
doc.addImage(base64Image, 'png', 60, 150, 90, 90)
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
    <div ref={certificateTemplateRef} className="container p-4 mt-4">
<div className="alert alert-success" role="alert" style={{ display: show ? "block" : "none" }}>
    {message}
</div>
    <div >
       
       <div >
           <div className="d-flex">
            <div><h2>{t('Événement')}: {event.title||""}</h2>
           <br/> <p>{event.date||""}</p></div>
           </div>
           <div className="shadow-lg p-3 mb-5 bg-body rounded" style={{backgroundColor: "white"}}>
           {!isEmpty(result1) ? (<>
           <span  dangerouslySetInnerHTML={{ __html: result1[0].description }} /> 
           </>): (<></>)}
           </div>
            </div>
            
            <QRCode id="qrcode" ref={certificateTemplateRef} size={250} value={JSON.stringify(Datacomment)} />
            
            </div>
            <Button variant="outlined" onClick={handleOpen1}>pdf</Button>

            </div>
  );
}