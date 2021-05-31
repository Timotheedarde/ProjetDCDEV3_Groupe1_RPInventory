import React from 'react'
import './form-edit-character.css'

export default function FormCharacter(props) {

    return (
        <div className="content-edit-perso-form">
            <span className="title-edit-perso">
                Nouvel objets
            </span>
            <form className="edit-perso-form">
                <span>Objet</span>
                <input type="text" />
                <span>Description</span>
                <input type="text" />
                <span>Encombrement</span>
                <input type="number" />
                <span>Actions</span>
                <button>+</button>
            </form>
        </div>
    );

}
