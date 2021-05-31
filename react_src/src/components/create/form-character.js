import React from 'react';
import './form-character.css';


class FormCharacter extends React.Component {
    render() {
        return (
            <div>
                <span className="section">Création d'un personnage</span>
                <div className="global-create">

                    <div className="">
                        <form className="formulaire" action="">
                            <label className="labels" htmlFor="">Nom du personnage</label>
                            <input className="inputs" type="text"/>
                            <label className="labels" htmlFor="">Encombrement maximum</label>
                            <input className="inputs" type="text"/>
                            <label className="labels" htmlFor="">Image du personnage</label>
                            <input className="file" type="file" accept=".jpg, .png"/>
                        </form>

                        <div className="buttons-container">
                            <button className="delete">Annuler</button>
                            <button className="next">Suivant</button>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default FormCharacter;