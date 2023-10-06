import React, { useEffect, useState } from "react";
import Inputs from "../components/Inputs";
import Select from "../components/select";
import { useDispatch, useSelector } from 'react-redux'
import Classnames from 'classnames'
import { AddProfile, GetProfile } from "../redux/actions/profileActions";
import { Helmet } from 'react-helmet-async';
import Image from "../components/image"
import { useTranslation } from 'react-i18next';
// @mui
import { Container, Stack, Typography } from '@mui/material';
import isEmpty from "src/util/isEmpty";
// components
// ----------------------------------------------------------------------

export default function EspaceStructuresDeRecherches() {
    const { t, i18n } = useTranslation();
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
                <title>{t('Profile')}   </title>
            </Helmet>


            <div className="container-fluid ">


                <div className="alert alert-success" role="alert" style={{ display: show ? "block" : "none" }}>
                    {message}
                </div>

                <div className="row justify-content-evenly ">
                    <div className="col-lg-12 col-md-12">
                        <div >
                            <Typography variant="h4" sx={{ mb: 5 }}>
                            {t('Profile')}
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
                                        <Inputs name="tel" label={t('Telephone')} value={form && form.tel ? form.tel : ""} type="text" onChangeHandler={onChangeHandler} errors={errors.tel} />
                                    </div>
                                    <div className="col">
                                        <Inputs name="city" label={t("ville")} value={form && form.city ? form.city : ""} type="text" onChangeHandler={onChangeHandler} errors={errors.city} />
                                    </div>
                                </div>
                                <Inputs name="country" label={t('pays')} value={form && form.country ? form.country : ""} type="text" onChangeHandler={onChangeHandler} errors={errors.country} />
                                <div className=" mb-3">
                                    <label className="form-label">{t('Address')}</label>
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
                                <Inputs name="postalcode" label={t("Code Postal")} value={form && form.postalcode ? form.postalcode : ""} type="text" onChangeHandler={onChangeHandler} errors={errors.postalcode} />

                                <Select
                                    name="institution"
                                    myArray={[`${t("Ecole Nationale d'Ingénieurs de Tunis")}`,
                                    `${t("Ecole Supérieure des Sciences et Techniques de la Santé de Tunis")}`,
                                    `${t("Faculté de Droit et des Sciences Politiques de Tunis")}`,
                                    `${t("Faculté de Médecine de Tunis")}`,
                                    `${t("Faculté des Sciences Economiques et de Gestion de Tunis")}`,
                                    `${t("Faculté des Sciences Mathématiques Physiques et Naturelles de Tunis")}`,
                                    `${t("Institut Bourguiba des Langues Vivantes")}`,
                                    `${t("Institut de Recherche Vétérinaire de Tunis")}`,
                                    `${t("Institut pasteur de Tunis")}`,
                                    `${t("Institut Préparatoire aux Etudes d'Ingénieurs el Manar")}`,
                                    `${t("Institut Supérieur des Sciences Biologiques Appliquées de Tunis")}`,
                                    `${t("Institut Supérieur des Sciences Humaines de Tunis")}`,
                                    `${t("Institut Supérieur des Sciences Infirmières de Tunis")}`,
                                    `${t("Institut Supérieur des Technologies Médicales de Tunis")}`,
                                    `${t("Institut Supérieur d'Informatique")}`,
                                    `${t("Autre")}`
                                    ]}
                                    label={t("Institution")}
                                    value={form && form.institution ? form.institution : "1"}
                                    onChangeHandler={onChangeHandler}
                                    errors={errors.institution} />
                                {
                                    form.institution === "Autre" && (
                                        <Inputs name="autre1" label={t("Autre (Si autre, veuillez préciser votre établissement)")}
                                         type="text" value={form && form.autre1 ? form.autre1 : ""} onChangeHandler={onChangeHandler} errors={errors.autre1} />
                                    )
                                }
                                <Select
                                    name="grade"
                                    myArray={[
                                        `${t("Professeur")}`,
                                        `${t("Maître de conférences")}`,
                                        `${t("Maître assistant")}`,
                                        `${t("Postdoc")}`,
                                        `${t("Doctorant")}`,
                                        `${t("Master")}`,
                                        `${t("Autre")}`
                                    ]}
                                    label={t("Grade/Niveau d’étude")}
                                    value={form && form.grade ? form.grade : "1"}
                                    onChangeHandler={onChangeHandler}
                                    errors={errors.grade} />
                                    {
                                    form.grade === "Autre" && (
                                        <Inputs name="autre2" label={t("Autre (Si autre, veuillez préciser votre Grade ou niveau d’étude)")} 
                                        type="text" value={form && form.autre2 ? form.autre2 : ""} onChangeHandler={onChangeHandler} errors={errors.autre2} />
                                    )
                                }
                                <Inputs name="laboratoire" label={t("Laboratoire/Unité de recherche")} type="text" value={form && form.laboratoire ? form.laboratoire : "1"} onChangeHandler={onChangeHandler} errors={errors.laboratoire} />
                                <Select
                                    name="ecoleDoctorale"
                                    myArray={[
                                        `${t("Ecole doctorale de la Faculté de Droit et des Sciences Politiques de Tunis")}`,
                                        `${t("Ecole doctorale Mathématiques, Informatique, Sciences et Technologies de la Matière (MISTM)")}`,
                                        `${t("Ecole doctorale Sciences et Technologies du Vivant et des Sciences de la Terre (EDSTVST)")}`,
                                        `${t("Ecole doctorale Recherche Scientifique en Economie et Gestion (RESEG)")}`,
                                        `${t("Ecole doctorale Sciences et Techniques pour l'Ingénieur (STI)")}`,
                                        `${t("Autre")}`
                                    ]}
                                    label={t("Ecole doctorale")}
                                    value={form && form.ecoleDoctorale ? form.ecoleDoctorale : "1"}
                                    onChangeHandler={onChangeHandler}
                                    errors={errors.ecoleDoctorale} />
                                    {
                                    form.ecoleDoctorale === "Autre" && (
                                        <Inputs name="autre3" label={t("Autre (Si autre, veuillez préciser votre école doctorale)")} 
                                        type="text" value={form && form.autre3 ? form.autre3 : ""} onChangeHandler={onChangeHandler} errors={errors.autre3} />
                                    )
                                }
                                <div className="d-flex justify-content-between">
                                    <button type="submit" className="btn btn-outline-primary">
                                    {t('mise à jour')} <i className="fa-solid fa-floppy-disk"></i>
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

