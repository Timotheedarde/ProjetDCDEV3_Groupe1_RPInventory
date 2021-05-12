import React from 'react'
import ButtonPrimary from '../button'
import './auth-form.css'

export default function RegisterForm() {
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
                    <input className="input-form" type="text"/>
                </div>

                <div className='password'>
                    <label className="inputs-label" htmlFor="">Mot de passe</label>
                    <input className="input-form" type="password"/>
                </div>

                <div className='content-btn-submit'>
                    <ButtonPrimary text='Inscription' />
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