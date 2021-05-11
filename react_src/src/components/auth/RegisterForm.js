import React, { useState } from "react";
import './RegisterForm.css';
import axios from "axios";

export default function RegisterForm() {

    const [users, setUsers] = useState([]);

    const [inputValueUN, setInputValueUN] = useState("");
    const [inputValuePW, setInputValuePW] = useState("");

    const handleRegister = () => {
        let newUser = { username: inputValueUN, password: inputValuePW };

        axios
            .post("http://localhost:3001/auth/signup", newUser)
            .then((response) => {
                newUser._id = response.data;
                let newUsers = [...users, newUser];
                setUsers(newUsers);
            })
            .catch((err) => {
                if(err.response.status === 400 ){
                    alert(
                        err.response.data
                    );
                } else{
                    console.log(err)
                    alert(
                        "Une erreur est survenue, veuillez réessayer ultérieurement."
                    );
                }
            });

        setInputValueUN("");
        setInputValuePW("");
    };

    return (
        <div className='RegisterForm'>
            <h2>Inscription / Connexion</h2>
            <form action="">
                <div className='identifiant'>
                    <label htmlFor="">Identifiant</label>
                    <input type="text"
                           value={inputValueUN}
                           onChange={(e) => {
                               setInputValueUN(e.target.value);
                           }}
                    />
                </div>

                <div className='password'>
                    <label htmlFor="">Mot de passe</label>
                    <input type="password"
                           value={inputValuePW}
                           onChange={(e) => {
                               setInputValuePW(e.target.value);
                           }}
                    />
                </div>
            </form>

            <button onClick={handleRegister}>Créer mon compte</button>
        </div>
    );
}
