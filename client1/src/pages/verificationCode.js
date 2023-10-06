import React, { useEffect, useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ReactInputVerificationCode from 'react-input-verification-code';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ValidateCode } from "../redux/actions/authActions";
import Classnames from 'classnames'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function VerificationCode() {
  const [form, setForm] = useState({ "code":"" })
  const dispatch = useDispatch()
  const errors = useSelector(state => state.errors)
  const navigate = useNavigate()
  const onChangeHandler = (e) => {
    setForm({
      ...form,
    "code": e
    })
  }
  const handleSubmit =  (e) => {
    e.preventDefault();
   
     dispatch(ValidateCode(form, navigate))
  }
  const onChangeHandler1 = (e)=>{
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
  return (
    <div>
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h4">
            Verify Login Code
          </Typography>
          <h5>Welcome Back!</h5>

          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>

            <p>
              It looks like you're trying to login from a new device.
              As an added security mesure, please enter the 6-character code sent to your email.
            </p>
            <p><a href='#'>Need help?</a></p>
            <fieldset class='number-code'>
            <Grid item xs={12}>
                <TextField
                  helperText={errors.email}
                  error={errors.email?true:false}
                  required
                  fullWidth
                  id="email"
                  label="Adresse e-mail"
                  name="email"
                  autoComplete="email"
                  onChange={onChangeHandler1}
                />
              </Grid>
              <legend>Security Code</legend>
              <div>
                <ReactInputVerificationCode
                  className={Classnames("form-control", { "is-invalid": errors })}
                  onCompleted={onChangeHandler}
                  value={form && form.code ? form.code : ""}
                  label="Security Code"
                  length={6} />
                
              </div>
            </fieldset>
            <p><a href='#'>Resend Code</a></p>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}

            >
              Submit
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider></div>
  );
}