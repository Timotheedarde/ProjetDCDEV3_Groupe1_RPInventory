import React from "react";
import {Link} from "react-router-dom";

import './Nav.css';

export default function Nav() {


    return (
        <nav className='navigation'>
            <ul>
                <li>
                    <span className="identifiant ">Identifiant</span>
                </li>
                <li>
                    <Link to="/register">Deconnexion</Link>
                </li>
            </ul>
        </nav>
    );
}