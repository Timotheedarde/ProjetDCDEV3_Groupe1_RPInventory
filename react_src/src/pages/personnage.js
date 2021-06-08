import React, {useState, useEffect} from 'react';
import './personnage.css';
import Header from "../components/Header";
import Button from '../components/button';
import useLogin from "../components/auth/hooks/useLogin";
import {useHistory} from "react-router";


import FormCharacter from "../components/create/form-character";
import PersonnageList from "../components/personnageListe/personnageListe";
import axios from "axios";

export default function Personnage(props) {

    const [personnages, setPersonnages] = useState([]);

    const [authenticated, setAuthenticated] = useLogin();
    const history = useHistory();

    if (authenticated) {
        history.push("/personnage");
    }

    const updatePersonnage = ()=>{
        axios
            .get("http://localhost:3001/personnages", { withCredentials: true })
            .then((response) => {
                setPersonnages(response.data);
            })
            .catch((err) => {
                if (err.response && err.response.status === 403) {
                } else {
                    alert(
                        "Une erreur est survenue lors du chargement de vos données, veuillez réessayer ultérieurement."
                    );
                }
            });
    }


    return (
        <div>
            <div>
                <Header appName="RP Inventory"/>
                <Button text="créer nouveau personnage"/>
                <FormCharacter state={personnages}
                               setState={setPersonnages}
                               onUpdatePersonnage={updatePersonnage}/>

                <PersonnageList state={personnages}
                                setState={setPersonnages}
                                onUpdatePersonnage={updatePersonnage}/>
            </div>
        </div>
    )


}
