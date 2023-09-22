import React, { useEffect, useState } from "react";
import Inputs from "../components/Inputs";
import Select from "../components/select";
import { useDispatch, useSelector } from 'react-redux'
import Classnames from 'classnames'
import { AddProfile, GetProfile } from "../redux/actions/profileActions";
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
        dispatch(AddProfile(form, setShow, setMessage))
    }

    useEffect(() => {
        dispatch(GetProfile())

    }, [])
    useEffect(() => {
        if (!isEmpty(profiles.profile))
            setForm(profiles.profile)
    }, [profiles])

    //    const Example = ({ data }) => <img src={`data:image/jpeg;base64,${data}`} />
    //    console.log("img")
    return (
        <>
            <Helmet>
                <title> Dashboard: Profile  </title>
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
                                <Image />
                                <div className="row">
                                    <div className="col">
                                        <Inputs name="tel" label="Telephone" value={form && form.tel ? form.tel : ""} type="text" onChangeHandler={onChangeHandler} errors={errors.tel} />
                                    </div>
                                    <div className="col">
                                        <Inputs name="city" label="ville" value={form && form.city ? form.city : ""} type="text" onChangeHandler={onChangeHandler} errors={errors.city} />
                                    </div>
                                </div>
                                <Inputs name="country" label="pays" value={form && form.country ? form.country : ""} type="text" onChangeHandler={onChangeHandler} errors={errors.country} />
                                <div className=" mb-3">
                                    <label className="form-label">Address</label>
                                    <div className="input-group">
                                        <textarea
                                            type="text"
                                            className={Classnames("form-control", { "is-invalid": errors.address })}
                                            name="address"
                                            onChange={onChangeHandler}
                                            value={form && form.address ? form.address : ""}
                                        ></textarea>
                                        {
                                            errors.address && (<div className="invalid-feedback">
                                                {errors.address}
                                            </div>)
                                        }
                                    </div>
                                </div>
                                <Inputs name="postalcode" label="Code Postal" value={form && form.postalcode ? form.postalcode : ""} type="text" onChangeHandler={onChangeHandler} errors={errors.postalcode} />

                                <Select
                                    name="institution"
                                    myArray={["Ecole Nationale d'Ingénieurs de Tunis",
                                        "Ecole Supérieure des Sciences et Techniques de la Santé de Tunis",
                                        "Faculté de Droit et des Sciences Politiques de Tunis",
                                        "Faculté de Médecine de Tunis",
                                        "Faculté des Sciences Economiques et de Gestion de Tunis",
                                        "Faculté des Sciences Mathématiques Physiques et Naturelles de Tunis",
                                        "Institut Bourguiba des Langues Vivantes",
                                        "Institut de Recherche Vétérinaire de Tunis",
                                        "Institut pasteur de Tunis",
                                        "Institut Préparatoire aux Etudes d'Ingénieurs el Manar",
                                        "Institut Supérieur des Sciences Biologiques Appliquées de Tunis",
                                        "Institut Supérieur des Sciences Humaines de Tunis",
                                        "Institut Supérieur des Sciences Infirmières de Tunis",
                                        "Institut Supérieur des Technologies Médicales de Tunis",
                                        "Institut Supérieur d'Informatique",
                                        "Autre"
                                    ]}
                                    label="Institution"
                                    value={form && form.institution ? form.institution : "1"}
                                    onChangeHandler={onChangeHandler}
                                    errors={errors.institution} />
                                {
                                    form.institution === "Autre" && (
                                        <Inputs name="autre1" label="Autre (Si autre, veuillez préciser votre établissement)
                                        " type="text" value={form && form.autre1 ? form.autre1 : ""} onChangeHandler={onChangeHandler} errors={errors.autre1} />
                                    )
                                }
                                <Select
                                    name="grade"
                                    myArray={[
                                        "Professeur",
                                        "Maître de conférences",
                                        "Maître assistant",
                                        "Postdoc",
                                        "Doctorant",
                                        "Master",
                                        "Autre"
                                    ]}
                                    label="Grade/Niveau d’étude"
                                    value={form && form.grade ? form.grade : "1"}
                                    onChangeHandler={onChangeHandler}
                                    errors={errors.grade} />
                                    {
                                    form.grade === "Autre" && (
                                        <Inputs name="autre2" label="Autre (Si autre, veuillez préciser votre Grade ou niveau d’étude)" 
                                        type="text" value={form && form.autre2 ? form.autre2 : ""} onChangeHandler={onChangeHandler} errors={errors.autre2} />
                                    )
                                }
                                <Inputs name="laboratoire" label="Laboratoire/Unité de recherche" type="text" value={form && form.laboratoire ? form.laboratoire : "1"} onChangeHandler={onChangeHandler} errors={errors.laboratoire} />
                                <Select
                                    name="ecoleDoctorale"
                                    myArray={[
                                        "Ecole doctorale de la Faculté de Droit et des Sciences Politiques de Tunis",
                                        "Ecole doctorale Mathématiques, Informatique, Sciences et Technologies de la Matière (MISTM)",
                                        "Ecole doctorale Sciences et Technologies du Vivant et des Sciences de la Terre (EDSTVST)",
                                        "Ecole doctorale Recherche Scientifique en Economie et Gestion (RESEG)",
                                        "Ecole doctorale Sciences et Techniques pour l'Ingénieur (STI)",
                                        "Autre"
                                    ]}
                                    label="Ecole doctorale"
                                    value={form && form.ecoleDoctorale ? form.ecoleDoctorale : "1"}
                                    onChangeHandler={onChangeHandler}
                                    errors={errors.ecoleDoctorale} />
                                    {
                                    form.ecoleDoctorale === "Autre" && (
                                        <Inputs name="autre3" label="Autre (Si autre, veuillez préciser votre école doctorale)" 
                                        type="text" value={form && form.autre3 ? form.autre3 : ""} onChangeHandler={onChangeHandler} errors={errors.autre3} />
                                    )
                                }
                                <div className="d-flex justify-content-between">
                                    <button type="submit" className="btn btn-outline-primary">
                                    mise à jour <i className="fa-solid fa-floppy-disk"></i>
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

