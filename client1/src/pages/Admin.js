import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RowDetails from '../components/RowDetails'
import { GetProfiles } from '../redux/actions/profileActions'
import { useTranslation } from 'react-i18next';
function Admin() {
  const { t, i18n } = useTranslation();
  const profiles = useSelector(state => state.profiles)
  const dispatch  = useDispatch()


  useEffect(()=>{async function fetchData(){
    await dispatch(GetProfiles())
  }; fetchData()},[])
  return (
    
     
      <div class="container p-4 mt-4">
        <div class="row justify-content-evenly mt-4">
           
           <div class="col-lg-12 col-md-12 mt-4">
               <div class="d-flex">
                <i class="fa-solid fa-user fs-1 mx-2"></i> <h2>{t('Liste des profils')}</h2>
               </div>
               <div class="shadow-lg p-3 mb-5 bg-body rounded" style={{backgroundColor: "white"}}>
                <table class="table table-hover">
                    <thead>
                      <tr>
                      <th scope="col">{t('name')}</th>
                      <th scope="col">{t('prenom')}</th>
                        <th scope="col">{t('email')}</th>
                        <th scope="col">{t('role')}</th>
                        <th scope="col">{t('telephone')}</th>
                        <th scope="col">{t('city')}</th>
                        <th scope="col">{t('country')}</th>
                        <th scope="col">{t('')}bio</th>
                        <th scope="col">{t('actions')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        profiles.profiles.map(({_id, user, tel, city, country, bio})=>(
                           <RowDetails key={_id} _id={_id} user={user} tel={tel} city={city} country={country} bio={bio} />
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