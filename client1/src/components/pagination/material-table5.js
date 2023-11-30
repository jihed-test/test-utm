import React, { useEffect, useState } from 'react'
import MUIDataTable from "mui-datatables";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { DeleteEventUser } from "../../redux/actions/eventUserActions";
import { AddEventUser,GetAllEventByTitle } from "src/redux/actions/eventUserActions";


// const [data, setData] = useState({ _id,title,user,date,createdAt,"comment":""});


  function MaterialTable1({data}) {
    const [message, setMessage] = useState("")
    const [show, setShow] = useState(false)
    useEffect(()=>{
      data= data.sort(
   
        (objA, objB) => {    const objA1 = new Date(objA.date).getTime(); 
          const objB1 = new Date(objB.date).getTime();
    
          return objB1-objA1
        })
       data = data.map((x) => {
          x.date =x.date.split('T')[0]
          return x
        });
    },[data])
    const dispatch =  useDispatch()

    const navigate = useNavigate()

    const { t, i18n } = useTranslation();
    const columns = [
      {
       name: t('comment'),
       label: t('comment'),
       options: {
        filter: true,
        sort: true,
       }
      },
      {
       name: t('date'),
       label: t('date'),
       options: {
        filter: true,
        sort: true,
       }
      },
      {
       name: t('actions'),
       label: t('actions'),
       options: {
			  filter: true,
			  customBodyRender: (value, tableMeta, updateValue) => {
				return (
          <button className="btn btn-outline-danger" onClick={()=>DeleteHandler(tableMeta)}>Delete</button>

				 
				);
			  }
			}
      }
     ];
     const DeleteHandler = async(tableMeta)=>{
      const dataTable= tableMeta.rowData[0]
      var dataTable1=data.find(x => x.comment === dataTable );
      dataTable1={...dataTable1,"comment":""}
      console.log("dataTable1")
      console.log(dataTable1)
       await dispatch(AddEventUser(dataTable1, setShow, setMessage))
       dispatch(GetAllEventByTitle(dataTable1.title))
    }
   
     const options = {
      filter: true, 
    };
    return (
      <div >
    <MUIDataTable
  title={t('Liste des événements')}
  data={data}
  columns={columns}
  options={options}
/>
      </div>
    );
  }
  
  export default MaterialTable1;
  
