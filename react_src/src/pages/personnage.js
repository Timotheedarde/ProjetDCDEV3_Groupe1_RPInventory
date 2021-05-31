import React from 'react';
import './personnage.css';
import Header from "../components/Header";
import Button from '../components/button'
import {Link} from "react-router-dom";
import FormCharacter from "../components/create/form-character";


class Personnage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { show: true };
    }

    render() {
        return <div>
            <div>
                <Header appName="RP Inventory"/>
                <Button onClick={ () => this.setState({ show: !this.state.show } ) } text="créer nouveau personnage"/>
                <span className="noPerso">Vous n'avez pas encore de personnage</span>
                { this.state.show ? <FormCharacter /> : null }
            </div>
        </div>
    }
}

// export default function Personnage() {
//     return (
//         <div>
//             <Header appName="RP Inventory"/>
//             <Link className="link" to="#">
//                 <Button text='Créer nouveau personnage'/>
//             </Link>
//             <span className="noPerso">
//                 Vous n'avez pas encore de personnage
//             </span>
//             <FormCharacter />
//         </div>
//     );
// }

export default Personnage;