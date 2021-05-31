import React from 'react';
import './edit-personnage.css';
import Header from "../components/Header";
import Button from '../components/button'
import {Link} from "react-router-dom";
import useLogin from "../components/auth/hooks/useLogin"
import {useHistory} from "react-router";
import illustrationPerso from '../assets/img/illustrations/illu-perso.png'


import FormEditCharacter from "../components/create/form-edit-character";
import ListObjects from "../components/create/list-objects";


export default function Personnage(props) {

    const [authenticated, setAnthenticated] = useLogin();
    const history = useHistory();

    if (authenticated) {
        history.push("/personnage");
    }



    return (
        <div>
            <Header appName="RP Inventory"/>
            <div className="prez-perso">
                <div className="prez-perso-txt">
                    Inventaire de <span>Xode</span>
                </div>
                <img src={ illustrationPerso } class="prez-perso-img" />
            </div>
            <FormEditCharacter />
            <ListObjects />
        </div>
    )


}
