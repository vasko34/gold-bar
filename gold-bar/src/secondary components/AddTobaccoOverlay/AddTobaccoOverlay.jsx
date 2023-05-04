import React from 'react';
import './addtobaccooverlay.css';
import { Firebase } from "../../global";
import { getFirestore, getDocs, collection, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { EligibleTobaccoInfoOverlay } from '../index.js';
import { FaTimes } from 'react-icons/fa';

const AddTobaccoOverlay = ({ close }) => {
    const [toggleEligibleTobaccoInfoOverlay, setToggleEligibleTobaccoInfoOverlay] = React.useState(null);
    const [currentInputType, setCurrentInputType] = React.useState('');
    const [currentInputBrand, setCurrentInputBrand] = React.useState('');
    const [currentInputName, setCurrentInputName] = React.useState('');
    const [currentInputFlavour, setCurrentInputFlavour] = React.useState('');
    const [currentInputIce, setCurrentInputIce] = React.useState(false);
    const [currentInputFruity, setCurrentInputFruity] = React.useState(false);
    const [currentInputSweet, setCurrentInputSweet] = React.useState(false);
    const [currentInputInStock, setCurrentInputInStock] = React.useState(false);
    const [imageURL, setImageURL] = React.useState(null);
    const [types, setTypes] = React.useState(null);
    const [brands, setBrands] = React.useState(null);
    const [typeError, setTypeError] = React.useState(null);
    const [brandError, setBrandError] = React.useState(null);
    const [nameError, setNameError] = React.useState(null);
    const [flavourError, setFlavourError] = React.useState(null);   
    const [uploadNotification, setUploadNotification] = React.useState(null); 
    const fileUploadRef = React.useRef(null);
    const db = getFirestore(Firebase);
    const storage = getStorage(Firebase);

    const openEligibleTobaccoInfoOverlay = () => {
        setToggleEligibleTobaccoInfoOverlay(true);
    };

    const closeEligibleTobaccoInfoOverlay = () => {
        setToggleEligibleTobaccoInfoOverlay(false);
    };

    const handleAdd = (type, brand, name, flavour) => {     
        if (!types.includes(type)) {
            setTypeError(true);
        } else {
            setTypeError(false);
        }

        if (!brands.includes(brand)) {
            setBrandError(true);
        } else {
            setBrandError(false);
        }

        if (!name) {
            setNameError(true);
        } else {
            setNameError(false);
        }

        if (!flavour) {
            setFlavourError(true);
        } else {
            setFlavourError(false);
        }
    };

    const add = async (type, brand, name, flavour, ice, fruity, sweet, inStock) => {        
        if ((ice !== null) && (fruity !== null) && (sweet !== null) && (inStock !== null)) {            
            const tobacco = {
                type: type,
                brand: brand,
                name: name,
                flavour: flavour,
                image: imageURL,
                ice: ice,
                fruity: fruity,
                sweet: sweet,
                inStock: inStock
            };
            const querySnapshot = await getDocs(collection(db, "tobaccoLibrary"));
            const tobaccosTemp = JSON.parse(querySnapshot.docs[0].data().tobaccos);
            tobaccosTemp.push(tobacco);
            await setDoc(querySnapshot.docs[0].ref, { tobaccos: JSON.stringify(tobaccosTemp) });    
            setCurrentInputType('');
            setCurrentInputBrand('');
            setCurrentInputName('');
            setCurrentInputFlavour('');  
            setImageURL(null); 
            setCurrentInputIce(false);
            setCurrentInputFruity(false);
            setCurrentInputSweet(false);
            setCurrentInputInStock(false);  
            setUploadNotification(false);                  
        }        
    };

    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const storageRef = ref(storage, `images/${file.name}`);       
        uploadBytes(storageRef, file).then(() => {
            getDownloadURL(storageRef).then(downloadUrl => {
                setImageURL(downloadUrl);  
                setUploadNotification(true);            
            });
        });        
    };

    React.useEffect(() => {
        if ((typeError === false) && (brandError === false) && (nameError === false) && (flavourError === false)) {            
            add(currentInputType, currentInputBrand, currentInputName, currentInputFlavour, currentInputIce, currentInputFruity, currentInputSweet, currentInputInStock);            
        }
    }, [typeError, brandError, nameError, flavourError]);

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
            { uploadNotification && (<span>Image uploaded successfully!</span>) }
            <input type = 'file' ref = { fileUploadRef } onChange = { e => uploadImage(e) } style = {{ display: 'none' }}></input>
            <div className = 'addtobaccooverlay__buttonrow'>
                <button type = 'button' onClick = { () => fileUploadRef.current.click() }>Upload Image</button>
                <button type = 'button' onClick = { () => handleAdd(currentInputType, currentInputBrand, currentInputName, currentInputFlavour) }>Add</button>
            </div>
            <FaTimes onClick = { close } className = 'close'></FaTimes>  
            <h3 onClick = { openEligibleTobaccoInfoOverlay }>Info</h3>   
            { toggleEligibleTobaccoInfoOverlay && (<EligibleTobaccoInfoOverlay typesInfo = { types } brandsInfo = { brands } close = { closeEligibleTobaccoInfoOverlay }></EligibleTobaccoInfoOverlay>) }       
        </div>
    );
}

export default AddTobaccoOverlay;