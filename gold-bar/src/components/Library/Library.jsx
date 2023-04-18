import React from 'react';
import { Firebase } from "../../global";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import './library.css';
import { Tobacco, ProfileOverlay, OrderOverlay } from '../../secondary components';
import { tobaccos } from '../../constants';
import { FaUser } from 'react-icons/fa';

const removeArrayItem = (arr, condition) => {
    if ((condition === 'instock') || (condition === 'ice') || (condition === 'fruity') || (condition === 'sweet')) {
        return arr.filter(arrayItem => arrayItem.id !== condition);
    } else {
        return arr.filter(arrayItem => arrayItem !== condition);
    }
};

const Library = () => {
    const [tobaccoForOverlayBrand, setTobaccoForOverlayBrand] = React.useState('');
    const [tobaccoForOverlayName, setTobaccoForOverlayName] = React.useState('');
    const [listOfTobaccos, setListOfTobaccos] = React.useState(tobaccos);
    const [activeFiltersBoolean, setActiveFiltersBoolean] = React.useState([]);
    const [activeFiltersBrand, setActiveFiltersBrand] = React.useState([]);
    const [activeFiltersType, setActiveFiltersType] = React.useState([]);
    const [toggleProfileOverlay, setToggleProfileOverlay] = React.useState(null);
    const [toggleOrderOverlay, setToggleOrderOverlay] = React.useState(null);
    const [user, setUser] = React.useState(null);
    const [username, setUsername] = React.useState(null);
    const auth = getAuth(Firebase);
    const db = getFirestore(Firebase);

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        return unsubscribe;
    }, [auth]);
  
    React.useEffect(() => {
        const getUsername = async () => {
            if (!user) return;
            const userDoc = await getDoc(doc(db, "users", user.uid));
            const username = userDoc.data().username;
            setUsername(username);
        };
        getUsername();
    }, [user]);

    const openProfileOverlay = () => {
        setToggleProfileOverlay(true);
    }

    const closeProfileOverlay = () => {
        setToggleProfileOverlay(false);
    }

    const openOrderOverlay = (brand, name, inStock) => {
        if (inStock === true) {
            setToggleOrderOverlay(true);
            setTobaccoForOverlayBrand(brand);
            setTobaccoForOverlayName(name);
        }
    }

    const closeOrderOverlay = () => {
        setToggleOrderOverlay(false);
    }

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
                    <div className = 'library__filter-checkbox_instock'>
                        <input type = 'checkbox' checked = { activeFiltersBoolean.some(arrayItem => arrayItem.id === 'instock') } onChange = { onCheckboxChangeInStock }></input>
                        <label>In Stock</label>
                    </div>
                </div>
                <div className = 'library__filter-brand'>
                    <h2>Brand:</h2>
                    <div className = 'library__filter-checkbox'>
                        <input type = 'checkbox' checked = { activeFiltersBrand.includes('Element') } onChange = { onCheckboxChangeElement }></input>
                        <label>Element</label>
                    </div>
                    <div className = 'library__filter-checkbox'>
                        <input type = 'checkbox' checked = { activeFiltersBrand.includes('Darkside') } onChange = { onCheckboxChangeDarkside }></input>
                        <label>Darkside</label>
                    </div>
                    <div className = 'library__filter-checkbox'>
                        <input type = 'checkbox' checked = { activeFiltersBrand.includes('Musthave') } onChange = { onCheckboxChangeMusthave }></input>
                        <label>Musthave</label>
                    </div>
                    <div className = 'library__filter-checkbox'>
                        <input type = 'checkbox' checked = { activeFiltersBrand.includes('BlackBurn') } onChange = { onCheckboxChangeBlackBurn }></input>
                        <label>BlackBurn</label>
                    </div>
                    <div className = 'library__filter-checkbox'>
                        <input type = 'checkbox' checked = { activeFiltersBrand.includes('Tangiers') } onChange = { onCheckboxChangeTangiers }></input>
                        <label>Tangiers</label>
                    </div>
                    <div className = 'library__filter-checkbox'>
                        <input type = 'checkbox' checked = { activeFiltersBrand.includes('Zomo') } onChange = { onCheckboxChangeZomo }></input>
                        <label>Zomo</label>
                    </div>
                    <div className = 'library__filter-checkbox'>
                        <input type = 'checkbox' checked = { activeFiltersBrand.includes('Holster') } onChange = { onCheckboxChangeHolster }></input>
                        <label>Holster</label>
                    </div>
                </div>
                <div className = 'library__filter-type'>
                    <h2>Type:</h2>
                    <div className = 'library__filter-checkbox'>
                        <input type = 'checkbox' checked = { activeFiltersType.includes('Blonde') } onChange = { onCheckboxChangeBlonde }></input>
                        <label>Blonde</label>
                    </div>
                    <div className = 'library__filter-checkbox'>
                        <input type = 'checkbox' checked = { activeFiltersType.includes('Dark (Weak)') } onChange = { onCheckboxChangeDarkWeak }></input>
                        <label>Dark (Weak)</label>
                    </div>
                    <div className = 'library__filter-checkbox'>
                        <input type = 'checkbox' checked = { activeFiltersType.includes('Dark') } onChange = { onCheckboxChangeDark }></input>
                        <label>Dark</label>
                    </div>
                    <div className = 'library__filter-checkbox'>
                        <input type = 'checkbox' checked = { activeFiltersType.includes('Dark (Strong)') } onChange = { onCheckboxChangeDarkStrong }></input>
                        <label>Dark (Strong)</label>
                    </div>
                    <div className = 'library__filter-checkbox'>
                        <input type = 'checkbox' checked = { activeFiltersType.includes('Dark (Extreme)') } onChange = { onCheckboxChangeDarkExtreme }></input>
                        <label>Dark (Extreme)</label>
                    </div>
                </div>
                <div className = 'library__filter-boolean'>
                    <h2>Flavour:</h2>
                    <div className = 'library__filter-checkbox'>
                        <input type = 'checkbox' checked = { activeFiltersBoolean.some(arrayItem => arrayItem.id === 'ice') } onChange = { onCheckboxChangeIce }></input>
                        <label>Ice</label>
                    </div>
                    <div className = 'library__filter-checkbox'>
                        <input type = 'checkbox' checked = { activeFiltersBoolean.some(arrayItem => arrayItem.id === 'fruity') } onChange = { onCheckboxChangeFruity }></input>
                        <label>Fruity</label>
                    </div>
                    <div className = 'library__filter-checkbox'>
                        <input type = 'checkbox' checked = { activeFiltersBoolean.some(arrayItem => arrayItem.id === 'sweet') } onChange = { onCheckboxChangeSweet }></input>
                        <label>Sweet</label>
                    </div>
                </div>
            </div>
            <div className = 'library__content'>
                {
                    (listOfTobaccos.length > 0) ? (listOfTobaccos.map((e, i) => {
                        return (
                            <Tobacco key = { i } type = { e.type } brand = { e.brand } name = { e.name } flavour = { e.flavour } ice = { e.ice } fruity = { e.fruity } sweet = { e.sweet } image = { e.image } inStock = { e.inStock } open = { () => openOrderOverlay(e.brand, e.name, e.inStock) }></Tobacco>
                        );
                    })) : (<h5>No results found</h5>)
                }
            </div>
            <div className = 'profile' onClick = { openProfileOverlay }>
                <FaUser className = 'profileicon'></FaUser>
                <h3>{ username }</h3>
            </div>
            { toggleOrderOverlay && (<OrderOverlay close = { closeOrderOverlay } brand = { tobaccoForOverlayBrand } name = { tobaccoForOverlayName }></OrderOverlay>) }
            { toggleProfileOverlay && (<ProfileOverlay close = { closeProfileOverlay } library = { true }></ProfileOverlay>) }
        </div>
    );
}

export default Library;