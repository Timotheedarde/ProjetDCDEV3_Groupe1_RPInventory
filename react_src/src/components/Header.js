import React from 'react';
import Nav from './Nav';
import './Header.css';

const Header = (props) =>{

    const style ={
    }

    return(
        <header style={style} className="header">
            <p className="title">{props.appName}</p>
            <Nav/>
        </header>
    )
}

export default Header;