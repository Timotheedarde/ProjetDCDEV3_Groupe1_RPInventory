import React from 'react';
import './register.css';
import RegisterForm from "../../components/auth/register-form";

export default function Register() {
    return (
        <div className='register'>
            <div className='image-container'/>
            <div className='RegisterFormContainer'>
                <RegisterForm/>
            </div>
        </div>
    );
}