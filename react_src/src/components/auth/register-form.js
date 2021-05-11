import React from 'react';
import './register-form.css';

export default function RegisterForm() {
    return (
        <div className='RegisterForm'>
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

                <div className="majeur">
                    <input className="checkbox" type="checkbox" name="" id=""/>
                    <label className="label-checkbox" htmlFor="">
                        Je certifie avoir plus de 18 ans et j’accepte les <span className="conditions">conditions d’utilisations</span>  ainsi que la  <span className="conditions">politique de confidentialité</span>.
                    </label>
                </div>

                <div className="newsletter">
                    <input className="checkbox" type="checkbox" name="" id=""/>
                    <label className="label-checkbox" htmlFor="">Je veux recevoir par email les nouveautés du jeu et les offres promotionnelles. </label>
                </div>

                <div>
                    <button className="button-submit">INSCRIPTION</button>
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
                        <span className="allready-account">Vous avez déjà un compte ?</span>
                        <a className="connexion" href="/">Connectez-vous</a>
                    </div>
                </div>
            </form>
        </div>
    );
}