import React from 'react';
import './auth.css';
import Illustration from '../../components/auth/illustration'
import RegisterForm from "../../components/auth/register-form"

export default function Register() {
    return (
        <div className='login'>
            <Illustration />
            <div className='LoginFormContainer'>
                <RegisterForm />
            </div>
        </div>
    );
}