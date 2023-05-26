import React from 'react';
import './tobaccoforlibrary.css';

const TobaccoForLibrary = ({ type, brand, name, flavour, image, ice, fruity, sweet, inStock, open }) => {
    return (
        <div className = 'tobaccoforlibrary' onClick = { open }>
            <img src = { image } alt = 'tobaccoforlibrary_img'></img>
            <div className = 'tobaccoforlibrary__content'>
                <h2>{ brand } - { name }</h2>
                <h3>Type: { type }</h3>
                <h4>Flavour: { flavour }</h4>
                <div className = 'tobaccoforlibrary__content-instock'>
                    <p>In Stock:</p>
                    { inStock === true ? (<p>Yes</p>) : (<p>No</p>) }
                </div>
            </div>
            <div className = 'tobaccoforlibrary__footer'>
                <div className = 'tobaccoforlibrary__footer-ice'>
                    <span>Ice:</span>
                    { ice === true ? (<b>✓</b>) : (<b>X</b>) }
                </div>
                <div className = 'tobaccoforlibrary__footer-fruity'>
                    <span>Fruity:</span>
                    { fruity === true ? (<b>✓</b>) : (<b>X</b>) }
                </div>
                <div className = 'tobaccoforlibrary__footer-sweet'>
                    <span>Sweet:</span>
                    { sweet === true ? (<b>✓</b>) : (<b>X</b>) }
                </div>
            </div>
        </div>
    );
};

export default TobaccoForLibrary;