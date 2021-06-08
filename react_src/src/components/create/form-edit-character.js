import React, {useState, useEffect} from 'react'
import './form-edit-character.css'
import {useHistory} from "react-router";
import axios from "axios";

export default function FormEditCharacter(props) {

    let id = props.personnage._id;
    let name = props.personnage.name;
    let carry_max = props.personnage.carry_max;
    let carry_actual = props.personnage.carry_actual;
    let inventory_list = props.personnage.inventory_list;


    return (

        <div className="content-edit-perso-form">

            <span>
                Nom : {name}
            </span>
            <span>
                Carry Max : {carry_max}
            </span>
            <span>
                Carry Actual : {carry_actual}
            </span>
            <span>
                Inventory list : {inventory_list}
            </span>

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
