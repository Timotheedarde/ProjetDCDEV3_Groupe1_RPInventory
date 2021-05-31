import axios from "axios";
import React, { useContext, useState } from "react";
import ButtonPrimary from '../button'
import './auth-form.css'
import {useHistory} from "react-router";

export const LoginContext = React.createContext();

export default function LoginForm() {

    const history = useHistory();
    const [loginData, setLoginData] = useState({});


    const handleChange = (attr) => (e) => {
        const value = e.target.value;

        const newLoginData = { ...loginData, [attr]: value };
        setLoginData(newLoginData);
    };

    const handleLogin = async (e) => {
        e.preventDefault(); //annule comportement par défaut du submit
        axios
            .post("http://localhost:3001/auth/login", loginData, {
                withCredentials: true,
            })
            .then(() => {
                history.push("/personnage");
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
        <div className='LoginForm'>
            <div className="titles-form">
                <span className="login-title">Connexion</span>
                <span>/</span>
                <a href="/register" className="register-title">Inscription</a>
            </div>

            <form onSubmit={handleLogin} >
                <fieldset className='identifiant'>
                    <label className="inputs-label" htmlFor="">Identifiant</label>
                    <input className="input-form" type="text" value={loginData.username} onChange={handleChange("username")}  />
                    <label className="inputs-label" htmlFor="">Mot de passe</label>
                    <input className="input-form" type="password" value={loginData.password} onChange={handleChange("password")} />
                </fieldset>

                <div className='content-btn-submit'>
                    <ButtonPrimary  text='connexion' />
                </div>

                <div className="footer-form">
                    <div className="account">
                        <span className="allready-account">Vous n'avez pas de compte ?</span>
                        <a className="connexion" href="/register">Inscrivez-vous</a>
                    </div>
                </div>
            </form>
        </div>
    );
}
