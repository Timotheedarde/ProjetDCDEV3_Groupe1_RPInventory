import React from 'react';
import './personnage.css';
import Header from "../components/Header";
import Button from '../components/button'
import {Link} from "react-router-dom";
import useLogin from "../components/auth/hooks/useLogin"
import {useHistory} from "react-router";


import FormCharacter from "../components/create/form-character";


export default function Personnage(props) {

    const [authenticated, setAnthenticated] = useLogin();
    const history = useHistory();

    if (authenticated) {
        history.push("/personnage");
    }



    return (
        <div>
            <div>
                <Header appName="RP Inventory"/>
                <Button text="créer nouveau personnage"/>
                <FormCharacter/>
            </div>
        </div>
    )


}
