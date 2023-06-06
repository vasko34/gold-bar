import React from 'react';
import './doublecheckoverlay.css';

const DoubleCheckOverlay = ({ close, del }) => {
    return (
        <div className = 'doublecheckoverlay'>
            <p>Are you sure you want to permanently delete this tobacco from the library and database?</p>
            <div className = 'doublecheckoverlay__buttons'>
                <button type = 'button' onClick = { del }>Yes</button>
                <button type = 'button' onClick = { close }>No</button>
            </div>
        </div>
    );
};

export default DoubleCheckOverlay;