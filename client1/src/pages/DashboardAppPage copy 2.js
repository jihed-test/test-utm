import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import scrapeHtmlWeb from "scrape-html-web";
import { FaFlask } from 'react-icons/fa';
import { FaGraduationCap } from 'react-icons/fa';
import { FaFlag } from 'react-icons/fa';
import { FaUniversity } from 'react-icons/fa';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Facebook, Twitter } from 'react-sharingbuttons'
import 'react-sharingbuttons/dist/main.css'
import { TablePagination } from '@mui/base/TablePagination';
import RowDetails7 from '../components/RowDetails7'
import { GetEventLists } from '../redux/actions/eventListActions'
import { useDispatch, useSelector } from 'react-redux'

const options = {
  url: "https://dev.to/collegewap/web-scraping-react-application-using-nodejs-bga",


};

export default function DashboardAppPage() {
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
    <div>
      <div>
      <Container  >
        <Row>
          <Col><div className="p-6 shadow-lg p-3 mb-5 bg-body rounded h-100" style={{ backgroundColor: "white" }} >
            <FaGraduationCap className="fa fa-graduation-cap"
            speechify-initial-font-family="FontAwesome"
            speechify-initial-font-size="50px"
            style={{ fontFamily: "FontAwesome", fontSize: 35 }} />
            <br/>
            <strong
              data-to={33000}
              data-append="+"
              speechify-initial-font-family='"Open Sans", Arial, sans-serif'
              speechify-initial-font-size="50px"
              style={{
                fontFamily: '"Open Sans", Arial, sans-serif',
                fontSize: 50
              }}
            >
              33000+
            </strong><br/>
            <label
              speechify-initial-font-family='"Open Sans", Arial, sans-serif'
              speechify-initial-font-size="20px"
              style={{
                fontFamily: '"Open Sans", Arial, sans-serif',
                fontSize: 20
              }}
            >
              Étudiants
            </label>             </div>
</Col>
          <Col ><div className="p-6 shadow-lg p-3 mb-5 bg-body rounded h-100" style={{ backgroundColor: "white" }} >
             <FaFlag className="fa fa-graduation-cap"
            speechify-initial-font-family="FontAwesome"
            speechify-initial-font-size="50px"
            style={{ fontFamily: "FontAwesome", fontSize: 35 }} /><br/>
            <strong
              data-to={37}
              speechify-initial-font-family='"Open Sans", Arial, sans-serif'
              speechify-initial-font-size="50px"
              style={{
                fontFamily: '"Open Sans", Arial, sans-serif',
                fontSize: 50
              }}
            >
              37
            </strong> <br/>
            <label
              speechify-initial-font-family='"Open Sans", Arial, sans-serif'
              speechify-initial-font-size="20px"
              style={{
                fontFamily: '"Open Sans", Arial, sans-serif',
                fontSize: 20
              }}
            >
              Nationalités
            </label>             </div>
</Col>
          <Col ><div className="p-6 shadow-lg p-3 mb-5 bg-body rounded h-100 h-100" style={{ backgroundColor: "white"}} >
            <FaUniversity className="fa fa-graduation-cap"
            speechify-initial-font-family="FontAwesome"
            speechify-initial-font-size="50px"
            style={{ fontFamily: "FontAwesome", fontSize: 35 }} /><br/>
            <strong
              data-to={15}
              speechify-initial-font-family='"Open Sans", Arial, sans-serif'
              speechify-initial-font-size="50px"
              style={{
                fontFamily: '"Open Sans", Arial, sans-serif',
                fontSize: 50
              }}
            >
              15
            </strong><br/>
            <label
              speechify-initial-font-family='"Open Sans", Arial, sans-serif'
              speechify-initial-font-size="20px"
              style={{
                fontFamily: '"Open Sans", Arial, sans-serif',
                fontSize: 20
              }}
            >
              Établissements
            </label>             </div>
</Col>
          <Col ><div className="p-6 shadow-lg p-3 mb-5 bg-body rounded h-100" style={{ backgroundColor: "white" }} >
            <FaFlask className="fa fa-graduation-cap"
            speechify-initial-font-family="FontAwesome"
            speechify-initial-font-size="50px"
            style={{ fontFamily: "FontAwesome", fontSize: 35 }} /><br/>
            <strong
              data-to={132}
              speechify-initial-font-family='"Open Sans", Arial, sans-serif'
              speechify-initial-font-size="50px"
              style={{
                fontFamily: '"Open Sans", Arial, sans-serif',
                fontSize: 50
              }}
            >
              132
            </strong><br/>
            <label
              speechify-initial-font-family='"Open Sans", Arial, sans-serif'
              speechify-initial-font-size="20px"
              style={{
                fontFamily: '"Open Sans", Arial, sans-serif',
                fontSize: 20
              }}
            >Structures de Recherche</label>
             </div>
          </Col>
        </Row>
      </Container></div>

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
                    events.events.map(({_id, title, date,description})=>(
                       <RowDetails7 key={_id} _id={_id} title={title} date={date} description={description} />
                    ))
                  }
                  
                </tbody>
              </table>
        </div>
       </div>







      <div>
      <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FUniversiteDeTunisElManar%2F&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" width={340} height={500} style={{border: 'none', overflow: 'hidden'}} scrolling="no" frameBorder={0} allowFullScreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" />
</div>
<div>
      <Facebook url={'https://www.facebook.com/UniversiteDeTunisElManar/'} />
    </div>
    </div>
  );
}


