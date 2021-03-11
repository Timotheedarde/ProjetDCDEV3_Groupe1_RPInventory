import React from "react";

import './Task.css';


export default function Tasks(props) {
    const done = props.obj.done;
    const title = props.obj.titleTask;

    let statut;
    if(done){
        statut = "Réalisée"
    }
    else{
        statut = 'En cours'
    }



    return (
        <div className="container__todoTask">
            <h3 className="title__todoTask h3__endTaskStyle">{title}</h3>
            <br/>
            <p className="statut__todoTask">{statut}</p>
        </div>
    );
}