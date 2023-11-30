import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LoginAction } from "../../../redux/actions/authActions";
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const [form, setForm] = useState({})
  const dispatch = useDispatch()
  const errors = useSelector(state=>state.errors)
  const navigate = useNavigate()
  const onChangeHandler = (e)=>{
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = (e)=>{
  e.preventDefault();
  dispatch(LoginAction(form, navigate))
  }
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Stack spacing={3}>
        <TextField 
        helperText={errors.email}
        error={errors.email?true:false}
        onChange={onChangeHandler}
        name="email" 
        label="Email address" />

        <TextField
        helperText={errors.password}
        error={errors.password?true:false}
        onChange={onChangeHandler}
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

     

      <LoadingButton sx={{ px: 5, mt: 5, mb: 5 }} fullWidth size="large" type="submit" variant="contained" onClick={onSubmit}>
        Login
      </LoadingButton>
    </>
  );
}
