import React from 'react'
import './list-objects.css'

export default function ListObjects(props) {

    console.log("Inventaire : ",props.itemsList)

    return (

        <div className="content-edit-perso-form">
            <span className="title-edit-perso">
                Liste des objets
            </span>
            <form className="list-objects">
                <div className="title-list-objects line-list-objects">
                    <span>Objet</span>
                    <span>Description</span>
                    <span>Encombrement</span>
                    <span>Actions</span>
                </div>
                <div className="item-list-objects line-list-objects">
                    <span>Epée légendaire</span>
                    <span>Cette épée de feu applique -10 PV aux ennemis</span>
                    <span>20</span>
                    <span>
                        <button>edit</button>
                        <button>delete</button>
                    </span>
                </div>
            </form>
        </div>
    );

}
