import React, { useState ,useEffect} from "react";
import Button from 'react-bootstrap/Button';
import scrapeHtmlWeb from "scrape-html-web";

const options = {
  url: "https://dev.to/collegewap/web-scraping-react-application-using-nodejs-bga",
  
  
};

export default function DashboardAppPage() {
  useEffect(()=>{async function fetchData(){
    const data = await scrapeHtmlWeb(options);
    console.log(data);
  }; fetchData()},[])
  
  return (
    <div>


    
<iframe
        width="100%" height="371"
        src="https://docs.google.com/spreadsheets/d/1xcA5fRBvnY65lXjL--YU2nE8VRxKNTLFuYRTqYUmuZc/pubchart?oid=1846721813&format=interactive"
      ></iframe>
      <iframe
        width="100%" height="371"
        src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSp6FJyRchxwPdbDVx5vCHeGNdQHnWBXkMezz4pLYK5tfvHfoA41rxzAdJSta3MbLhWjTk5AIcTu5NS/pubchart?oid=1067771595&format=interactive"
      ></iframe>
      <iframe
        width="100%" height="371"
        src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSp6FJyRchxwPdbDVx5vCHeGNdQHnWBXkMezz4pLYK5tfvHfoA41rxzAdJSta3MbLhWjTk5AIcTu5NS/pubchart?oid=1053358849&format=interactive"
      ></iframe>
       <iframe
        width="100%" height="371"
        src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSp6FJyRchxwPdbDVx5vCHeGNdQHnWBXkMezz4pLYK5tfvHfoA41rxzAdJSta3MbLhWjTk5AIcTu5NS/pubchart?oid=1583845332&amp;format=interactive"
      ></iframe>
      <iframe
        width="100%" height="371"
        src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSp6FJyRchxwPdbDVx5vCHeGNdQHnWBXkMezz4pLYK5tfvHfoA41rxzAdJSta3MbLhWjTk5AIcTu5NS/pubchart?oid=1762543863&format=interactive"
      ></iframe>
      <iframe
        width="100%" height="371"
        src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSp6FJyRchxwPdbDVx5vCHeGNdQHnWBXkMezz4pLYK5tfvHfoA41rxzAdJSta3MbLhWjTk5AIcTu5NS/pubchart?oid=556416673&format=interactive"
      ></iframe>
      <iframe
        width="100%" height="571"
        src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSp6FJyRchxwPdbDVx5vCHeGNdQHnWBXkMezz4pLYK5tfvHfoA41rxzAdJSta3MbLhWjTk5AIcTu5NS/pubchart?oid=1851275551&format=interactive"
      ></iframe>
      
    
    </div>
  );
}


