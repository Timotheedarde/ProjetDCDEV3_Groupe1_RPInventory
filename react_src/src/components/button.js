import React from 'react';
import './button.css';

export default function Button(props) {
    return (
        <button className='button-primary'>
            { props.text || 'Valider' }
        </button>
    );
}