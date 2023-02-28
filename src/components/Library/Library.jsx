import React from 'react';
import './library.css';
import { Tobacco } from '../../secondary components';
import { tobaccos } from '../../constants';

const removeArrayItem = (arr, condition) => {
    if ((condition === 'instock') || (condition === 'ice') || (condition === 'fruity') || (condition === 'sweet')) {
        return arr.filter(arrayItem => arrayItem.id !== condition);
    } else {
        return arr.filter(arrayItem => arrayItem !== condition);
    }
};

const Library = () => {
    const [listOfTobaccos, setListOfTobaccos] = React.useState(tobaccos);
    const [activeFiltersBoolean, setActiveFiltersBoolean] = React.useState([]);
    const [activeFiltersBrand, setActiveFiltersBrand] = React.useState([]);
    const [activeFiltersType, setActiveFiltersType] = React.useState([]);

    const resetFilters = () => {
        setActiveFiltersBoolean([]);
        setActiveFiltersBrand([]);
        setActiveFiltersType([]);
    };

    React.useEffect(() => {  
        let arr = tobaccos;
        activeFiltersBoolean.forEach(arrayItem => {
            arr = arr.filter(arrayItem.conditionFn);

        });
        if (activeFiltersBrand.length !== 0) {
            arr = arr.filter(arrayItem => activeFiltersBrand.includes(arrayItem.brand.split(' ')[0]));
        }
        if (activeFiltersType.length !== 0) {
            arr = arr.filter(arrayItem => activeFiltersType.includes(arrayItem.type));
        }
        setListOfTobaccos(arr);
    }, [activeFiltersBoolean, activeFiltersBrand, activeFiltersType]);

    const onCheckboxChangeInStock = () => {
        const filter = {
            id: 'instock',
            conditionFn: arrayItem => arrayItem.inStock === true
        };

        if (activeFiltersBoolean.some(arrayItem => arrayItem.id === 'instock')) {
            setActiveFiltersBoolean(removeArrayItem(activeFiltersBoolean, 'instock'))
        } else {
            setActiveFiltersBoolean(activeFiltersBoolean.concat(filter))
        }
    };

    const onCheckboxChangeElement = () => {
        if (activeFiltersBrand.includes('Element')) {
            setActiveFiltersBrand(removeArrayItem(activeFiltersBrand, 'Element'));
        } else {
            setActiveFiltersBrand(activeFiltersBrand.concat('Element'));
        }
    };

    const onCheckboxChangeDarkside = () => {
        if (activeFiltersBrand.includes('Darkside')) {
            setActiveFiltersBrand(removeArrayItem(activeFiltersBrand, 'Darkside'));
        } else {
            setActiveFiltersBrand(activeFiltersBrand.concat('Darkside'));
        }
    };

    const onCheckboxChangeMusthave = () => {
        if (activeFiltersBrand.includes('Musthave')) {
            setActiveFiltersBrand(removeArrayItem(activeFiltersBrand, 'Musthave'));
        } else {
            setActiveFiltersBrand(activeFiltersBrand.concat('Musthave'));
        }
    };

    const onCheckboxChangeBlackBurn = () => {
        if (activeFiltersBrand.includes('BlackBurn')) {
            setActiveFiltersBrand(removeArrayItem(activeFiltersBrand, 'BlackBurn'));
        } else {
            setActiveFiltersBrand(activeFiltersBrand.concat('BlackBurn'));
        }
    };

    const onCheckboxChangeTangiers = () => {
        if (activeFiltersBrand.includes('Tangiers')) {
            setActiveFiltersBrand(removeArrayItem(activeFiltersBrand, 'Tangiers'));
        } else {
            setActiveFiltersBrand(activeFiltersBrand.concat('Tangiers'));
        }
    };

    const onCheckboxChangeZomo = () => {
        if (activeFiltersBrand.includes('Zomo')) {
            setActiveFiltersBrand(removeArrayItem(activeFiltersBrand, 'Zomo'));
        } else {
            setActiveFiltersBrand(activeFiltersBrand.concat('Zomo'));
        }
    };

    const onCheckboxChangeHolster = () => {
        if (activeFiltersBrand.includes('Holster')) {
            setActiveFiltersBrand(removeArrayItem(activeFiltersBrand, 'Holster'));
        } else {
            setActiveFiltersBrand(activeFiltersBrand.concat('Holster'));
        }
    };

    const onCheckboxChangeBlonde = () => {
        if (activeFiltersType.includes('Blonde')) {
            setActiveFiltersType(removeArrayItem(activeFiltersType, 'Blonde'));
        } else {
            setActiveFiltersType(activeFiltersType.concat('Blonde'));
        }
    };

    const onCheckboxChangeDarkWeak = () => {
        if (activeFiltersType.includes('Dark (Weak)')) {
            setActiveFiltersType(removeArrayItem(activeFiltersType, 'Dark (Weak)'));
        } else {
            setActiveFiltersType(activeFiltersType.concat('Dark (Weak)'));
        }
    };

    const onCheckboxChangeDark = () => {
        if (activeFiltersType.includes('Dark')) {
            setActiveFiltersType(removeArrayItem(activeFiltersType, 'Dark'));
        } else {
            setActiveFiltersType(activeFiltersType.concat('Dark'));
        }
    };

    const onCheckboxChangeDarkStrong = () => {
        if (activeFiltersType.includes('Dark (Strong)')) {
            setActiveFiltersType(removeArrayItem(activeFiltersType, 'Dark (Strong)'));
        } else {
            setActiveFiltersType(activeFiltersType.concat('Dark (Strong)'));
        }
    };

    const onCheckboxChangeDarkExtreme = () => {
        if (activeFiltersType.includes('Dark (Extreme)')) {
            setActiveFiltersType(removeArrayItem(activeFiltersType, 'Dark (Extreme)'));
        } else {
            setActiveFiltersType(activeFiltersType.concat('Dark (Extreme)'));
        }
    };

    const onCheckboxChangeIce = () => {
        const filter = {
            id: 'ice',
            conditionFn: arrayItem => arrayItem.ice === true
        };

        if (activeFiltersBoolean.some(arrayItem => arrayItem.id === 'ice')) {
            setActiveFiltersBoolean(removeArrayItem(activeFiltersBoolean, 'ice'))
        } else {
            setActiveFiltersBoolean(activeFiltersBoolean.concat(filter))
        }
    };

    const onCheckboxChangeFruity = () => {
        const filter = {
            id: 'fruity',
            conditionFn: arrayItem => arrayItem.fruity === true
        };

        if (activeFiltersBoolean.some(arrayItem => arrayItem.id === 'fruity')) {
            setActiveFiltersBoolean(removeArrayItem(activeFiltersBoolean, 'fruity'))
        } else {
            setActiveFiltersBoolean(activeFiltersBoolean.concat(filter))
        }
    };

    const onCheckboxChangeSweet = () => {
        const filter = {
            id: 'sweet',
            conditionFn: arrayItem => arrayItem.sweet === true
        };

        if (activeFiltersBoolean.some(arrayItem => arrayItem.id === 'sweet')) {
            setActiveFiltersBoolean(removeArrayItem(activeFiltersBoolean, 'sweet'))
        } else {
            setActiveFiltersBoolean(activeFiltersBoolean.concat(filter))
        }
    };

    return (
        <div className = 'library'>
            <div className = 'library__filter'>
                <button type = 'button' onClick = { resetFilters }>Reset Filters</button>
                <div className = 'library__filter-instock'>
                    <div className = 'library__filter-checkbox'>
                        <input type = 'checkbox' checked = { activeFiltersBoolean.some(arrayItem => arrayItem.id === 'instock') } onChange = { onCheckboxChangeInStock }></input>
                        <span>In Stock</span>
                    </div>
                </div>
                <div className = 'library__filter-brand'>
                    <div className = 'library__filter-checkbox'>
                        <input type = 'checkbox' checked = { activeFiltersBrand.includes('Element') } onChange = { onCheckboxChangeElement }></input>
                        <span>Element</span>
                    </div>
                    <div className = 'library__filter-checkbox'>
                        <input type = 'checkbox' checked = { activeFiltersBrand.includes('Darkside') } onChange = { onCheckboxChangeDarkside }></input>
                        <span>Darkside</span>
                    </div>
                    <div className = 'library__filter-checkbox'>
                        <input type = 'checkbox' checked = { activeFiltersBrand.includes('Musthave') } onChange = { onCheckboxChangeMusthave }></input>
                        <span>Musthave</span>
                    </div>
                    <div className = 'library__filter-checkbox'>
                        <input type = 'checkbox' checked = { activeFiltersBrand.includes('BlackBurn') } onChange = { onCheckboxChangeBlackBurn }></input>
                        <span>BlackBurn</span>
                    </div>
                    <div className = 'library__filter-checkbox'>
                        <input type = 'checkbox' checked = { activeFiltersBrand.includes('Tangiers') } onChange = { onCheckboxChangeTangiers }></input>
                        <span>Tangiers</span>
                    </div>
                    <div className = 'library__filter-checkbox'>
                        <input type = 'checkbox' checked = { activeFiltersBrand.includes('Zomo') } onChange = { onCheckboxChangeZomo }></input>
                        <span>Zomo</span>
                    </div>
                    <div className = 'library__filter-checkbox'>
                        <input type = 'checkbox' checked = { activeFiltersBrand.includes('Holster') } onChange = { onCheckboxChangeHolster }></input>
                        <span>Holster</span>
                    </div>
                </div>
                <div className = 'library__filter-type'>
                    <div className = 'library__filter-checkbox'>
                        <input type = 'checkbox' checked = { activeFiltersType.includes('Blonde') } onChange = { onCheckboxChangeBlonde }></input>
                        <span>Blonde</span>
                    </div>
                    <div className = 'library__filter-checkbox'>
                        <input type = 'checkbox' checked = { activeFiltersType.includes('Dark (Weak)') } onChange = { onCheckboxChangeDarkWeak }></input>
                        <span>Dark (Weak)</span>
                    </div>
                    <div className = 'library__filter-checkbox'>
                        <input type = 'checkbox' checked = { activeFiltersType.includes('Dark') } onChange = { onCheckboxChangeDark }></input>
                        <span>Dark</span>
                    </div>
                    <div className = 'library__filter-checkbox'>
                        <input type = 'checkbox' checked = { activeFiltersType.includes('Dark (Strong)') } onChange = { onCheckboxChangeDarkStrong }></input>
                        <span>Dark (Strong)</span>
                    </div>
                    <div className = 'library__filter-checkbox'>
                        <input type = 'checkbox' checked = { activeFiltersType.includes('Dark (Extreme)') } onChange = { onCheckboxChangeDarkExtreme }></input>
                        <span>Dark (Extreme)</span>
                    </div>
                </div>
                <div className = 'library__filter-boolean'>
                    <div className = 'library__filter-checkbox'>
                        <input type = 'checkbox' checked = { activeFiltersBoolean.some(arrayItem => arrayItem.id === 'ice') } onChange = { onCheckboxChangeIce }></input>
                        <span>Ice</span>
                    </div>
                    <div className = 'library__filter-checkbox'>
                        <input type = 'checkbox' checked = { activeFiltersBoolean.some(arrayItem => arrayItem.id === 'fruity') } onChange = { onCheckboxChangeFruity }></input>
                        <span>Fruity</span>
                    </div>
                    <div className = 'library__filter-checkbox'>
                        <input type = 'checkbox' checked = { activeFiltersBoolean.some(arrayItem => arrayItem.id === 'sweet') } onChange = { onCheckboxChangeSweet }></input>
                        <span>Sweet</span>
                    </div>
                </div>
            </div>
            <div className = 'library__content'>
                { listOfTobaccos.map((e, i) => {
                    return (
                        <Tobacco key = { i } type = { e.type } brand = { e.brand } name = { e.name } flavour = { e.flavour } ice = { e.ice } fruity = { e.fruity } sweet = { e.sweet } image = { e.image } inStock = { true }></Tobacco>
                    );
                })}
            </div>
        </div>
    );
}

export default Library;