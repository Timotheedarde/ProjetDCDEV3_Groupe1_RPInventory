import React, { useEffect, useState, useContext } from "react";
import './personnageListe.css';
import PersonnageItem from "./personnageItem";
import axios from "axios";

export default function PersonnageListe(props) {

    useEffect(() => {
        props.onUpdatePersonnage()
    }, []);


    return (
        <div className="container">
            <ul className="perso-container">
                {props.state.map((personnage) => {
                    return (
                        <PersonnageItem
                            item={personnage}
                        />
                    );
                })}
            </ul>
        </div>
    );
};
