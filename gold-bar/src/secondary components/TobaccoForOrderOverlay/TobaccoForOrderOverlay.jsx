import React from 'react';
import './tobaccofororderoverlay.css';

const TobaccoForOrderOverlay = ({ type, brand, name, flavour, image }) => {
    return (
        <div className = 'tobaccofororderoverlay'>
            <img src = { image } alt = 'tobacco_img'></img>
            <div className = 'tobaccofororderoverlay__content'>
                <h2>{ brand } - { name }</h2>
                <h3>Type: { type }</h3>
                <h4>Flavour: { flavour }</h4>
            </div>
        </div>
    );
};

export default TobaccoForOrderOverlay;