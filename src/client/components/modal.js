import * as React from "react";
import {createPortal} from "react-dom";
import Button from "./button";
import buttonClose from "./assets/close-button.png";
import ButtonDelete from "./assets/delete.png";
import ModalUpdate from "./modal-update";
import ButtonUpdate from "./assets/update.png";
import Utile from "../js/utile";

const styleModal = {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "center",
    backgroundColor: "#fff",
    width: "50%",
    height: "auto",
    zIndex: "1000",
    position: "absolute",
    top: "25%",
    left: "25%",
    border: "20px solid rgba(0, 0, 0, 0.3)",
    backgroundClip: "padding-box",
    borderRadius: "1%",
    paddingLeft: "15px",
    paddingRight: "5px",
    paddingBottom: "10px",
};
const styleDiv2 = {
    alignSelf: "center",
    alignItems: "center",
};
const styleTitleModal = {
    textAlign: "center",
};
const styleText = {
    alignSelf: "center",
};
// Style button close modal
const styleButtonM = {
    alignSelf: "start",
    borderColor: "transparent",
    backgroundColor: "transparent",
    width: "30px",
    marginTop: "7px",
};
const styleDivButtons = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
};
// Style button delete and update
const styleButtonDeleteUpdate = {
    backgroundColor: "rgb(79,179,218)",
    color: "#fff",
    borderColor: "rgb(115,210,222)",
    borderRadius: "10%",
};
//Style button modif
const styleButtonModif = {
    backgroundColor: "rgb(79,179,218)",
    color: "#fff",
};

// Modal with settings "onClose", which will be called at the click
// Allows the return to the initial value of the popup
const Modal = props => {
    // Used to tell react to observe this variable that changes
    const [show, setShow] = React.useState(true);
    if (show === false) {
        // If false, the modal disappears
        return null;
    }
    // Modale Update
    const [showUpdate, setShowUpdate] = React.useState(false);

    //Button Modif vide ou plein
    const [modif, setModif] = React.useState(!!props.obj.empty); // !! = transforme en booleen

    React.useEffect(() => {
        setModif(props.obj.empty);
    }, [props.obj.empty]);

    const buttonVidePlein = () => {
        if (props.obj.empty) {
            props.obj.empty = false;
        } else {
            props.obj.empty = true;
        }
        setModif(props.obj.empty);
        Utile.updateTerminal(props.obj._id, "empty", props.obj.empty);
    };

    if (showUpdate === true) {
        return <ModalUpdate onClose={() => setShowUpdate(false)} />;
    }

    return createPortal(
        <div style={styleModal}>
            <div>
                {/* on Click, we put in false (the show) with setShow */}
                <Button
                    class={"buttonModal"}
                    style={styleButtonM}
                    onClick={() => {
                        setShow(false);
                        props.onClose();
                    }}
                    img={buttonClose}
                    alt={"button close"}
                />
            </div>
            <div style={styleDiv2}>
                <h2 style={styleTitleModal}>
                    {props.obj.bank && props.obj.bank.name}
                </h2>
                <div style={styleText}>
                    <p>{props.obj.address}</p>
                    <p>{`${Math.floor(props.obj.dist.calculated)} m`}</p>
                    <p>
                        {(() => {
                            if (modif) {
                                return "Vide";
                            }
                            return "Plein";
                        })()}
                    </p>
                    <Button
                        class={"buttonbuttonVidePleinModif"}
                        style={styleButtonModif}
                        value={"Modifier"}
                        onClick={buttonVidePlein}
                    />
                </div>
            </div>
            <div style={styleDivButtons}>
                <Button
                    class={"buttonPopupAndModal"}
                    style={styleButtonDeleteUpdate}
                    value={"Delete"}
                    img={ButtonDelete}
                    alt={"button delete"}
                />
                <Button
                    class={"buttonPopupAndModal"}
                    style={styleButtonDeleteUpdate}
                    value={"Update"}
                    onClick={() => {
                        setShowUpdate(true);
                    }}
                    img={ButtonUpdate}
                    alt={"button update"}
                />
            </div>
        </div>,
        document.querySelector("#modal-update"),
    );
};

export default Modal;
