import React from 'react';
import './tobaccoforadminlibrary.css';
import { FaTimes } from 'react-icons/fa';

const TobaccoForAdminLibrary = ({ type, brand, name, flavour, image, ice, fruity, sweet, inStock, update, del }) => {
    return (
        <div className = 'tobaccoforadminlibrary'>
            <div className = 'tobaccoforadminlibrary__image'>
                <img src = { image } alt = 'tobacco_img'></img>
                <div className = 'tobaccoforadminlibrary__image-hover'></div>
                <FaTimes onClick = { del } className = 'delbutton'></FaTimes>
            </div>            
            <div className = 'tobaccoforadminlibrary__content'>
                <h2>{ brand } - { name }</h2>
                <h3>Type: { type }</h3>
                <h4>Flavour: { flavour }</h4>
                <div className = 'tobaccoforadminlibrary__content-instock'>
                    <p>In Stock:</p>
                    { inStock === true ? (<p>Yes</p>) : (<p>No</p>) }
                </div>
                <button type = 'button' onClick = { update }>Update</button>
            </div>
            <div className = 'tobaccoforadminlibrary__footer'>
                <div className = 'tobaccoforadminlibrary__footer-ice'>
                    <span>Ice:</span>
                    { ice === true ? (<b>✓</b>) : (<b>X</b>) }
                </div>
                <div className = 'tobaccoforadminlibrary__footer-fruity'>
                    <span>Fruity:</span>
                    { fruity === true ? (<b>✓</b>) : (<b>X</b>) }
                </div>
                <div className = 'tobaccoforadminlibrary__footer-sweet'>
                    <span>Sweet:</span>
                    { sweet === true ? (<b>✓</b>) : (<b>X</b>) }
                </div>
            </div>            
        </div>
    );
};

export default TobaccoForAdminLibrary;