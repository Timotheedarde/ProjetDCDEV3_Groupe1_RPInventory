import React, { useEffect, useState } from "react";
import './edit-personnage.css';
import Header from "../components/Header";
import Button from '../components/button'
import {Link} from "react-router-dom";
import useLogin from "../components/auth/hooks/useLogin"
import illustrationPerso from '../assets/img/illustrations/illu-perso.png'
import axios from "axios";

import{useParams, useHistory} from "react-router";

import FormEditCharacter from "../components/create/form-edit-character";
import ListObjects from "../components/create/list-objects";


export default function Personnage(props) {


    return (
        <div className="main-edit-personnage">
            <Header appName="RP Inventory"/>
            <div className="prez-perso">
                <div className="prez-perso-txt">
                    Inventaire de <span>NAMEPERSO</span>
                </div>
                <img src={ illustrationPerso } class="prez-perso-img" />
            </div>
            <FormEditCharacter />
            <ListObjects />
        </div>
    )


}
