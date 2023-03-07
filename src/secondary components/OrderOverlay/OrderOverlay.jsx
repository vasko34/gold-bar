import React from 'react';
import './orderoverlay.css'
import { FaTimes } from 'react-icons/fa';
import { Tobacco2 } from '../index.js';
import { tobaccos } from '../../constants';

const OrderOverlay = ({ close, brand, name }) => {
    const [sliderValue, setSliderValue] = React.useState(20);

    return (
        <div className = 'orderoverlay'>
            <div className = 'orderoverlay__ordertobacco'>
                <div className = 'orderoverlay__ordertobacco-tobacco'>
                    { tobaccos.map((e, i) => {
                        if ((e.brand === brand) && (e.name === name)) {
                            return (
                                <Tobacco2 key = { i } type = { e.type } brand = { e.brand } name = { e.name } flavour = { e.flavour } image = { e.image }></Tobacco2>
                            );
                        }
                    })}
                </div>
                <div className = 'orderoverlay__ordertobacco-order'>
                    <p>Choose how much of your bowl will consist of this tobacco:</p>
                    <input type="range"  className = 'slider' min="20" max="100" value = { sliderValue } onChange = { (e) => setSliderValue(e.target.value) }></input>
                    <label>{ sliderValue }%</label>
                    <button type = 'button' disabled = { false }>Add</button>
                </div>
            </div>
            <div className = 'orderoverlay__currentbowl'>

            </div>
            <FaTimes onClick = { close } className = 'close'></FaTimes>
        </div>
    );
}

export default OrderOverlay;