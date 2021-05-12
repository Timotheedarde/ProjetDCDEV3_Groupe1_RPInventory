import React from 'react';
import './illustration.css';
import illustrationBg from '../../assets/img/illustrations/illu-bg.png'
import illustrationPerso from '../../assets/img/illustrations/illu-perso.png'

export default function Login() {
    return (
        <div className='illustration-container'>
            <img src={illustrationPerso} alt='illustration personnage' className='illustration-perso' />
            <img src={illustrationBg} alt='illustration fond' className='illustration-bg' />
        </div>
    );
}