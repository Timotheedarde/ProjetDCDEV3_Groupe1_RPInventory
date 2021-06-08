import React, {useState, useEffect} from 'react'
import './form-edit-character.css'
import {useHistory} from "react-router";
import axios from "axios";

export default function FormCharacter(props) {

    return (
        <div className="content-edit-perso-form">
            <span className="title-edit-perso">
                Nouvel objets
            </span>
            <form className="edit-perso-form">
                <span>Objet</span>
                <input type="text" />
                <span>Description</span>
                <input type="text" />
                <span>Encombrement</span>
                <input type="number" />
                <span>Actions</span>
                <button>+</button>
            </form>
        </div>
    );

}
