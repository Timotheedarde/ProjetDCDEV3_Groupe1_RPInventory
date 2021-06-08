import React, { useEffect, useState } from "react";
import './edit-personnage.css';
import Header from "../components/Header";
import illustrationPerso from '../assets/img/illustrations/illu-perso.png'
import {useParams} from "react-router";
import axios from "axios";

import FormEditCharacter from "../components/create/form-edit-character";
import ListObjects from "../components/create/list-objects";


export default function Personnage(props) {

    let {id} = useParams();

    const [personnage, setPersonnage] = useState([]);
    const [itemsList, setItemsList] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:3001/personnage/" + id, { withCredentials: true })
            .then((response) => {
                setPersonnage(response.data);
            })
            .catch((err) => {
                alert(
                    "Une erreur est survenue lors du chargement de vos données, veuillez réessayer ultérieurement."
                );
            })
    }, []);

    useEffect(() => {
        axios
            .get("http://localhost:3001/items/" + id, { withCredentials: true })
            .then((response) => {
                setItemsList(response.data)
            })
            .catch((err) => {
                alert(
                    "Une erreur est survenue lors du chargement de vos données, veuillez réessayer ultérieurement."
                );
            })
    }, []);

    console.log("TEST : ", itemsList)

    return (
        <div className="main-edit-personnage">
            <Header appName="RP Inventory"/>
            <div className="prez-perso">
                <div className="prez-perso-txt">
                    Inventaire de <span>NAMEPERSO</span>
                </div>
                <img src={ illustrationPerso } class="prez-perso-img" />
            </div>
            <FormEditCharacter
                personnage = {personnage}/>
            <ListObjects
                personnage = {personnage}
                itemsList = {itemsList}/>

        </div>
    )


};
