import React from 'react';
import './auth.css';
import Illustration from '../../components/auth/illustration'
import RegisterForm from "../../components/auth/register-form"
import useLogin from "../../components/auth/hooks/useLogin"
import {useHistory} from "react-router";

export default function Register() {

    /*const [authenticated, setAnthenticated] = useLogin();
    const history = useHistory();

    if (authenticated) {
        history.push("/personnage");
    }*/

    return (
        <div className='login'>
            <Illustration />
            <div className='LoginFormContainer'>
                <RegisterForm />
            </div>
        </div>
    );
}
