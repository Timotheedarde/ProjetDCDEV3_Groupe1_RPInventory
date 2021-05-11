import React, { useState } from "react";
import './login-form.css';

export default function LoginForm() {

    const [inputValue, setInputValue] = useState("");



    return (
        <div className='LoginForm'>
            <h1>Inscription / Connexion</h1>
            <form action="">
                <div className='identifiant'>
                    <label htmlFor="">Identifiant</label>
                    <input type="text"
                           value={inputValue}
                           onChange={(e) => {
                               setInputValue(e.target.value);
                           }}
                    />
                </div>

                <div className='password'>
                    <label htmlFor="">Mot de passe</label>
                    <input type="password"/>
                </div>
            </form>
        </div>
    );
}
