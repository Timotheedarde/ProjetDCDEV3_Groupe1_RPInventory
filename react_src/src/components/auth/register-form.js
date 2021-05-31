import React, { useState } from "react";
import { useHistory } from "react-router";
import ButtonPrimary from '../button'
import './auth-form.css'
import axios from "axios"
import illustrationPerso from '../../assets/img/illustrations/illu-perso.png'


export default function RegisterForm() {

    const history = useHistory();
    const [loginData, setLoginData] = useState({});


    const handleChange = (attr) => (e) => {
        const value = e.target.value;

        const newLoginData = { ...loginData, [attr]: value };
        setLoginData(newLoginData);
        //console.log(newLoginData)
    };

    const handleSignup = async (e) => {
        e.preventDefault(); //annule comportement par défaut du submit
        axios
            .post("http://localhost:3001/auth/signup", loginData, {
                withCredentials: true,
            })
            .then(() => {
                history.push("/");
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
                <a href="/" className="register-title">Connexion</a>
                <span>/</span>
                <span className="login-title">Inscription</span>
            </div>

            <form onSubmit={handleSignup}>
                <div className='identifiant'>
                    <label className="inputs-label" htmlFor="">Identifiant</label>
                    <input className="input-form" type="text"  value={loginData.username} onChange={handleChange("username")} />
                </div>

                <div className='password'>
                    <label className="inputs-label" htmlFor="">Mot de passe</label>
                    <input className="input-form" type="password" value={loginData.password} onChange={handleChange("password")} />
                </div>

                <div className='content-btn-submit'>
                    <ButtonPrimary text='Inscription' />
                </div>

                <img src={illustrationPerso} alt='illustration personnage' className='illustration-perso-mobile' />

                <div className="footer-form">
                    <div className="account">
                        <span className="allready-account">Vous avez déjà un compte ?</span>
                        <a className="connexion" href="/">Connectez-vous</a>
                    </div>
                </div>
            </form>
        </div>
    );
}
