import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
// @mui
import { Container, Stack, Typography } from '@mui/material';
// components


// ----------------------------------------------------------------------

export default function ProductsPage() {
  const { t, i18n } = useTranslation();
  const [openFilter, setOpenFilter] = useState(false);

  function test () {
    $('#datetimepicker3').datetimepicker({
      pickDate: false
    });
  }
  test()

  return (
    <>
      <Helmet>
        <title> Dashboard: Products </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Products
        </Typography>

      </Container>
    </>
  );
}
