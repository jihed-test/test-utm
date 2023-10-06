import React from 'react';
import { CDBBox, CDBBtn, CDBIcon, CDBNavLink } from 'cdbreact';
import { useTranslation } from 'react-i18next';
import "../../i18n";
export default  function Footer1 () {
  const { t, i18n } = useTranslation();
  return (
    <div className="container ">

      <div
        className="shadow   bg-body rounded"
        style={{ backgroundColor: "white" }} >
        <CDBBox display="flex" flex="column" className="mx-auto py-5" style={{ width: '90%' }}>

          <CDBBox display="flex" justifyContent="between" className="flex-wrap">
          <CDBBox style={{ width: '20%' }} >
              <img alt="logo" src="http://www.utm.rnu.tn/utm/images/utm-header.png"  />
            
            </CDBBox>
            <CDBBox>

            <p className="my-3" style={{ width: '250px' }}>
            {t('Université de Tunis El Manar : Campus Universitaire Farhat Hached B.P. n° 94 - ROMMANA 1068 Tunis, Tunisie.')}
            </p>
            
            <p className="my-3" style={{ width: '250px' }}>
              CCP : 17001000000321990621
            </p>
            <CDBBox display="flex" className="mt-4">
              <CDBBtn flat color="dark">
                <CDBIcon fab icon="facebook-f" style={{ color: '#427ce0' }} />
              </CDBBtn>
              <CDBBtn flat color="dark" className="mx-3" style={{ color: '#427ce0' }}>
                <CDBIcon fab icon="twitter" />
              </CDBBtn>
              <CDBBtn flat color="dark" className="p-2" style={{ color: '#427ce0' }}>
                <CDBIcon fab icon="instagram" />
              </CDBBtn>
            </CDBBox>
            </CDBBox>

            <CDBBox>
              <p className="h5 mb-4" style={{ fontWeight: '600' }}>
              {t("Help")}</p>
              <CDBBox flex="column" style={{ cursor: 'pointer', padding: '0' }}>
                <CDBNavLink href="/">{t("Resources")}</CDBNavLink>
                <CDBNavLink href="/">{t("About Us")}</CDBNavLink>
                <CDBNavLink href="/">{t("Contact")}</CDBNavLink>
                <CDBNavLink href="/">{t("Blog")}</CDBNavLink>
              </CDBBox>
            </CDBBox>
            <CDBBox>
              <p className="h5 mb-4" style={{ fontWeight: '600' }}>
              {t('Contacts')}
              </p>
              <CDBBox flex="column" style={{ cursor: 'pointer', padding: '0' }}>
                <p className="my-3" style={{ width: '250px' }}>
                  <i className="fa-thin fa-tty" style={{ color: '#e12323' }}></i>
                  Tel : (216) 71 873 366
                </p>
                <p className="my-3" style={{ width: '250px' }}>
                  <i className="fa-solid fa-fax" style={{ color: '#e12323' }}></i>
                  Fax : (216) 71 872 055
                </p>
                <p className="my-3" style={{ width: '250px' }}>
                  <i className="fa-solid fa-envelope" style={{ color: '#e12323' }}></i> Email : utm@utm.tn
                </p>

              </CDBBox>
            </CDBBox>

          </CDBBox>
          <small className="text-center mt-5">&copy; Devwares, 2023. All rights reserved.</small>
        </CDBBox>
      </div>
    </div>
  );
};