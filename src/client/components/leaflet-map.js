import React, {useState, useEffect} from "react";
import {Map, Marker, Popup, TileLayer} from "react-leaflet";
import L from "leaflet";

const moneyIcon = new L.Icon({
    iconUrl: "https://img.icons8.com/ios-glyphs/90/000000/bank.png",
    iconSize: [45, 45],
    popupAnchor: [-0.5, -5],
});
const usrIcon = new L.Icon({
    iconUrl: "https://img.icons8.com/android/96/000000/marker.png",
    iconSize: [55, 55],
    popupAnchor: [0, -10],
});

function positionSet(p_lat, p_lon) {
    return [p_lat, p_lon];
}

function LeafletMap() {
    const [usrLoc, setusrLoc] = useState();
    let [markersList, setmarkersList] = useState();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            setusrLoc([position.coords.latitude, position.coords.longitude]);
            fetch(
                `/api/${position.coords.latitude}/${position.coords.longitude}`,
            ).then(dataJSON => {
                dataJSON.json().then(markers => {
                    markersList = markers;
                    setmarkersList(markersList);
                });
            });
        });
    }, []);
    // Not loaded yet
    if (!markersList) {
        return (
            <div className={"load"}>
                <div id={"text"}>
                    <h1>{"Loading"}</h1>
                </div>
            </div>
        );
    }

    return (
        <div className={"map"}>
            <Map
                style={{height: "50vh", width: "50vw"}}
                center={usrLoc}
                zoom={15}>
                <TileLayer
                    url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                    attribution={
                        ' <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    }
                />
                <Marker position={usrLoc} icon={usrIcon}>
                    <Popup>{<h3>{"I'm here."}</h3>}</Popup>
                </Marker>
                {markersList.map(element => (
                    <Marker
                        key={element._id}
                        position={positionSet(
                            element.latitude,
                            element.longitude,
                        )}
                        icon={moneyIcon}>
                        <Popup>
                            {
                                <div id={"center"}>
                                    <div>
                                        <h3>
                                            {element.bankDetails[0].name}
                                            {" ("}
                                            {element.bankDetails[0].country}
                                            {")"}
                                        </h3>
                                        <b>{"Adress: "}</b>
                                        {element.address}

                                        <b>{"Website: "}</b>
                                        <a
                                            href={element.bankDetails[0].url}
                                            target={"blank"}>
                                            {element.bankDetails[0].url}
                                        </a>
                                    </div>
                                    <button
                                        className={"deleteBTN"}
                                        type={"button"}>
                                        {"Delete"}
                                    </button>
                                    <button
                                        className={"emptyBTN"}
                                        type={"button"}>
                                        {"Empty"}
                                    </button>
                                </div>
                            }
                        </Popup>
                    </Marker>
                ))}
            </Map>
        </div>
    );
}
export default LeafletMap;
