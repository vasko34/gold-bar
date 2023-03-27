import React from 'react';
import './tobacco2.css';

const Tobacco2 = ({ type, brand, name, flavour, image }) => {
    return (
        <div className = 'tobacco2'>
            <img src = { image } alt = 'tobacco_img'></img>
            <div className = 'tobacco2__content'>
                <h2>{ brand } - { name }</h2>
                <h3>Type: { type }</h3>
                <h4>Flavour: { flavour }</h4>
            </div>
        </div>
    );
}

export default Tobacco2;