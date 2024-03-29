import React from 'react';
import './library.css';
import { useNavigate } from 'react-router-dom';
import { Firebase, LoginTimeoutInMinutes } from "../../global";
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc, getDocs, collection } from "firebase/firestore";
import { TobaccoForLibrary, ProfileOverlay, OrderOverlay, LibraryFiltersOverlay } from '../../secondary components';
import { FaUser } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';

const removeArrayItem = (arr, condition) => {
    if ((condition === 'instock') || (condition === 'ice') || (condition === 'fruity') || (condition === 'sweet')) {
        return arr.filter(arrayItem => arrayItem.id !== condition);
    } else {
        return arr.filter(arrayItem => arrayItem !== condition);
    }
};

const Library = () => {
    const navigate = useNavigate();
    const [tobaccoForOverlayBrand, setTobaccoForOverlayBrand] = React.useState('');
    const [tobaccoForOverlayName, setTobaccoForOverlayName] = React.useState('');
    const [listOfTobaccos, setListOfTobaccos] = React.useState(null);
    const [activeFiltersBoolean, setActiveFiltersBoolean] = React.useState([]);
    const [activeFiltersBrand, setActiveFiltersBrand] = React.useState([]);
    const [activeFiltersType, setActiveFiltersType] = React.useState([]);
    const [toggleProfileOverlay, setToggleProfileOverlay] = React.useState(null);
    const [toggleLibraryFiltersOverlay, setToggleLibraryFiltersOverlay] = React.useState(null);
    const [toggleOrderOverlay, setToggleOrderOverlay] = React.useState(null);
    const [isOpen, setIsOpen] = React.useState(false);
    const [user, setUser] = React.useState(null);
    const [username, setUsername] = React.useState(null);
    const [tobaccos, setTobaccos] = React.useState(null);
    const auth = getAuth(Firebase);
    const db = getFirestore(Firebase);

    React.useEffect(() => {
        const getTobaccoData = async () => {
            const querySnapshot = await getDocs(collection(db, "tobaccoLibrary"));
            setTobaccos(JSON.parse(querySnapshot.docs[0].data().tobaccos));
        };
        getTobaccoData();
    }, []);

    React.useEffect(() => {
        setListOfTobaccos(tobaccos);
    }, [tobaccos]);

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
            setActiveFiltersBoolean(removeArrayItem(activeFiltersBoolean, 'instock'));
        } else {
            setActiveFiltersBoolean(activeFiltersBoolean.concat(filter));
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
            setActiveFiltersBoolean(removeArrayItem(activeFiltersBoolean, 'ice'));
        } else {
            setActiveFiltersBoolean(activeFiltersBoolean.concat(filter));
        }
    };

    const onCheckboxChangeFruity = () => {
        const filter = {
            id: 'fruity',
            conditionFn: arrayItem => arrayItem.fruity === true
        };

        if (activeFiltersBoolean.some(arrayItem => arrayItem.id === 'fruity')) {
            setActiveFiltersBoolean(removeArrayItem(activeFiltersBoolean, 'fruity'));
        } else {
            setActiveFiltersBoolean(activeFiltersBoolean.concat(filter));
        }
    };

    const onCheckboxChangeSweet = () => {
        const filter = {
            id: 'sweet',
            conditionFn: arrayItem => arrayItem.sweet === true
        };

        if (activeFiltersBoolean.some(arrayItem => arrayItem.id === 'sweet')) {
            setActiveFiltersBoolean(removeArrayItem(activeFiltersBoolean, 'sweet'));
        } else {
            setActiveFiltersBoolean(activeFiltersBoolean.concat(filter));
        }
    };

    const resetFilters = () => {
        setActiveFiltersBoolean([]);
        setActiveFiltersBrand([]);
        setActiveFiltersType([]);
    };

    const openProfileOverlay = () => {
        setToggleLibraryFiltersOverlay(false);
        setToggleOrderOverlay(false);
        setIsOpen(false);
        setToggleProfileOverlay(true);
    };

    const closeProfileOverlay = () => {
        setToggleProfileOverlay(false);
    };

    const openLibraryFiltersOverlay = () => {
        setToggleProfileOverlay(false);
        setToggleOrderOverlay(false);
        setIsOpen(false);
        setToggleLibraryFiltersOverlay(true);
    };

    const closeLibraryFiltersOverlay = () => {
        setToggleLibraryFiltersOverlay(false);
    };

    const openOrderOverlay = (brand, name, inStock) => {
        if (!isOpen) {
            if (inStock === true) {
                setToggleProfileOverlay(false);
                setToggleLibraryFiltersOverlay(false);
                setToggleOrderOverlay(true);
                setTobaccoForOverlayBrand(brand);
                setTobaccoForOverlayName(name);
                setIsOpen(true);
            }
        }        
    };

    const closeOrderOverlay = () => {
        setToggleOrderOverlay(false);
        setIsOpen(false);
    };    

    const handleLogOut = () => {
        signOut(auth);
        localStorage.removeItem('loginTime');
        navigate('/');
    };

    React.useEffect(() => {
        const loginTime = localStorage.getItem('loginTime');
        if (user && loginTime) {
            const timeoutMilliseconds = LoginTimeoutInMinutes * 60 * 1000;
            const elapsedTime = new Date().getTime() - parseInt(loginTime);
            if (elapsedTime < timeoutMilliseconds) {
                const timeoutId = setTimeout(handleLogOut, timeoutMilliseconds - elapsedTime);
                return () => clearTimeout(timeoutId);
            } else {
                handleLogOut();
            }
        }
    }, [user]);

    return (
        <div className = 'library'>
            <img src = { 'https://firebasestorage.googleapis.com/v0/b/gold-bar-4abbb.appspot.com/o/RotateNotification.png?alt=media&token=cbbbadf2-aa33-427f-8ed4-cf68a14ba9f6' } className = 'rotate_notification'></img>
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
                    (listOfTobaccos) ? ((listOfTobaccos.length > 0) ? (listOfTobaccos.map((e, i) => {
                        return (
                            <TobaccoForLibrary key = { i } type = { e.type } brand = { e.brand } name = { e.name } flavour = { e.flavour } ice = { e.ice } fruity = { e.fruity } sweet = { e.sweet } image = { e.image } inStock = { e.inStock } open = { () => openOrderOverlay(e.brand, e.name, e.inStock) }></TobaccoForLibrary>
                        );
                    })) : (<h5>No results found</h5>)) : null
                }                
            </div>  
            <div className = 'profile' onClick = { openProfileOverlay }>
                <FaUser className = 'profileicon'></FaUser>
                <h3>{ username }</h3>
            </div>   
            <GiHamburgerMenu className = 'showfilters' onClick = { openLibraryFiltersOverlay }></GiHamburgerMenu>       
            { toggleOrderOverlay && (<OrderOverlay close = { closeOrderOverlay } brand = { tobaccoForOverlayBrand } name = { tobaccoForOverlayName }></OrderOverlay>) }
            { toggleLibraryFiltersOverlay && (<LibraryFiltersOverlay close = { closeLibraryFiltersOverlay } resetFilters = { resetFilters } onCheckboxChangeInStock = { onCheckboxChangeInStock } onCheckboxChangeElement = { onCheckboxChangeElement } onCheckboxChangeDarkside = { onCheckboxChangeDarkside } onCheckboxChangeMusthave = { onCheckboxChangeMusthave } onCheckboxChangeBlackBurn = { onCheckboxChangeBlackBurn } onCheckboxChangeTangiers = { onCheckboxChangeTangiers } onCheckboxChangeZomo = { onCheckboxChangeZomo } onCheckboxChangeHolster = { onCheckboxChangeHolster } onCheckboxChangeBlonde = { onCheckboxChangeBlonde } onCheckboxChangeDarkWeak = { onCheckboxChangeDarkWeak } onCheckboxChangeDark = { onCheckboxChangeDark } onCheckboxChangeDarkStrong = { onCheckboxChangeDarkStrong } onCheckboxChangeDarkExtreme = { onCheckboxChangeDarkExtreme } onCheckboxChangeIce = { onCheckboxChangeIce } onCheckboxChangeFruity = { onCheckboxChangeFruity } onCheckboxChangeSweet = { onCheckboxChangeSweet } activeFiltersBoolean = { activeFiltersBoolean } activeFiltersBrand = { activeFiltersBrand } activeFiltersType = { activeFiltersType }></LibraryFiltersOverlay>) }
            { toggleProfileOverlay && (<ProfileOverlay close = { closeProfileOverlay } library = { true }></ProfileOverlay>) }
        </div>
    );
};

export default Library;