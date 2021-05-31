import React from 'react';
import './personnageListe.css';
import PetitBonhomme from '../../assets/img/illustrations/petit-bonhomme.png'
import Modifier from '../../assets/img/buttons/modifier.png'
import Inventaire from '../../assets/img/buttons/inventaire.png'
import Supprimer from '../../assets/img/buttons/supprimer.png'

export default function Sandbox() {
    return (
        <div className="container">
            <div className="perso-container">
                <div className="illu-stats-container">
                    <div className="name-illu-container">
                        <span className="name">Xode</span>
                        <img src={ PetitBonhomme } alt="Illustration"/>
                    </div>
                    <div className="stats-container">
                        <div>
                            <progress className="progress" id="file" max="100" value="80"/>
                        </div>
                        <div className="btns-container">
                            <button className="btn-modifier btns">
                                <img className="btn-images" src={Modifier} alt="Modifier"/>
                            </button>
                            <button className="btn-inventaire btns">
                                <img className="btn-images" src={Inventaire} alt="Inventaire"/>
                            </button>
                            <button className="btn-supprimer btns">
                                <img className="btn-images" src={Supprimer} alt="Supprimer"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}