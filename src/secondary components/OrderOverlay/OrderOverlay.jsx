import React from 'react';
import './orderoverlay.css'
import { FaTimes } from 'react-icons/fa';;

const OrderOverlay = ({ close, brand, name }) => {
    return (
        <div className = 'orderoverlay'>
            <h1>{ brand } - { name }</h1>
            <FaTimes onClick = { close } className = 'close'></FaTimes>
        </div>
    );
}

export default OrderOverlay;