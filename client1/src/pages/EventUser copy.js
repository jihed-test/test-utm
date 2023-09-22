import React, { useEffect, useState } from "react";
import Inputs from "../components/Inputs";
import Select from "../components/select";
import { useDispatch, useSelector } from 'react-redux'
import Classnames from 'classnames'
import { AddEventUser } from "../redux/actions/eventUserActions";
import { Helmet } from 'react-helmet-async';
import Image from "../components/image"

// @mui
import { Container, Stack, Typography } from '@mui/material';
import isEmpty from "src/util/isEmpty";
// components
// ----------------------------------------------------------------------

export default function EspaceStructuresDeRecherches() {
    const [form, setForm] = useState({})
    const dispatch = useDispatch()
    const errors = useSelector(state => state.errors)
    const profiles = useSelector(state => state.profiles)
    const [message, setMessage] = useState("")
    const [show, setShow] = useState(false)
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
        
    }
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(AddEventUser(form, setShow, setMessage))
    }

   
    return (
        <>
            <Helmet>
                <title> Dashboard: Event User  </title>
            </Helmet>


            <div className="container-fluid ">


                <div className="alert alert-success" role="alert" style={{ display: show ? "block" : "none" }}>
                    {message}
                </div>

                <div className="row justify-content-evenly ">
                    <div className="col-lg-12 col-md-12">
                        <div >
                            <Typography variant="h4" sx={{ mb: 5 }}>
                                Profile
                            </Typography>
                        </div>
                        {/* <Example data={form.tel} /> */}
                        <div
                            className="p-6 shadow-lg p-3 mb-5 bg-body rounded"
                            style={{ backgroundColor: "white" }}
                        >
                            <form onSubmit={onSubmit}>
                                <div className="row">
                                    <div className="col">
                                        <Inputs name="title" label="title"  type="text" onChangeHandler={onChangeHandler} errors={errors.title} />
                                    </div>
                                    
                                </div>
                                
                                <div className="d-flex justify-content-between">
                                    <button type="submit" className="btn btn-outline-primary">
                                        Update <i className="fa-solid fa-floppy-disk"></i>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

