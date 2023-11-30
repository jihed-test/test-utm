import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoginAction } from "../redux/actions/authActions";
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
import Iconify from '../components/iconify';
// sections
import { LoginForm } from '../sections/auth/login';
import Modal from 'react-bootstrap/Modal';// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
  const navigate = useNavigate()

  const { t, i18n } = useTranslation();
  const mdUp = useResponsive('up', 'md');
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleClose1 = () => setShow(false);
  const handleShow = () => setShow(true);
  const handlePath = () => navigate('/updatepassword');

 
  return (
    <>
   
  
      <Helmet>
        <title> {t('Se connecter')}  </title>
      </Helmet>
      <StyledRoot>
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>{t('Salut, bon retour')}</Typography>
            <img src="/assets/illustrations/illustration_login.png" alt="login" />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>{t('Se connecter')}</Typography>          
            <Typography variant="body2" sx={{ mb: 5 }}>
            {t('')}Vous n'avez pas de compte ? {''}
              <Link href="/signup" variant="subtitle2">{t('Commencer')}</Link>
            </Typography>

           
            {/* <>
     

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Forgot password?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </> */}
            

            <LoginForm />
            <Button   sx={{ px: 5, mt: 3, mb: 5 }} onClick={handlePath}>
            Forgot password?
      </Button>
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
