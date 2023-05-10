import React from 'react';
import './hookahbowl.css';
import { FaTimes } from 'react-icons/fa';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const HookahBowl = ({ currentBowl, del, done, delBowl }) => {
    const bowlImageRef = React.useRef();
    
    React.useEffect(() => {
        const bowlImage = bowlImageRef.current;
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
        <div className = 'hookahbowl'>
            <div className = 'hookahbowl__image' ref = { bowlImageRef }>
                <img src = { 'https://firebasestorage.googleapis.com/v0/b/gold-bar-4abbb.appspot.com/o/HookahBowl.png?alt=media&token=1ed52f0b-2c83-4cce-bd04-f0c926d5330a' } alt = 'hookahbowl_img'></img>
                <div className = 'hookahbowl__image-progress'><CircularProgressbar value = { currentBowl.percent1 } strokeWidth = { 50 } styles = { buildStyles({ strokeLinecap: "butt", trailColor: "transparent", pathColor: 'rgba(120, 0, 255, 0.5)' })}></CircularProgressbar></div>
                <div className = 'hookahbowl__image-progress'><CircularProgressbar value = { currentBowl.percent2 } strokeWidth = { 50 } styles = { buildStyles({ strokeLinecap: "butt", trailColor: "transparent", pathColor: 'rgba(120, 120, 255, 0.5)' })}></CircularProgressbar></div>
                <div className = 'hookahbowl__image-progress'><CircularProgressbar value = { currentBowl.percent3 } strokeWidth = { 50 } styles = { buildStyles({ strokeLinecap: "butt", trailColor: "transparent", pathColor: 'rgba(120, 255, 255, 0.5)' })}></CircularProgressbar></div>
                <div className = 'hookahbowl__image-progress'><CircularProgressbar value = { currentBowl.percent4 } strokeWidth = { 50 } styles = { buildStyles({ strokeLinecap: "butt", trailColor: "transparent", pathColor: 'rgba(0, 0, 255, 0.5)' })}></CircularProgressbar></div>
                <div className = 'hookahbowl__image-progress'><CircularProgressbar value = { currentBowl.percent5 } strokeWidth = { 50 } styles = { buildStyles({ strokeLinecap: "butt", trailColor: "transparent", pathColor: 'rgba(120, 0, 25, 0.5)' })}></CircularProgressbar></div>
            </div>
            <div className = 'hookahbowl__content'>
                <div className = 'hookahbowl__contentrow'>
                    { currentBowl.percent1 > 0 ? (<div className = 'hookahbowl__contentrow-color1'></div>) : null }
                    { currentBowl.percent1 > 0 ? (<span>{ currentBowl.tobacco1 }: { currentBowl.percent1 }%</span>) : null }
                </div>
                <div className = 'hookahbowl__contentrow'>
                    { currentBowl.percent2 > 0 ? (<div className = 'hookahbowl__contentrow-color2'></div>) : null }
                    { currentBowl.percent2 > 0 ? (<span>{ currentBowl.tobacco2 }: { currentBowl.percent2 }%</span>) : null }
                </div>
                <div className = 'hookahbowl__contentrow'>
                    { currentBowl.percent3 > 0 ? (<div className = 'hookahbowl__contentrow-color3'></div>) : null }
                    { currentBowl.percent3 > 0 ? (<span>{ currentBowl.tobacco3 }: { currentBowl.percent3 }%</span>) : null }
                </div>
                <div className = 'hookahbowl__contentrow'>
                    { currentBowl.percent4 > 0 ? (<div className = 'hookahbowl__contentrow-color4'></div>) : null }
                    { currentBowl.percent4 > 0 ? (<span>{ currentBowl.tobacco4 }: { currentBowl.percent4 }%</span>) : null }
                </div>
                <div className = 'hookahbowl__contentrow'>
                    { currentBowl.percent5 > 0 ? (<div className = 'hookahbowl__contentrow-color5'></div>) : null }
                    { currentBowl.percent5 > 0 ? (<span>{ currentBowl.tobacco5 }: { currentBowl.percent5 }%</span>) : null }
                </div>
            </div>
            { done && (<button type = 'button' onClick = { () => delBowl(currentBowl) }>Done</button>) }
            { del && (<FaTimes onClick = { () => delBowl(currentBowl) } className = 'close'></FaTimes>) }
        </div>
    );
};

export default HookahBowl;