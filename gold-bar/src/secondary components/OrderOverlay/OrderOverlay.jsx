import React from 'react';
import './orderoverlay.css'
import { FaTimes } from 'react-icons/fa';
import { Tobacco2, CurrentBowlContext } from '../index.js';
import { tobaccos, images } from '../../constants';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const OrderOverlay = ({ close, brand, name }) => {
    const [sliderValue, setSliderValue] = React.useState(20);
    const [buttonDisablerAdd, setButtonDisablerAdd] = React.useState(false);
    const [buttonDisablerUndo, setButtonDisablerUndo] = React.useState(true);
    const [buttonDisablerAddToOrders, setButtonDisablerAddToOrders] = React.useState(true);
    const { currentBowl, setCurrentBowl } = React.useContext(CurrentBowlContext);

    const addTobaccoToBowl = () => {
        if (currentBowl.percent1 === 0) {
            if (sliderValue > 0) {
                setCurrentBowl(prevState => ({ ...prevState, percent1: sliderValue }));
                setCurrentBowl(prevState => ({ ...prevState, tobacco1: `${ brand } - ${ name }` }));
            }
        } else {
            if (currentBowl.percent2 === 0) {
                if (sliderValue > 0) {
                    setCurrentBowl(prevState => ({ ...prevState, percent2: sliderValue }));
                    setCurrentBowl(prevState => ({ ...prevState, tobacco2: `${ brand } - ${ name }` }));
                }
            } else {
                if (currentBowl.percent3 === 0) {
                    if (sliderValue > 0) {
                        setCurrentBowl(prevState => ({ ...prevState, percent3: sliderValue }));
                        setCurrentBowl(prevState => ({ ...prevState, tobacco3: `${ brand } - ${ name }` }));
                    }
                } else {
                    if (currentBowl.percent4 === 0) {
                        if (sliderValue > 0) {
                            setCurrentBowl(prevState => ({ ...prevState, percent4: sliderValue }));
                            setCurrentBowl(prevState => ({ ...prevState, tobacco4: `${ brand } - ${ name }` }));
                        }
                    } else {
                        if (currentBowl.percent5 === 0) {
                            if (sliderValue > 0) {
                                setCurrentBowl(prevState => ({ ...prevState, percent5: sliderValue }));
                                setCurrentBowl(prevState => ({ ...prevState, tobacco5: `${ brand } - ${ name }` }));
                            }
                        }                       
                    }                    
                }                
            }
        }
    };

    const undo = () => {
        if (currentBowl.percent2 === 0) {
            setCurrentBowl(prevState => ({ ...prevState, percent1: 0 }));
            setCurrentBowl(prevState => ({ ...prevState, tobacco1: '' }));
        } else {
            if (currentBowl.percent3 === 0) {
                setCurrentBowl(prevState => ({ ...prevState, percent2: 0 }));
                setCurrentBowl(prevState => ({ ...prevState, tobacco2: '' }));
            } else {
                if (currentBowl.percent4 === 0) {
                    setCurrentBowl(prevState => ({ ...prevState, percent3: 0 }));
                    setCurrentBowl(prevState => ({ ...prevState, tobacco3: '' }));
                } else {
                    if (currentBowl.percent5 === 0) {
                        setCurrentBowl(prevState => ({ ...prevState, percent4: 0 }));
                        setCurrentBowl(prevState => ({ ...prevState, tobacco4: '' }));
                    } else {
                        setCurrentBowl(prevState => ({ ...prevState, percent5: 0 }));
                        setCurrentBowl(prevState => ({ ...prevState, tobacco5: '' }));
                    }                 
                }                
            }
        }
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

    const addToOrders = () => {
        const hookahBowlsAsJSON = localStorage.getItem('HookahBowls');
        if (hookahBowlsAsJSON === null) {
            const hookahBowlsEmpty = [];
            hookahBowlsEmpty.push(currentBowl);
            const hookahBowlsToJSON = JSON.stringify(hookahBowlsEmpty);
            localStorage.setItem('HookahBowls', hookahBowlsToJSON);
        } else {
            const hookahBowls = JSON.parse(hookahBowlsAsJSON);
            hookahBowls.push(currentBowl);
            const hookahBowlsToJSON = JSON.stringify(hookahBowls);
            localStorage.setItem('HookahBowls', hookahBowlsToJSON);
        }
        resetCurrentBowl();
    };

    const oneClickOrder = () => {
        const hookahBowlsAsJSON = localStorage.getItem('HookahBowlsSent');
        if (hookahBowlsAsJSON === null) {
            const hookahBowlsEmpty = [];
            hookahBowlsEmpty.push(currentBowl);
            const hookahBowlsToJSON = JSON.stringify(hookahBowlsEmpty);
            localStorage.setItem('HookahBowlsSent', hookahBowlsToJSON);
        } else {
            const hookahBowls = JSON.parse(hookahBowlsAsJSON);
            hookahBowls.push(currentBowl);
            const hookahBowlsToJSON = JSON.stringify(hookahBowls);
            localStorage.setItem('HookahBowlsSent', hookahBowlsToJSON);
        }
        resetCurrentBowl();
    };

    React.useEffect(() => {
        if ((+currentBowl.percent1 + +currentBowl.percent2 + +currentBowl.percent3 + +currentBowl.percent4 + +currentBowl.percent5) < 100) {
            setButtonDisablerAddToOrders(true);
        }
        if ((+currentBowl.percent1 + +currentBowl.percent2 + +currentBowl.percent3 + +currentBowl.percent4 + +currentBowl.percent5) === 100) {
            setButtonDisablerAddToOrders(false);
        }
        if ((+currentBowl.percent1 + +currentBowl.percent2 + +currentBowl.percent3 + +currentBowl.percent4 + +currentBowl.percent5) === 0) {
            setButtonDisablerUndo(true);
        }
        if ((+currentBowl.percent1 + +currentBowl.percent2 + +currentBowl.percent3 + +currentBowl.percent4 + +currentBowl.percent5) > 0) {
            setButtonDisablerUndo(false);
        }
        if ((+currentBowl.percent1 + +currentBowl.percent2 + +currentBowl.percent3 + +currentBowl.percent4 + +currentBowl.percent5) === 100) {
            setButtonDisablerAdd(true);
        }
        if ((+currentBowl.percent1 + +currentBowl.percent2 + +currentBowl.percent3 + +currentBowl.percent4 + +currentBowl.percent5) < 100) {
            setButtonDisablerAdd(false);
        }
        if ((currentBowl.tobacco1 === `${ brand } - ${ name }`) || (currentBowl.tobacco2 === `${ brand } - ${ name }`) || (currentBowl.tobacco3 === `${ brand } - ${ name }`) || (currentBowl.tobacco4 === `${ brand } - ${ name }`) || (currentBowl.tobacco5 === `${ brand } - ${ name }`)) {
            setButtonDisablerAdd(true);
        }

        const min = Math.min(20, 100 - currentBowl.percent1 - currentBowl.percent2 - currentBowl.percent3 - currentBowl.percent4 - currentBowl.percent5);
        const max = 100 - currentBowl.percent1 - currentBowl.percent2 - currentBowl.percent3 - currentBowl.percent4 - currentBowl.percent5;
        if (min === max) {
            setSliderValue(min);
        } else {
            setSliderValue(20);
        }

        const bowlImage = document.querySelector('.orderoverlay__currentbowl-image');
        const bowlImageRotations = [
          currentBowl.percent1,
          currentBowl.percent2,
          currentBowl.percent3,
          currentBowl.percent4,
          currentBowl.percent5,
        ];      
        let totalRotation = 0;
        for (let i = 0; i < 5; i++) {
            bowlImage.children[i + 1].style.transform = `rotate(${ totalRotation }deg)`;
            totalRotation += bowlImageRotations[i] * 3.6;
        }
    }, [currentBowl]);

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
                    <p>Choose tobacco proportion:</p>
                    <input type = 'range'  className = 'slider' min = { Math.min(20, 100 - currentBowl.percent1 - currentBowl.percent2 - currentBowl.percent3 - currentBowl.percent4 - currentBowl.percent5) } max = { 100 - currentBowl.percent1 - currentBowl.percent2 - currentBowl.percent3 - currentBowl.percent4 - currentBowl.percent5 } value = { sliderValue } onChange = { (e) => setSliderValue(e.target.value) }></input>
                    <label>{ sliderValue }%</label>
                    <div className = 'orderoverlay__ordertobacco-sliderrow'>
                        <button type = 'button' disabled = { buttonDisablerAdd } onClick = { addTobaccoToBowl }>Add</button>
                        <button type = 'button' disabled = { buttonDisablerUndo } onClick = { undo }>Undo</button>
                    </div>
                </div>
            </div>
            <div className = 'orderoverlay__currentbowl'>
                <p>Current Hookah Bowl:</p>
                <div className = 'orderoverlay__currentbowl-image'>
                    <img src = { images.HookahBowl } alt = 'hookahbowl_img'></img>
                    <div className = 'orderoverlay__currentbowl-image_progress'><CircularProgressbar value = { currentBowl.percent1 } strokeWidth = { 50 } styles = { buildStyles({ strokeLinecap: "butt", trailColor: "transparent", pathColor: 'rgba(120, 0, 255, 0.5)' })}></CircularProgressbar></div>
                    <div className = 'orderoverlay__currentbowl-image_progress'><CircularProgressbar value = { currentBowl.percent2 } strokeWidth = { 50 } styles = { buildStyles({ strokeLinecap: "butt", trailColor: "transparent", pathColor: 'rgba(120, 120, 255, 0.5)' })}></CircularProgressbar></div>
                    <div className = 'orderoverlay__currentbowl-image_progress'><CircularProgressbar value = { currentBowl.percent3 } strokeWidth = { 50 } styles = { buildStyles({ strokeLinecap: "butt", trailColor: "transparent", pathColor: 'rgba(120, 255, 255, 0.5)' })}></CircularProgressbar></div>
                    <div className = 'orderoverlay__currentbowl-image_progress'><CircularProgressbar value = { currentBowl.percent4 } strokeWidth = { 50 } styles = { buildStyles({ strokeLinecap: "butt", trailColor: "transparent", pathColor: 'rgba(0, 0, 255, 0.5)' })}></CircularProgressbar></div>
                    <div className = 'orderoverlay__currentbowl-image_progress'><CircularProgressbar value = { currentBowl.percent5 } strokeWidth = { 50 } styles = { buildStyles({ strokeLinecap: "butt", trailColor: "transparent", pathColor: 'rgba(120, 0, 25, 0.5)' })}></CircularProgressbar></div>
                </div>
                <div className = 'orderoverlay__currentbowl-content'>
                    <div className = 'orderoverlay__currentbowl-contentrow'>
                        { currentBowl.percent1 > 0 ? (<div className = 'orderoverlay__currentbowl-contentrow_color1'></div>) : null }
                        { currentBowl.percent1 > 0 ? (<span>{ currentBowl.tobacco1 }: { currentBowl.percent1 }%</span>) : null }
                    </div>
                    <div className = 'orderoverlay__currentbowl-contentrow'>
                        { currentBowl.percent2 > 0 ? (<div className = 'orderoverlay__currentbowl-contentrow_color2'></div>) : null }
                        { currentBowl.percent2 > 0 ? (<span>{ currentBowl.tobacco2 }: { currentBowl.percent2 }%</span>) : null }
                    </div>
                    <div className = 'orderoverlay__currentbowl-contentrow'>
                        { currentBowl.percent3 > 0 ? (<div className = 'orderoverlay__currentbowl-contentrow_color3'></div>) : null }
                        { currentBowl.percent3 > 0 ? (<span>{ currentBowl.tobacco3 }: { currentBowl.percent3 }%</span>) : null }
                    </div>
                    <div className = 'orderoverlay__currentbowl-contentrow'>
                        { currentBowl.percent4 > 0 ? (<div className = 'orderoverlay__currentbowl-contentrow_color4'></div>) : null }
                        { currentBowl.percent4 > 0 ? (<span>{ currentBowl.tobacco4 }: { currentBowl.percent4 }%</span>) : null }
                    </div>
                    <div className = 'orderoverlay__currentbowl-contentrow'>
                        { currentBowl.percent5 > 0 ? (<div className = 'orderoverlay__currentbowl-contentrow_color5'></div>) : null }
                        { currentBowl.percent5 > 0 ? (<span>{ currentBowl.tobacco5 }: { currentBowl.percent5 }%</span>) : null }
                    </div>
                    <div className = 'orderoverlay__currentbowl-contentrow_button'>
                        <button type = 'button' disabled = { buttonDisablerAddToOrders } onClick = { oneClickOrder }>One Click<br></br>Order</button>
                        <button type = 'button' disabled = { buttonDisablerAddToOrders } onClick = { addToOrders }>Add To<br></br>Orders</button>
                    </div>
                </div>
            </div>
            <FaTimes onClick = { close } className = 'close'></FaTimes>
        </div>
    );
}

export default OrderOverlay;