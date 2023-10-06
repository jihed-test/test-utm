import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';


// ----------------------------------------------------------------------


// ----------------------------------------------------------------------

export default function BlogPage() {
  const { t, i18n } = useTranslation();
  return (
    <>
      <Helmet>
        <title> Dashboard: Blog  </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Blog
          </Typography>
          
        </Stack>




      </Container>
    </>
  );
}
