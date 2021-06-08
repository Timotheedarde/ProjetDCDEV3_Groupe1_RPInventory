import React, { useContext, useEffect, useState } from "react";
import {Link} from "react-router-dom";
import PetitBonhomme from "../../assets/img/illustrations/petit-bonhomme.png";
import Modifier from "../../assets/img/buttons/modifier.png";
import Inventaire from "../../assets/img/buttons/inventaire.png";
import Supprimer from "../../assets/img/buttons/supprimer.png";


export default function PersonnageItem(props) {

    let id = props.item._id;
    let name = props.item.name;
    let carry_max = props.item.carry_max;
    let carry_actual = props.item.carry_actual;

    return (
        <div className="illu-stats-container" key={id}>
            <div className="name-illu-container">
                <span className="name">{name}</span>
                <img src={ PetitBonhomme } alt="Illustration"/>
            </div>
            <div className="stats-container">
                <div>
                    <p className='EcombrementLine'>
                       Encombrement: <span>{carry_actual} / {carry_max}</span>
                    </p>
                    <progress className="progress" id="file" max={carry_max} value={carry_actual}/>
                </div>
                <div className="btns-container">
                    <Link to={"/personnage/" + id}>
                        <button className="btn-modifier btns" >
                            <img className="btn-images" src={Modifier} alt="Modifier"/>
                        </button>
                    </Link>

                    <Link to={"/personnage/" + id}>
                        <button className="btn-inventaire btns" >
                            <img className="btn-images" src={Inventaire} alt="Inventaire"/>
                        </button>
                    </Link>

                    <button className="btn-supprimer btns">
                        <img className="btn-images" src={Supprimer} alt="Supprimer"/>
                    </button>
                </div>
            </div>
        </div>
    );
};

