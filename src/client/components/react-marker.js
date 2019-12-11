import * as React from "react";
import {Marker} from "react-leaflet";
import Reactpopup from "./react-popup";

const ReactMarker = props => (
    <Marker position={props.position} title={props.title}>
        <Reactpopup obj={props.obj} />
    </Marker>
);

export default ReactMarker;
