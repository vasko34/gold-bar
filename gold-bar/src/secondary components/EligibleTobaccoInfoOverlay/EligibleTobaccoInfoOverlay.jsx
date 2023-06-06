import React from 'react';
import './eligibletobaccoinfooverlay.css';
import { FaTimes } from 'react-icons/fa';

const EligibleTobaccoInfoOverlay = ({ typesInfo, brandsInfo, close }) => {
    return (
        <div className = 'eligibletobaccoinfooverlay'>
            <div className = 'eligibletobaccoinfooverlay__types'>
                <h4>Eligible tobacco types: </h4>
                { typesInfo.map(e => {
                    return (
                        <span>{ e }</span>
                    );
                }) }
            </div>
            <div className = 'eligibletobaccoinfooverlay__brands'>
                <h4>Eligible tobacco brands: </h4>
                { brandsInfo.map(e => {
                    return (
                        <span>{ e }</span>
                    );
                }) }
            </div>
            <FaTimes onClick = { close } className = 'close'></FaTimes>
        </div>
    );
};

export default EligibleTobaccoInfoOverlay;