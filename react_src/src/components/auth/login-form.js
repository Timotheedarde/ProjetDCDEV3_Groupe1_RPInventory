import React from 'react';
import ButtonPrimary from '../button'
import './auth-form.css';

export default function LoginForm() {
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
                    <input className="input-form" type="text"/>
                    <label className="inputs-label" htmlFor="">Mot de passe</label>
                    <input className="input-form" type="password"/>
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
        </div>
    );
}