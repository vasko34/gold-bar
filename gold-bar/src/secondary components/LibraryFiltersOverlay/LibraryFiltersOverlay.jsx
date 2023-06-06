import React from 'react';
import './libraryfiltersoverlay.css';
import { FaTimes } from 'react-icons/fa';

const LibraryFiltersOverlay = ({ close, resetFilters, onCheckboxChangeInStock, onCheckboxChangeElement, onCheckboxChangeDarkside, onCheckboxChangeMusthave, onCheckboxChangeBlackBurn, onCheckboxChangeTangiers, onCheckboxChangeZomo, onCheckboxChangeHolster, onCheckboxChangeBlonde, onCheckboxChangeDarkWeak, onCheckboxChangeDark, onCheckboxChangeDarkStrong, onCheckboxChangeDarkExtreme, onCheckboxChangeIce, onCheckboxChangeFruity, onCheckboxChangeSweet, activeFiltersBoolean, activeFiltersBrand, activeFiltersType }) => {
    return (
        <div className = 'libraryfiltersoverlay'>
            <button type = 'button' onClick = { resetFilters }>Reset Filters</button>
            <div className = 'libraryfiltersoverlay__instock'>
                <div className = 'libraryfiltersoverlay__checkbox-instock'>
                    <input type = 'checkbox' checked = { activeFiltersBoolean.some(arrayItem => arrayItem.id === 'instock') } onChange = { onCheckboxChangeInStock }></input>
                    <label>In Stock</label>
                </div>
            </div>
            <div className = 'libraryfiltersoverlay__brand'>
                <h2>Brand:</h2>
                <div className = 'libraryfiltersoverlay__checkbox'>
                    <input type = 'checkbox' checked = { activeFiltersBrand.includes('Element') } onChange = { onCheckboxChangeElement }></input>
                    <label>Element</label>
                </div>
                <div className = 'libraryfiltersoverlay__checkbox'>
                    <input type = 'checkbox' checked = { activeFiltersBrand.includes('Darkside') } onChange = { onCheckboxChangeDarkside }></input>
                    <label>Darkside</label>
                </div>
                <div className = 'libraryfiltersoverlay__checkbox'>
                    <input type = 'checkbox' checked = { activeFiltersBrand.includes('Musthave') } onChange = { onCheckboxChangeMusthave }></input>
                    <label>Musthave</label>
                </div>
                <div className = 'libraryfiltersoverlay__checkbox'>
                    <input type = 'checkbox' checked = { activeFiltersBrand.includes('BlackBurn') } onChange = { onCheckboxChangeBlackBurn }></input>
                    <label>BlackBurn</label>
                </div>
                <div className = 'libraryfiltersoverlay__checkbox'>
                    <input type = 'checkbox' checked = { activeFiltersBrand.includes('Tangiers') } onChange = { onCheckboxChangeTangiers }></input>
                    <label>Tangiers</label>
                </div>
                <div className = 'libraryfiltersoverlay__checkbox'>
                    <input type = 'checkbox' checked = { activeFiltersBrand.includes('Zomo') } onChange = { onCheckboxChangeZomo }></input>
                    <label>Zomo</label>
                </div>
                <div className = 'libraryfiltersoverlay__checkbox'>
                    <input type = 'checkbox' checked = { activeFiltersBrand.includes('Holster') } onChange = { onCheckboxChangeHolster }></input>
                    <label>Holster</label>
                </div>
            </div>
            <div className = 'libraryfiltersoverlay__type'>
                <h2>Type:</h2>
                <div className = 'libraryfiltersoverlay__checkbox'>
                    <input type = 'checkbox' checked = { activeFiltersType.includes('Blonde') } onChange = { onCheckboxChangeBlonde }></input>
                    <label>Blonde</label>
                </div>
                <div className = 'libraryfiltersoverlay__checkbox'>
                    <input type = 'checkbox' checked = { activeFiltersType.includes('Dark (Weak)') } onChange = { onCheckboxChangeDarkWeak }></input>
                    <label>Dark (Weak)</label>
                </div>
                <div className = 'libraryfiltersoverlay__checkbox'>
                    <input type = 'checkbox' checked = { activeFiltersType.includes('Dark') } onChange = { onCheckboxChangeDark }></input>
                    <label>Dark</label>
                </div>
                <div className = 'libraryfiltersoverlay__checkbox'>
                    <input type = 'checkbox' checked = { activeFiltersType.includes('Dark (Strong)') } onChange = { onCheckboxChangeDarkStrong }></input>
                    <label>Dark (Strong)</label>
                </div>
                <div className = 'libraryfiltersoverlay__checkbox'>
                    <input type = 'checkbox' checked = { activeFiltersType.includes('Dark (Extreme)') } onChange = { onCheckboxChangeDarkExtreme }></input>
                    <label>Dark (Extreme)</label>
                </div>
            </div>
            <div className = 'libraryfiltersoverlay__boolean'>
                <h2>Flavour:</h2>
                <div className = 'libraryfiltersoverlay__checkbox'>
                    <input type = 'checkbox' checked = { activeFiltersBoolean.some(arrayItem => arrayItem.id === 'ice') } onChange = { onCheckboxChangeIce }></input>
                    <label>Ice</label>
                </div>
                <div className = 'libraryfiltersoverlay__checkbox'>
                    <input type = 'checkbox' checked = { activeFiltersBoolean.some(arrayItem => arrayItem.id === 'fruity') } onChange = { onCheckboxChangeFruity }></input>
                    <label>Fruity</label>
                </div>
                <div className = 'libraryfiltersoverlay__checkbox'>
                    <input type = 'checkbox' checked = { activeFiltersBoolean.some(arrayItem => arrayItem.id === 'sweet') } onChange = { onCheckboxChangeSweet }></input>
                    <label>Sweet</label>
                </div>
            </div>
            <FaTimes className = 'close' onClick = { close }></FaTimes>
        </div>
    );
};

export default LibraryFiltersOverlay;