import React from 'react';
import './orderoverlay.css'
import { FaTimes } from 'react-icons/fa';
import { Tobacco2, CurrentBowlContext } from '../index.js';
import { tobaccos, images } from '../../constants';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const OrderOverlay = ({ close, brand, name }) => {
    const [sliderValue, setSliderValue] = React.useState(20);
    const [buttonDisabler, setButtonDisabler] = React.useState(false);
    const { currentBowl, setCurrentBowl } = React.useContext(CurrentBowlContext);

    const addTobaccoToBowl = () => {
        if (currentBowl.percent1 === 0) {
            setCurrentBowl(prevState => ({ ...prevState, percent1: sliderValue }));
        } else {
            if (currentBowl.percent2 === 0) {
                setCurrentBowl(prevState => ({ ...prevState, percent2: sliderValue }));
            } else {
                if (currentBowl.percent3 === 0) {
                    setCurrentBowl(prevState => ({ ...prevState, percent3: sliderValue }));
                } else {
                    if (currentBowl.percent4 === 0) {
                        setCurrentBowl(prevState => ({ ...prevState, percent4: sliderValue }));
                    } else {
                        if (currentBowl.percent5 === 0) {
                            setCurrentBowl(prevState => ({ ...prevState, percent5: sliderValue }));
                        }                       
                    }                    
                }                
            }
        }
        setButtonDisabler(true);
    };

    const resetCurrentBowl = () => {
        const emptyBowl = {
            tobacco1: '',
            percent1: 0,
            tobacco2: '',
            percent2: 0,
            tobacco3: '',
            percent3: 0,
            tobacco4: '',
            percent4: 0,
            tobacco5: '',
            percent5: 0
        };
        setCurrentBowl(emptyBowl);
    };

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
                <div className = 'orderoverlay__ordertobacco-slider'>
                    <p>Choose how much of your bowl will consist of this tobacco:</p>
                    <input type = "range"  className = 'slider' min = '20' max = { 100 - currentBowl.percent1 - currentBowl.percent2 - currentBowl.percent3 - currentBowl.percent4 - currentBowl.percent5 } value = { sliderValue } onChange = { (e) => setSliderValue(e.target.value) }></input>
                    <label>{ sliderValue }%</label>
                    <button type = 'button' disabled = { buttonDisabler } onClick = { addTobaccoToBowl }>Add</button>
                    <button type = 'button' onClick = { resetCurrentBowl }>Reset</button>
                </div>
            </div>
            <div className = 'orderoverlay__currentbowl'>
                <p>Current Hookah Bowl:</p>
                <div className = 'orderoverlay__currentbowl-image'>
                    <img src = { images.HookahBowl } alt = 'hookahbowl_img'></img>
                    <div className = 'orderoverlay__currentbowl-image_progress' style = {{ transform: 'rotate(0deg)' }}><CircularProgressbar value = { currentBowl.percent1 } strokeWidth = { 50 } styles = { buildStyles({ strokeLinecap: "butt", trailColor: "transparent", pathColor: 'rgba(120, 0, 255, 0.5)' })}></CircularProgressbar></div>
                    <div className = 'orderoverlay__currentbowl-image_progress' style = {{ transform: `rotate(${ 3.6 * currentBowl.percent1 }deg)` }}><CircularProgressbar value = { currentBowl.percent2 } strokeWidth = { 50 } styles = { buildStyles({ strokeLinecap: "butt", trailColor: "transparent", pathColor: 'rgba(120, 120, 255, 0.5)' })}></CircularProgressbar></div>
                    <div className = 'orderoverlay__currentbowl-image_progress' style = {{ transform: `rotate(${ 3.6 * (currentBowl.percent1 + currentBowl.percent2) }deg)` }}><CircularProgressbar value = { currentBowl.percent3 } strokeWidth = { 50 } styles = { buildStyles({ strokeLinecap: "butt", trailColor: "transparent", pathColor: 'rgba(120, 255, 255, 0.5)' })}></CircularProgressbar></div>
                    <div className = 'orderoverlay__currentbowl-image_progress' style = {{ transform: `rotate(${ 3.6 * (currentBowl.percent1 + currentBowl.percent2 + currentBowl.percent3) }deg)` }}><CircularProgressbar value = { currentBowl.percent4 } strokeWidth = { 50 } styles = { buildStyles({ strokeLinecap: "butt", trailColor: "transparent", pathColor: 'rgba(0, 0, 255, 0.5)' })}></CircularProgressbar></div>
                    <div className = 'orderoverlay__currentbowl-image_progress' style = {{ transform: `rotate(${ 3.6 * (currentBowl.percent1 + currentBowl.percent2 + currentBowl.percent3 + currentBowl.percent4) }deg)` }}><CircularProgressbar value = { currentBowl.percent5 } strokeWidth = { 50 } styles = { buildStyles({ strokeLinecap: "butt", trailColor: "transparent", pathColor: 'rgba(120, 0, 25, 0.5)' })}></CircularProgressbar></div>
                </div>
            </div>
            <FaTimes onClick = { close } className = 'close'></FaTimes>
        </div>
    );
}

export default OrderOverlay;