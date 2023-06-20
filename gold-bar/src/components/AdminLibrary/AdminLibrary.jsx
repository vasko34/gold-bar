import React from 'react';
import './adminlibrary.css';
import { Firebase } from "../../global";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, getDocs, collection, setDoc } from "firebase/firestore";
import { TobaccoForAdminLibrary, ProfileOverlay, DoubleCheckOverlay, LibraryFiltersOverlay } from '../../secondary components';
import { FaUser } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';

const removeArrayItem = (arr, condition) => {
    if ((condition === 'instock') || (condition === 'ice') || (condition === 'fruity') || (condition === 'sweet')) {
        return arr.filter(arrayItem => arrayItem.id !== condition);
    } else {
        return arr.filter(arrayItem => arrayItem !== condition);
    }
};

const AdminLibrary = () => {
    const [listOfTobaccos, setListOfTobaccos] = React.useState(null);
    const [activeFiltersBoolean, setActiveFiltersBoolean] = React.useState([]);
    const [activeFiltersBrand, setActiveFiltersBrand] = React.useState([]);
    const [activeFiltersType, setActiveFiltersType] = React.useState([]);
    const [toggleProfileOverlay, setToggleProfileOverlay] = React.useState(null);
    const [toggleLibraryFiltersOverlay, setToggleLibraryFiltersOverlay] = React.useState(null);
    const [toggleDoubleCheckOverlay, setToggleDoubleCheckOverlay] = React.useState(null);
    const [delTobaccoBrand, setDelTobaccoBrand] = React.useState(null);
    const [delTobaccoName, setDelTobaccoName] = React.useState(null);
    const [user, setUser] = React.useState(null);
    const [username, setUsername] = React.useState(null);
    const [tobaccos, setTobaccos] = React.useState(null);
    const [detector, setDetector] = React.useState(true);
    const auth = getAuth(Firebase);
    const db = getFirestore(Firebase);

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
        const getTobaccoData = async () => {
            const querySnapshot = await getDocs(collection(db, "tobaccoLibrary"));
            setTobaccos(JSON.parse(querySnapshot.docs[0].data().tobaccos));
        };
        getTobaccoData();
    }, [username, detector]);

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
    }, [activeFiltersBoolean, activeFiltersBrand, activeFiltersType, tobaccos]);    

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
        setToggleDoubleCheckOverlay(false);
        setToggleProfileOverlay(true);
    };

    const closeProfileOverlay = () => {
        setToggleProfileOverlay(false);
    };

    const openLibraryFiltersOverlay = () => {
        setToggleProfileOverlay(false);
        setToggleDoubleCheckOverlay(false);
        setToggleLibraryFiltersOverlay(true);
    };

    const closeLibraryFiltersOverlay = () => {
        setToggleLibraryFiltersOverlay(false);
    };

    const openDoubleCheckOverlay = (brand, name) => {
        setToggleProfileOverlay(false);
        setToggleLibraryFiltersOverlay(false);
        setToggleDoubleCheckOverlay(true);
        setDelTobaccoBrand(brand);
        setDelTobaccoName(name);
    };

    const closeDoubleCheckOverlay = () => {
        setToggleDoubleCheckOverlay(false);
    };

    const updateStock = async (brand, name) => {
        if (brand && name) {
            let tobaccosTemp;
            const querySnapshot = await getDocs(collection(db, "tobaccoLibrary"));
            tobaccosTemp = JSON.parse(querySnapshot.docs[0].data().tobaccos);
            tobaccosTemp.forEach(e => {
                if ((e.brand === brand) && (e.name === name)) {
                    e.inStock = !e.inStock;
                }
            });
            await setDoc(querySnapshot.docs[0].ref, { tobaccos: JSON.stringify(tobaccosTemp) });
            setDetector(prevDetector => !prevDetector);
        }        
    };

    const delTobacco = async (brand, name) => {
        if (brand && name) {
            let tobaccosHolder;
            const querySnapshot = await getDocs(collection(db, "tobaccoLibrary"));
            tobaccosHolder = JSON.parse(querySnapshot.docs[0].data().tobaccos);
            let tobaccosTemp = tobaccosHolder.filter(e => !(e.brand === brand && e.name === name));
            await setDoc(querySnapshot.docs[0].ref, { tobaccos: JSON.stringify(tobaccosTemp) });
            setDetector(prevDetector => !prevDetector);
            closeDoubleCheckOverlay();
        }        
    };    

    return (
        <div className = 'adminlibrary'>
            <img src = { 'https://firebasestorage.googleapis.com/v0/b/gold-bar-4abbb.appspot.com/o/RotateNotification.png?alt=media&token=cbbbadf2-aa33-427f-8ed4-cf68a14ba9f6' } className = 'rotate_notification'></img>
            <div className = 'adminlibrary__filter'>
                <button type = 'button' onClick = { resetFilters }>Reset Filters</button>
                <div className = 'adminlibrary__filter-instock'>
                    <div className = 'adminlibrary__filter-checkbox_instock'>
                        <input type = 'checkbox' checked = { activeFiltersBoolean.some(arrayItem => arrayItem.id === 'instock') } onChange = { onCheckboxChangeInStock }></input>
                        <label>In Stock</label>
                    </div>
                </div>
                <div className = 'adminlibrary__filter-brand'>
                    <h2>Brand:</h2>
                    <div className = 'adminlibrary__filter-checkbox'>
                        <input type = 'checkbox' checked = { activeFiltersBrand.includes('Element') } onChange = { onCheckboxChangeElement }></input>
                        <label>Element</label>
                    </div>
                    <div className = 'adminlibrary__filter-checkbox'>
                        <input type = 'checkbox' checked = { activeFiltersBrand.includes('Darkside') } onChange = { onCheckboxChangeDarkside }></input>
                        <label>Darkside</label>
                    </div>
                    <div className = 'adminlibrary__filter-checkbox'>
                        <input type = 'checkbox' checked = { activeFiltersBrand.includes('Musthave') } onChange = { onCheckboxChangeMusthave }></input>
                        <label>Musthave</label>
                    </div>
                    <div className = 'adminlibrary__filter-checkbox'>
                        <input type = 'checkbox' checked = { activeFiltersBrand.includes('BlackBurn') } onChange = { onCheckboxChangeBlackBurn }></input>
                        <label>BlackBurn</label>
                    </div>
                    <div className = 'adminlibrary__filter-checkbox'>
                        <input type = 'checkbox' checked = { activeFiltersBrand.includes('Tangiers') } onChange = { onCheckboxChangeTangiers }></input>
                        <label>Tangiers</label>
                    </div>
                    <div className = 'adminlibrary__filter-checkbox'>
                        <input type = 'checkbox' checked = { activeFiltersBrand.includes('Zomo') } onChange = { onCheckboxChangeZomo }></input>
                        <label>Zomo</label>
                    </div>
                    <div className = 'adminlibrary__filter-checkbox'>
                        <input type = 'checkbox' checked = { activeFiltersBrand.includes('Holster') } onChange = { onCheckboxChangeHolster }></input>
                        <label>Holster</label>
                    </div>
                </div>
                <div className = 'adminlibrary__filter-type'>
                    <h2>Type:</h2>
                    <div className = 'adminlibrary__filter-checkbox'>
                        <input type = 'checkbox' checked = { activeFiltersType.includes('Blonde') } onChange = { onCheckboxChangeBlonde }></input>
                        <label>Blonde</label>
                    </div>
                    <div className = 'adminlibrary__filter-checkbox'>
                        <input type = 'checkbox' checked = { activeFiltersType.includes('Dark (Weak)') } onChange = { onCheckboxChangeDarkWeak }></input>
                        <label>Dark (Weak)</label>
                    </div>
                    <div className = 'adminlibrary__filter-checkbox'>
                        <input type = 'checkbox' checked = { activeFiltersType.includes('Dark') } onChange = { onCheckboxChangeDark }></input>
                        <label>Dark</label>
                    </div>
                    <div className = 'adminlibrary__filter-checkbox'>
                        <input type = 'checkbox' checked = { activeFiltersType.includes('Dark (Strong)') } onChange = { onCheckboxChangeDarkStrong }></input>
                        <label>Dark (Strong)</label>
                    </div>
                    <div className = 'adminlibrary__filter-checkbox'>
                        <input type = 'checkbox' checked = { activeFiltersType.includes('Dark (Extreme)') } onChange = { onCheckboxChangeDarkExtreme }></input>
                        <label>Dark (Extreme)</label>
                    </div>
                </div>
                <div className = 'adminlibrary__filter-boolean'>
                    <h2>Flavour:</h2>
                    <div className = 'adminlibrary__filter-checkbox'>
                        <input type = 'checkbox' checked = { activeFiltersBoolean.some(arrayItem => arrayItem.id === 'ice') } onChange = { onCheckboxChangeIce }></input>
                        <label>Ice</label>
                    </div>
                    <div className = 'adminlibrary__filter-checkbox'>
                        <input type = 'checkbox' checked = { activeFiltersBoolean.some(arrayItem => arrayItem.id === 'fruity') } onChange = { onCheckboxChangeFruity }></input>
                        <label>Fruity</label>
                    </div>
                    <div className = 'adminlibrary__filter-checkbox'>
                        <input type = 'checkbox' checked = { activeFiltersBoolean.some(arrayItem => arrayItem.id === 'sweet') } onChange = { onCheckboxChangeSweet }></input>
                        <label>Sweet</label>
                    </div>
                </div>
            </div>
            <div className = 'adminlibrary__content'>                
                {
                    (listOfTobaccos) ? ((listOfTobaccos.length > 0) ? (listOfTobaccos.map((e, i) => {
                        return (
                            <TobaccoForAdminLibrary key = { i } type = { e.type } brand = { e.brand } name = { e.name } flavour = { e.flavour } ice = { e.ice } fruity = { e.fruity } sweet = { e.sweet } image = { e.image } inStock = { e.inStock } update = { () => updateStock(e.brand, e.name) } del = { () => openDoubleCheckOverlay(e.brand, e.name) }></TobaccoForAdminLibrary>
                        );
                    })) : (<h5>No results found</h5>)) : null
                }                
            </div>  
            <div className = 'profile' onClick = { openProfileOverlay }>
                <FaUser className = 'profileicon'></FaUser>
                <h3>{ username }</h3>
            </div>     
            <GiHamburgerMenu className = 'showfilters' onClick = { openLibraryFiltersOverlay }></GiHamburgerMenu>     
            { toggleProfileOverlay && (<ProfileOverlay close = { closeProfileOverlay } library = { true }></ProfileOverlay>) }
            { toggleLibraryFiltersOverlay && (<LibraryFiltersOverlay close = { closeLibraryFiltersOverlay } resetFilters = { resetFilters } onCheckboxChangeInStock = { onCheckboxChangeInStock } onCheckboxChangeElement = { onCheckboxChangeElement } onCheckboxChangeDarkside = { onCheckboxChangeDarkside } onCheckboxChangeMusthave = { onCheckboxChangeMusthave } onCheckboxChangeBlackBurn = { onCheckboxChangeBlackBurn } onCheckboxChangeTangiers = { onCheckboxChangeTangiers } onCheckboxChangeZomo = { onCheckboxChangeZomo } onCheckboxChangeHolster = { onCheckboxChangeHolster } onCheckboxChangeBlonde = { onCheckboxChangeBlonde } onCheckboxChangeDarkWeak = { onCheckboxChangeDarkWeak } onCheckboxChangeDark = { onCheckboxChangeDark } onCheckboxChangeDarkStrong = { onCheckboxChangeDarkStrong } onCheckboxChangeDarkExtreme = { onCheckboxChangeDarkExtreme } onCheckboxChangeIce = { onCheckboxChangeIce } onCheckboxChangeFruity = { onCheckboxChangeFruity } onCheckboxChangeSweet = { onCheckboxChangeSweet } activeFiltersBoolean = { activeFiltersBoolean } activeFiltersBrand = { activeFiltersBrand } activeFiltersType = { activeFiltersType }></LibraryFiltersOverlay>) }
            { toggleDoubleCheckOverlay && (<DoubleCheckOverlay close = { closeDoubleCheckOverlay } del = { () => delTobacco(delTobaccoBrand, delTobaccoName) }></DoubleCheckOverlay>) }
        </div>
    );
};

export default AdminLibrary;