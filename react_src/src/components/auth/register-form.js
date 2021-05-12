import React, { useState } from "react";
import ButtonPrimary from '../button'
import './auth-form.css'

export default function RegisterForm() {

    const [users, setUsers] = useState([]);

    const [inputValueUN, setInputValueUN] = useState("");
    const [inputValuePW, setInputValuePW] = useState("");

    const handleRegister = () => {
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
                <a href="/" className="register-title">Connexion</a>
                <span>/</span>
                <span className="login-title">Inscription</span>
            </div>

            <form action="">
                <div className='identifiant'>
                    <label className="inputs-label" htmlFor="">Identifiant</label>
                    <input className="input-form" type="text" value={inputValueUN} onChange={(e) => setInputValueUN(e.target.value)} />
                </div>

                <div className='password'>
                    <label className="inputs-label" htmlFor="">Mot de passe</label>
                    <input className="input-form" type="password"/>
                </div>

                <div className='content-btn-submit'>
                    <ButtonPrimary onClick={handleRegister} text='Inscription' />
                </div>

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