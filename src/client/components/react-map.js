import * as React from "react";
import {Map, TileLayer} from "react-leaflet";
import ReactMarker from "./react-marker";
import Utile from "../js/utile";

const ReactMap = () => {
    // Used to tell react to observe this variable that changes
    // const [show, setShow] = React.useState(false);

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
            })();
        }
    }, [latitude, longitude, 10000]);

    let $modalAddBank;

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
                    title={"Vous êtes ici !"}
                />
                {$modalAddBank}
            </Map>
        </div>
    );
};

export default ReactMap;
