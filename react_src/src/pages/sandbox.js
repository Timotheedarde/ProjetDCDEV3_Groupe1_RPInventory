import React from 'react';
import './personnage.css';
import Header from "../components/Header";
import PersonnageListe from "../components/personnageListe/personnageListe";

export default function Sandbox() {
    return (
        <div>
            <Header appName="RP Inventory"/>
            <PersonnageListe />
        </div>
    );
}

