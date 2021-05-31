import React from 'react';
import './button.css';

export default function Button(props) {
    return (
        <button onClick={props.onClick} className='button-primary'>
            { props.text || 'Valider' }
        </button>
    );
}