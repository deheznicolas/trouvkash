import * as React from "react";
import {Map, TileLayer} from "react-leaflet";
import ReactMarker from "./react-marker";
import Button from "./button";
import AddBank from "./assets/bank.png";
import ModalAddBank from "./modal-add-bank";
import Utile from "../js/utile";

// Style button add bank
const styleButtonAdd = {
    zIndex: "1000",
    position: "absolute",
    top: "5%",
    left: "5%",
    backgroundColor: "rgb(79,179,218)",
    borderColor: "rgb(115,210,222)",
    width: "150px",
    height: "30px",
};

const ReactMap = () => {
    // Used to tell react to observe this variable that changes
    const [show, setShow] = React.useState(false);

    const [latitude, setLatitude] = React.useState(-181);
    const [longitude, setLongitude] = React.useState(-181);

    const [numbTerminal, setNumTerminal] = React.useState([]);

    navigator.geolocation.getCurrentPosition(
        positionC => {
            setLongitude(positionC.coords.longitude);
            setLatitude(positionC.coords.latitude);
        },
        error => console.warn(error.message),
        {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000},
    );

    React.useEffect(() => {
        // pour une fonction async dans un use effect, on appel une fonction qui appel une fonction asynchrone auto appelée soit useEffect(()=>{(async()=>{await something})()});
        // pour que babel ne soit pas faché par l'async/await, il faut inclure @babel/polyfill a la racine du projet dans le premier component
        if (
            latitude >= -180 &&
            longitude >= -180 &&
            latitude <= 180 &&
            longitude <= 180
        ) {
            (async () => {
                const data = await Utile.getTerminalAsync(
                    longitude,
                    latitude,
                    10000,
                ); // lat log km
                if (data.truc.length !== 0) {
                    setNumTerminal(data.truc);
                }
                // props.onSetResultLIst(data); // used to pass the total list to the map
            })();
        }
    }, [latitude, longitude, 10000]); // pour l'explication du tableau, voir plus haut ^^

    // To display the modal above the map
    // Define an empty variable
    // If show true, add the modal in the variable
    // Add the variable in the return with the map
    let $modalAddBank;

    if (show === true) {
        $modalAddBank = <ModalAddBank onClose={() => setShow(false)} />;
    }
    return (
        <div>
            <Map center={[latitude, longitude]} zoom={16.5} zoomControl={false}>
                <TileLayer
                    url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                    attribution={
                        'Map data &copy;, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
                    }
                />
                {numbTerminal.map(el => (
                    <ReactMarker
                        key={el._id}
                        position={[el.latitude, el.longitude]}
                        title={el.address}
                        obj={el}
                    />
                ))}
                <ReactMarker
                    position={[latitude, longitude]}
                    title={"You are here"}
                />
                <Button
                    class={"buttonAdd"}
                    style={styleButtonAdd}
                    value={"New bank"}
                    img={AddBank}
                    alt={"Add bank"}
                    onClick={() => setShow(true)}
                />
                {$modalAddBank}
            </Map>
        </div>
    );
};

export default ReactMap;
