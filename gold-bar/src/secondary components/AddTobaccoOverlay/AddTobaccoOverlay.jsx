import React from 'react';
import './addtobaccooverlay.css';
import { Firebase } from "../../global";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import { EligibleTobaccoInfoOverlay } from '../index.js';
import { FaTimes } from 'react-icons/fa';

const AddTobaccoOverlay = ({ close }) => {
    const [toggleEligibleTobaccoInfoOverlay, setToggleEligibleTobaccoInfoOverlay] = React.useState(null);
    const [currentInputType, setCurrentInputType] = React.useState(null);
    const [currentInputBrand, setCurrentInputBrand] = React.useState(null);
    const [currentInputName, setCurrentInputName] = React.useState(null);
    const [currentInputFlavour, setCurrentInputFlavour] = React.useState(null);
    const [currentInputIce, setCurrentInputIce] = React.useState(null);
    const [currentInputFruity, setCurrentInputFruity] = React.useState(null);
    const [currentInputSweet, setCurrentInputSweet] = React.useState(null);
    const [currentInputInStock, setCurrentInputInStock] = React.useState(null);
    const [types, setTypes] = React.useState(null);
    const [brands, setBrands] = React.useState(null);
    const [typeError, setTypeError] = React.useState(false);
    const [brandError, setBrandError] = React.useState(false);
    const [nameError, setNameError] = React.useState(false);
    const [flavourError, setFlavourError] = React.useState(false);
    const db = getFirestore(Firebase);

    const openEligibleTobaccoInfoOverlay = () => {
        setToggleEligibleTobaccoInfoOverlay(true);
    };

    const closeEligibleTobaccoInfoOverlay = () => {
        setToggleEligibleTobaccoInfoOverlay(false);
    };

    const add = (type, brand, name, flavour, ice, fruity, sweet, inStock) => {
        setTypeError(false);
        setBrandError(false);
        setNameError(false);
        setFlavourError(false);

        if (!types.includes(type)) {
            setTypeError(true);
        }
        if (!brands.includes(brand)) {
            setBrandError(true);
        }
        if (name === null) {
            setNameError(true);
        }
        if (flavour === null) {
            setFlavourError(true);
        }
    };

    React.useEffect(() => {
        const getEligibleTobaccoInfo = async () => {
            const querySnapshot = await getDocs(collection(db, "eligibleTobaccoInfo"));
            setTypes(JSON.parse(querySnapshot.docs[0].data().eligibleTypes));
            setBrands(JSON.parse(querySnapshot.docs[0].data().eligibleBrands));
        };
        getEligibleTobaccoInfo();
    }, []);

    return (
        <div className = 'addtobaccooverlay'>
            <div className = 'addtobaccooverlay__normalinput'>
                <h1>Add New Tobacco</h1>
                <input placeholder = 'Enter Tobacco Type' value = { currentInputType } onChange = { (e) => setCurrentInputType(e.target.value) }></input>
                <input placeholder = 'Enter Tobacco Brand' value = { currentInputBrand } onChange = { (e) => setCurrentInputBrand(e.target.value) }></input>
                <input placeholder = 'Enter Tobacco Name' value = { currentInputName } onChange = { (e) => setCurrentInputName(e.target.value) }></input>
                <input placeholder = 'Enter Tobacco Flavour' value = { currentInputFlavour } onChange = { (e) => setCurrentInputFlavour(e.target.value) }></input>
            </div>
            <div className = 'addtobaccooverlay__checkboxes'>
                <div className = 'addtobaccooverlay__checkboxes-checkbox'>
                    <label>Ice</label>
                    <input type = 'checkbox' checked = { currentInputIce } onChange = { () => setCurrentInputIce(previsChecked => !previsChecked) }></input>
                </div>
                <div className = 'addtobaccooverlay__checkboxes-checkbox'>
                    <label>Fruity</label>
                    <input type = 'checkbox' checked = { currentInputFruity } onChange = { () => setCurrentInputFruity(previsChecked => !previsChecked) }></input>
                </div>
                <div className = 'addtobaccooverlay__checkboxes-checkbox'>
                    <label>Sweet</label>
                    <input type = 'checkbox' checked = { currentInputSweet } onChange = { () => setCurrentInputSweet(previsChecked => !previsChecked) }></input>
                </div>
                <div className = 'addtobaccooverlay__checkboxes-checkbox'>
                    <label>In Stock</label>
                    <input type = 'checkbox' checked = { currentInputInStock } onChange = { () => setCurrentInputInStock(previsChecked => !previsChecked) }></input>
                </div>
            </div>
            { typeError && (<p>Ineligible type!</p>) }
            { brandError && (<p>Ineligible brand!</p>) }
            { nameError && (<p>The name can't be empty!</p>) }
            { flavourError && (<p>The flavour can't be empty!</p>) }
            <button type = 'button' onClick = { () => add(currentInputType, currentInputBrand, currentInputName, currentInputFlavour, currentInputIce, currentInputFruity, currentInputSweet, currentInputInStock) }>Add</button>
            <FaTimes onClick = { close } className = 'close'></FaTimes>  
            <h3 onClick = { openEligibleTobaccoInfoOverlay }>Info</h3>   
            { toggleEligibleTobaccoInfoOverlay && (<EligibleTobaccoInfoOverlay typesInfo = { types } brandsInfo = { brands } close = { closeEligibleTobaccoInfoOverlay }></EligibleTobaccoInfoOverlay>) }       
        </div>
    );
}

export default AddTobaccoOverlay;