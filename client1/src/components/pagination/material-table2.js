import React, { useEffect } from 'react'
import MUIDataTable from "mui-datatables";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";




  function MaterialTable1({data}) {
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
    
    const navigate = useNavigate()

    const { t, i18n } = useTranslation();
    const columns = [
      {
       name: t('title'),
       label: t('title'),
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
				  <button onClick={() => {

					const dataTable= tableMeta.rowData[0]
          const dataTable1=data.find(x => x.title === dataTable );
          
          localStorage.setItem("event", JSON.stringify( dataTable1));
     navigate("/dashboard/EventComment")
				  }}
                  className="btn btn-outline-danger"
				  >afficher les détails</button>
				);
			  }
			}
      }
     ];
     
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
  
