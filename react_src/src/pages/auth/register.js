import React from 'react';
import './register.css';
import RegisterForm from "../../components/auth/RegisterForm";


export default function Register() {
    return (
        <div className='register'>
            <div className='image-container'/>
            <div className='registerFormContainer'>
                <h1 className='registerTitle' >S'enregister</h1>
                <RegisterForm/>
            </div>
        </div>
    );
}
