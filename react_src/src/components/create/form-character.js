import React, {useState} from 'react';
import './form-character.css';
import {useHistory} from "react-router";
import axios from "axios";

export default function FormCharacter(props) {

    const history = useHistory();
    const [loginData, setLoginData] = useState({});


    const handleChange = (attr) => (e) => {
        const value = e.target.value;

        const newLoginData = { ...loginData, [attr]: value };
        setLoginData(newLoginData);
        //console.log(newLoginData)
    };

    const handleAddCarac = async (e) => {
        e.preventDefault(); //annule comportement par défaut du submit
        axios
            .post("http://localhost:3001/personnage", loginData, {
                withCredentials: true,
            })
            .then(() => {
                history.push("/personnage");
                props.onUpdatePersonnage();
            })
            .catch((err) => {
                if (err.response && err.response.status === 403) {
                    alert("Invalid credentials");
                } else {
                    alert(
                        "An unexpected error happened, we are sorry for the inconvenience"
                    );
                }
            });
    };

    return (
        <div>
            <span className="section">Création d'un personnage</span>
            <div className="global-create">

                <div className="">
                    <form className="formulaire" onSubmit={handleAddCarac}>
                        <label className="labels" htmlFor="">Nom du personnage</label>
                        <input className="inputs" type="text" value={loginData.name} onChange={handleChange("name")}/>
                        <label className="labels" htmlFor="">Encombrement maximum</label>
                        <input className="inputs" type="text" value={loginData.carry_max} onChange={handleChange("carry_max")}/>
                        <label className="labels" htmlFor="">Image du personnage</label>
                        <input className="file" type="file" accept=".jpg, .png"/>
                        <button className="next">Ajouter</button>
                    </form>

                    <div className="buttons-container">
                        <button className="delete">Annuler</button>
                        <button className="next">Suivant</button>
                    </div>

                </div>
            </div>
        </div>
    );
}
