import React, { useState } from "react";
import ButtonPrimary from '../button'
import './auth-form.css'
import axios from "axios"

export default function LoginForm() {

    const [users, setUsers] = useState([]);

    const [inputValueUN, setInputValueUN] = useState("");
    const [inputValuePW, setInputValuePW] = useState("");

    const handleLogin = () => {
        let newUser = { username: inputValueUN, password: inputValuePW };

        axios
            .post("http://localhost:3001/auth/signup", newUser)
            .then((response) => {
                newUser._id = response.data;
                let newUsers = [...users, newUser];
                setUsers(newUsers);
            })
            .catch((err) => {
                if(err.response.status === 400 ){
                    alert(
                        err.response.data
                    );
                } else{
                    console.log(err)
                    alert(
                        "Une erreur est survenue, veuillez réessayer ultérieurement."
                    );
                }
            });

        setInputValueUN("");
        setInputValuePW("");
    };

    return (
        <div className='LoginForm'>
            <div className="titles-form">
                <span className="login-title">Connexion</span>
                <span>/</span>
                <a href="/register" className="register-title">Inscription</a>
            </div>

            <form action="">
                <fieldset className='identifiant'>
                    <label className="inputs-label" htmlFor="">Identifiant</label>
                    <input className="input-form" value={inputValueUN} onChange={(e) => setInputValueUN(e.target.value)} type="text"/>
                    <label className="inputs-label" htmlFor="">Mot de passe</label>
                    <input className="input-form" type="password" value={inputValuePW} onChange={(e) => setInputValueUN(e.target.value)} />
                </fieldset>

                <div className='content-btn-submit'>
                    <ButtonPrimary text='connexion' />
                </div>

                <div className="footer-form">
                    <div className="account">
                        <span className="allready-account">Vous n'avez pas de compte ?</span>
                        <a className="connexion" href="/register">Inscrivez-vous</a>
                    </div>
                </div>
            </form>

            <button onClick={handleLogin}>Login</button>
        </div>
    );
}
