import React from "react";
import {
    Link,
} from "react-router-dom";

import './Nav.css';

export default function Nav() {


    return (
        <nav className='navigation'>
            <ul>
                <li>
                    <Link to="/">Connexion</Link>
                </li>
                <li>
                    <Link to="/register">Inscription</Link>
                </li>
            </ul>
        </nav>
    );
}