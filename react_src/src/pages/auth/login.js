import React from 'react';
import './login.css';
import LoginForm from "../../components/auth/login-form";

export default function Login() {
    return (
        <div className='login'>
            <div className='image-container' />
            <div className='LoginFormContainer'>
                <LoginForm />
            </div>
        </div>
    );
}