import React, { useEffect } from 'react';
import './library.css';
import { Tobacco } from '../../secondary components';
import { tobaccos } from '../../constants';

const removeElement = (arr, conditionFn) => {
    return arr.filter(conditionFn);
};

const Library = () => {
    const [isCheckedDarkside, setIsCheckedDarkside] = React.useState(false);
    const [isCheckedMusthave, setIsCheckedMusthave] = React.useState(false);
    const [isCheckedBlackBurn, setIsCheckedBlackBurn] = React.useState(false);
    const [isCheckedTangiers, setIsCheckedTangiers] = React.useState(false);
    const [isCheckedZomo, setIsCheckedZomo] = React.useState(false);
    const [isCheckedHolster, setIsCheckedHolster] = React.useState(false);
    const [isCheckedDarkWeak, setIsCheckedDarkWeak] = React.useState(false);
    const [isCheckedDark, setIsCheckedDark] = React.useState(false);
    const [isCheckedDarkStrong, setIsCheckedDarkStrong] = React.useState(false);
    const [isCheckedDarkExtreme, setIsCheckedDarkExtreme] =React.useState(false);
    const [isCheckedIce, setIsCheckedIce] = React.useState(false);
    const [isCheckedFruity, setIsCheckedFruity] = React.useState(false);
    const [isCheckedSweet, setIsCheckedSweet] = React.useState(false);
    const [isCheckedInStock, setIsCheckedInStock] = React.useState(false);

    const [listOfTobaccos, setListOfTobaccos] = React.useState(tobaccos);
    const [activeFilters, setActiveFilters] = React.useState([]);
    const [activeFiltersBrand, setActiveFiltersBrand] = React.useState([]);

    const resetFilters = () => {
        setActiveFilters([]);
    };

        
    const undoFilter = () => {
        resetFilters();
    };

    useEffect(() => {  
        let arr = tobaccos;
        activeFilters.forEach(element => {
            arr = arr.filter(element.conditionFn);
        });
        if (activeFiltersBrand.length !== 0) {
            arr = arr.filter(element => activeFiltersBrand.includes(element.brand.split(' ')[0]));
        }
        setListOfTobaccos(arr);
    }, [activeFilters, activeFiltersBrand]);

    const filterDarkWeak = () => {
        const filteredArray = listOfTobaccos.filter((tobacco) => {
            return (tobacco.type === 'Dark (Weak)');
        });
        setListOfTobaccos(filteredArray);
    };

    const filterDark = () => {
        const filteredArray = listOfTobaccos.filter((tobacco) => {
            return (tobacco.type === 'Dark');
        });
        setListOfTobaccos(filteredArray);
    };

    const filterDarkStrong = () => {
        const filteredArray = listOfTobaccos.filter((tobacco) => {
            return (tobacco.type === 'Dark (Strong)');
        });
        setListOfTobaccos(filteredArray);
    };

    const filterDarkExtreme = () => {
        const filteredArray = listOfTobaccos.filter((tobacco) => {
            return (tobacco.type === 'Dark (Extreme)');
        });
        setListOfTobaccos(filteredArray);
    };

    const filterElement = () => {
        const filteredArray = listOfTobaccos.filter((tobacco) => {
            return ((tobacco.brand === 'Element Air') || (tobacco.brand === 'Element Water') || (tobacco.brand === 'Element Earth'));
        });
        setListOfTobaccos(filteredArray);
    };

    const filterDarkside = () => {
        const filteredArray = listOfTobaccos.filter((tobacco) => {
            return ((tobacco.brand === 'Darkside Base') || (tobacco.brand === 'Darkside Core'));
        });
        setListOfTobaccos(filteredArray);
    };

    const filterMusthave = () => {
        const filteredArray = listOfTobaccos.filter((tobacco) => {
            return (tobacco.brand === 'Musthave');
        });
        setListOfTobaccos(filteredArray);
    };

    const filterBlackBurn = () => {
        const filteredArray = listOfTobaccos.filter((tobacco) => {
            return (tobacco.brand === 'BlackBurn');
        });
        setListOfTobaccos(filteredArray);
    };

    const filterZomo = () => {
        const filteredArray = listOfTobaccos.filter((tobacco) => {
            return (tobacco.brand === 'Zomo');
        });
        setListOfTobaccos(filteredArray);
    };

    const filterHolster = () => {
        const filteredArray = listOfTobaccos.filter((tobacco) => {
            return (tobacco.brand === 'Holster');
        });
        setListOfTobaccos(filteredArray);
    };

    const filterTangiers = () => {
        const filteredArray = listOfTobaccos.filter((tobacco) => {
            return ((tobacco.brand === 'Tangiers Noir') || (tobacco.brand === 'Tangiers Burley'));
        });
        setListOfTobaccos(filteredArray);
    };

    const filterIce = () => {
        const filteredArray = listOfTobaccos.filter((tobacco) => {
            return (tobacco.ice === true);
        });
        setListOfTobaccos(filteredArray);
    };

    const filterFruity = () => {
        const filteredArray = listOfTobaccos.filter((tobacco) => {
            return (tobacco.fruity === true);
        });
        setListOfTobaccos(filteredArray);
    };

    const filterSweet = () => {
        const filteredArray = listOfTobaccos.filter((tobacco) => {
            return (tobacco.sweet === true);
        });
        setListOfTobaccos(filteredArray);
    };

    const filterInStock = () => {
        const filteredArray = listOfTobaccos.filter((tobacco) => {
            return (tobacco.inStock === true);
        });
        setListOfTobaccos(filteredArray);
    };


    const onCheckboxChangeInStock = () => {
        if (isCheckedInStock === true) {
            setIsCheckedInStock(false);
            undoFilter();
        } else {
            setIsCheckedInStock(true);
            filterInStock();
        }
    };

    const onCheckboxChangeElement = () => {
        if (activeFiltersBrand.includes('Element')) {
            setActiveFiltersBrand(removeElement(activeFiltersBrand, (element) => element !== 'Element'));
        } else {
            setActiveFiltersBrand(activeFiltersBrand.concat('Element'));
        }
    };

    const onCheckboxChangeDarkside = () => {
        if (isCheckedDarkside === true) {
            setIsCheckedDarkside(false);
            undoFilter();
        } else {
            setIsCheckedDarkside(true);
            filterDarkside();
        }
    };

    const onCheckboxChangeMusthave = () => {
        if (isCheckedMusthave === true) {
            setIsCheckedMusthave(false);
            undoFilter();
        } else {
            setIsCheckedMusthave(true);
            filterMusthave();
        }
    };

    const onCheckboxChangeBlackBurn = () => {
        if (isCheckedBlackBurn === true) {
            setIsCheckedBlackBurn(false);
            undoFilter();
        } else {
            setIsCheckedBlackBurn(true);
            filterBlackBurn();
        }
    };

    const onCheckboxChangeTangiers = () => {
        if (isCheckedTangiers === true) {
            setIsCheckedTangiers(false);
            undoFilter();
        } else {
            setIsCheckedTangiers(true);
            filterTangiers();
        }
    };

    const onCheckboxChangeZomo = () => {
        if (isCheckedZomo === true) {
            setIsCheckedZomo(false);
            undoFilter();
        } else {
            setIsCheckedZomo(true);
            filterZomo();
        }
    };

    const onCheckboxChangeHolster = () => {
        if (isCheckedHolster === true) {
            setIsCheckedHolster(false);
            undoFilter();
        } else {
            setIsCheckedHolster(true);
            filterHolster();
        }
    };

    const onCheckboxChangeBlonde = () => {
        const filter = {
            id: "blonde",
            conditionFn: (element) => element.type === 'Blonde'
        };

        if (activeFilters.some(element => element.id === 'blonde')) {
            setActiveFilters(activeFilters.filter(element => element.id !== "blonde"))
        } else {
            setActiveFilters(activeFilters.concat(filter))
        }
    };

    const onCheckboxChangeDarkWeak = (e) => {
        const checked = e.target.checked;
        setIsCheckedDarkWeak(checked);
        if (checked === false) {
            undoFilter();
        } else {
            filterDarkWeak();
        }
    };

    const onCheckboxChangeDark = () => {
        if (isCheckedDark === true) {
            setIsCheckedDark(false);
            undoFilter();
        } else {
            setIsCheckedDark(true);
            filterDark();
        }
    };

    const onCheckboxChangeDarkStrong = () => {
        if (isCheckedDarkStrong === true) {
            setIsCheckedDarkStrong(false);
            undoFilter();
        } else {
            setIsCheckedDarkStrong(true);
            filterDarkStrong();
        }
    };

    const onCheckboxChangeDarkExtreme = () => {
        if (isCheckedDarkExtreme === true) {
            setIsCheckedDarkExtreme(false);
            undoFilter();
        } else {
            setIsCheckedDarkExtreme(true);
            filterDarkExtreme();
        }
    };

    const onCheckboxChangeIce = () => {
        if (isCheckedIce === true) {
            setIsCheckedIce(false);
            undoFilter();
        } else {
            setIsCheckedIce(true);
            filterIce();
        }
    };

    const onCheckboxChangeFruity = () => {
        if (isCheckedFruity === true) {
            setIsCheckedFruity(false);
            undoFilter();
        } else {
            setIsCheckedFruity(true);
            filterFruity();
        }
    };

    const onCheckboxChangeSweet = (e) => {
        const checked = e.target.checked;
        setIsCheckedSweet(checked);
        if (checked === false) {
            undoFilter();
        } else {
            filterSweet();
        }
    };

    return (
        <div className = 'library'>
            <div className = 'library__filter'>
                <button type = 'button' onClick = { resetFilters }>Reset Filters</button>
                <div className = 'library__filter-instock'>
                    <div className = 'library__filter-checkbox'>
                        <input type = 'checkbox' checked = { isCheckedInStock } onChange = { onCheckboxChangeInStock }></input>
                        <span>In Stock</span>
                    </div>
                </div>
                <div className = 'library__filter-brand'>
                    <div className = 'library__filter-checkbox'>
                        <input type = 'checkbox' checked = { activeFiltersBrand.some((element) => element === 'Element') } onChange = { onCheckboxChangeElement }></input>
                        <span>Element</span>
                    </div>
                    <div className = 'library__filter-checkbox'>
                        <input type = 'checkbox' checked = { isCheckedDarkside } onChange = { onCheckboxChangeDarkside }></input>
                        <span>Darkside</span>
                    </div>
                    <div className = 'library__filter-checkbox'>
                        <input type = 'checkbox' checked = { isCheckedMusthave } onChange = { onCheckboxChangeMusthave }></input>
                        <span>Musthave</span>
                    </div>
                    <div className = 'library__filter-checkbox'>
                        <input type = 'checkbox' checked = { isCheckedBlackBurn } onChange = { onCheckboxChangeBlackBurn }></input>
                        <span>BlackBurn</span>
                    </div>
                    <div className = 'library__filter-checkbox'>
                        <input type = 'checkbox' checked = { isCheckedTangiers } onChange = { onCheckboxChangeTangiers }></input>
                        <span>Tangiers</span>
                    </div>
                    <div className = 'library__filter-checkbox'>
                        <input type = 'checkbox' checked = { isCheckedZomo } onChange = { onCheckboxChangeZomo }></input>
                        <span>Zomo</span>
                    </div>
                    <div className = 'library__filter-checkbox'>
                        <input type = 'checkbox' checked = { isCheckedHolster } onChange = { onCheckboxChangeHolster }></input>
                        <span>Holster</span>
                    </div>
                </div>
                <div className = 'library__filter-type'>
                    <div className = 'library__filter-checkbox'>
                        <input type = 'checkbox' checked = { activeFilters.some((element) => element.id === 'blonde') } onChange = { onCheckboxChangeBlonde }></input>
                        <span>Blonde</span>
                    </div>
                    <div className = 'library__filter-checkbox'>
                        <input type = 'checkbox' checked = { isCheckedDarkWeak } onChange = { (e) => onCheckboxChangeDarkWeak(e) }></input>
                        <span>Dark (Weak)</span>
                    </div>
                    <div className = 'library__filter-checkbox'>
                        <input type = 'checkbox' checked = { isCheckedDark } onChange = { onCheckboxChangeDark }></input>
                        <span>Dark</span>
                    </div>
                    <div className = 'library__filter-checkbox'>
                        <input type = 'checkbox' checked = { isCheckedDarkStrong } onChange = { onCheckboxChangeDarkStrong }></input>
                        <span>Dark (Strong)</span>
                    </div>
                    <div className = 'library__filter-checkbox'>
                        <input type = 'checkbox' checked = { isCheckedDarkExtreme } onChange = { onCheckboxChangeDarkExtreme }></input>
                        <span>Dark (Extreme)</span>
                    </div>
                </div>
                <div className = 'library__filter-boolean'>
                    <div className = 'library__filter-checkbox'>
                        <input type = 'checkbox' checked = { isCheckedIce } onChange = { onCheckboxChangeIce }></input>
                        <span>Ice</span>
                    </div>
                    <div className = 'library__filter-checkbox'>
                        <input type = 'checkbox' checked = { isCheckedFruity } onChange = { onCheckboxChangeFruity }></input>
                        <span>Fruity</span>
                    </div>
                    <div className = 'library__filter-checkbox'>
                        <input type = 'checkbox' checked = { isCheckedSweet } onChange = { (e) => onCheckboxChangeSweet(e) }></input>
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