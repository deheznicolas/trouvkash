import * as React from "react";
import {Popup} from "react-leaflet";
import Button from "./button";
import Modal from "./modal";
import buttonMore from "./assets/more.png";

const styleTitle = {
    fontSize: "16px",
    fontWeight: "bold",
};
const styleBody = {
    margin: 0,
    padding: 0,
    fontSize: "13px",
};
// Style button "see more"
const styleButton = {
    color: "#fff",
    fontSize: "12px",
    padding: "6px 5px 6px 5px",
    backgroundColor: "rgb(79,179,218)",
};

const ReactPopup = props => {
    const [show, setShow] = React.useState(false);

    if (show === true) {
        return <Modal onClose={() => setShow(false)} obj={props.obj} />;
    }
    if (typeof props.obj !== "undefined") {
        return (
            <Popup>
                <div style={styleTitle}>
                    {props.obj.bank && props.obj.bank.name}
                </div>
                <div style={styleBody}>
                    <ul className={"listPopup"}>
                        <li>{props.obj.address}</li>
                        <li>{`${Math.floor(props.obj.dist.calculated)} m`}</li>
                    </ul>
                    <div>
                        {/* on Click, we put in true (the show) with setShow */}
                        <Button
                            class={"buttonPopupAndModal"}
                            style={styleButton}
                            value={"see more"}
                            onClick={() => setShow(true)}
                            img={buttonMore}
                            alt={"button more"}
                        />
                    </div>
                </div>
            </Popup>
        );
    }
    return (
        <Popup>
            <div style={styleTitle}>{"Vous êtes ici."}</div>
        </Popup>
    );
};

export default ReactPopup;
