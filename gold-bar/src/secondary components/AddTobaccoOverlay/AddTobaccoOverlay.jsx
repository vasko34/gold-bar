import React from 'react';
import './addtobaccooverlay.css';
import { Firebase } from "../../global";
import { getFirestore, getDocs, collection, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { FaTimes } from 'react-icons/fa';

const AddTobaccoOverlay = ({ close }) => {
    const [currentInputType, setCurrentInputType] = React.useState('Blonde');
    const [currentInputBrand, setCurrentInputBrand] = React.useState('Element Air');
    const [currentInputName, setCurrentInputName] = React.useState('');
    const [currentInputFlavour, setCurrentInputFlavour] = React.useState('');
    const [currentInputIce, setCurrentInputIce] = React.useState(false);
    const [currentInputFruity, setCurrentInputFruity] = React.useState(false);
    const [currentInputSweet, setCurrentInputSweet] = React.useState(false);
    const [currentInputInStock, setCurrentInputInStock] = React.useState(false);
    const [imageURL, setImageURL] = React.useState(null);
    const [types, setTypes] = React.useState(null);
    const [brands, setBrands] = React.useState(null);
    const [nameError, setNameError] = React.useState(null);
    const [flavourError, setFlavourError] = React.useState(null);   
    const [uploadNotification, setUploadNotification] = React.useState(null); 
    const fileUploadRef = React.useRef(null);
    const db = getFirestore(Firebase);
    const storage = getStorage(Firebase);    

    React.useEffect(() => {
        const getEligibleTobaccoInfo = async () => {
            const querySnapshot = await getDocs(collection(db, "eligibleTobaccoInfo"));
            setTypes(JSON.parse(querySnapshot.docs[0].data().eligibleTypes));
            setBrands(JSON.parse(querySnapshot.docs[0].data().eligibleBrands));
        };
        getEligibleTobaccoInfo();
    }, []);

    const handleAdd = (name, flavour) => {
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

    const HandleTypeChange = (e) => {
        setCurrentInputType(e.target.value);
    };

    const HandleBrandChange = (e) => {
        setCurrentInputBrand(e.target.value);
    };

    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const storageRef = ref(storage, `${file.name}`);       
        uploadBytes(storageRef, file).then(() => {
            getDownloadURL(storageRef).then(downloadUrl => {
                setImageURL(downloadUrl);  
                setUploadNotification(true);            
            });
        });        
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
            window.location.reload();                 
        }        
    };    

    React.useEffect(() => {
        if ((nameError === false) && (flavourError === false)) {            
            add(currentInputType, currentInputBrand, currentInputName, currentInputFlavour, currentInputIce, currentInputFruity, currentInputSweet, currentInputInStock);            
        }
    }, [nameError, flavourError]);      

    return (
        <div className = 'addtobaccooverlay'>
            <div className = 'addtobaccooverlay__normalinput'>
                <h1>Add New Tobacco</h1>
                <select className = 'addtobaccooverlay__normalinput-select' value = { currentInputType } onChange = { e => HandleTypeChange(e) }>
                    { (types) ? (types.map(e => (
                        <option value = { e }>
                            { e }
                        </option>
                    ))) : (null)}
                </select>
                <select className = 'addtobaccooverlay__normalinput-select' value = { currentInputBrand } onChange = { e => HandleBrandChange(e) }>
                    { (brands) ? (brands.map(e => (
                        <option value = { e }>
                            { e }
                        </option>
                    ))) : (null)}
                </select>
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
            { nameError && (<p>The name can't be empty!</p>) }
            { flavourError && (<p>The flavour can't be empty!</p>) }
            { uploadNotification && (<span>Image uploaded successfully!</span>) }
            <input type = 'file' ref = { fileUploadRef } onChange = { e => uploadImage(e) } style = {{ display: 'none' }}></input>
            <div className = 'addtobaccooverlay__buttonrow'>
                <button type = 'button' onClick = { () => fileUploadRef.current.click() }>Upload Image</button>
                <button type = 'button' onClick = { () => handleAdd(currentInputName, currentInputFlavour) }>Add</button>
            </div>
            <FaTimes onClick = { close } className = 'close'></FaTimes>       
        </div>
    );
};

export default AddTobaccoOverlay;