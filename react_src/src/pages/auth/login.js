import React from 'react';
import './auth.css';
import Illustration from '../../components/auth/illustration'
import LoginForm from '../../components/auth/login-form'

export default function Login() {
    return (
        <div className='login'>
            <Illustration />
            <div className='LoginFormContainer'>
                <LoginForm />
            </div>
        </div>
    );
}