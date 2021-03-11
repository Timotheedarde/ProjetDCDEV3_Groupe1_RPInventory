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
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/page_1">Page 1</Link>
                </li>
                <li>
                    <Link to="/page_2">Page 2</Link>
                </li>
                <li>
                    <Link to="/page_3">Page 3</Link>
                </li>
            </ul>
        </nav>
    );
}