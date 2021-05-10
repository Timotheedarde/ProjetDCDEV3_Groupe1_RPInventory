import React from 'react';
import Nav from './Nav';
import logo from "../logo.svg";
import './Header.css';

const Header = (props) =>{

    const style ={
        backgroundColor : props.color || "white",
        border : "2px solid black",
    }

    return(
        <header style={style} className="header">
            <img src={logo} className="logo" alt="logo" />
            <p>{props.appName}</p>
            <Nav/>
        </header>
    )
}

export default Header;