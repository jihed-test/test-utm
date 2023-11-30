import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RowDetails from '../components/RowDetails'
import CustomPaginationActionsTable from '../components/pagination/demoPagination'
import { GetProfiles } from '../redux/actions/profileActions'
import { useTranslation } from 'react-i18next';
import isEmpty from "../util/isEmpty";
function Admin() {
  const { t, i18n } = useTranslation();
  const profiles = useSelector(state => state.profiles.profiles)
  const dispatch  = useDispatch()
  useEffect(()=>{async function fetchData(){
    await dispatch(GetProfiles(0,2))
  }; fetchData()},[])
  return (
 
      <div class="container p-4 mt-4">
        <div class="row justify-content-evenly mt-4">
           
           <div class="col-lg-12 col-md-12 mt-4">
               <div class="d-flex">
                <i class="fa-solid fa-user fs-1 mx-2"></i> <h2>{t('Liste des profils')}</h2>
               </div>
               
            <CustomPaginationActionsTable  />
           </div>
       </div>
   </div>
   
  )
}

export default Admin