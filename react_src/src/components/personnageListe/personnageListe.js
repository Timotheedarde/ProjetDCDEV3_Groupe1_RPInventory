import React, { useEffect, useState } from "react";
import './personnageListe.css';
import PersonnageItem from "./personnageItem";

export default function PersonnageListe(props) {

    useEffect(() => {
        props.onUpdatePersonnage()
    }, []);



    console.log(props.state)

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
}
