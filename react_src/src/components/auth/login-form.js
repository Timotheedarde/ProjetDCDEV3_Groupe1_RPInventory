import React from 'react';
import './login-form.css';

export default function LoginForm() {
    return (
        <div className='LoginForm'>
            <div className="titles-form">
                <span className="register-title">Inscription</span>
                <span>/</span>
                <span className="login-title">Connexion</span>
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

                <div>
                    <button className="button-submit">connexion</button>
                </div>

                <div className="footer-form">
                    <span className="social-register">
                    Ou avec les réseaux sociaux
                    </span>

                    <div className="button-grp">
                        <button>G</button>
                        <button>F</button>
                        <button>T</button>
                    </div>

                    <div className="account">
                        <span className="allready-account">Vous n'avez pas de compte ?</span>
                        <a className="connexion" href="/register">Inscrivez-vous</a>
                    </div>
                </div>
            </form>
        </div>
    );
}