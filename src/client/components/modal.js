import * as React from "react";
import {createPortal} from "react-dom";
import Button from "./button";
import ButtonClose from "./assets/close-button.png";
import ButtonDelete from "./assets/delete.png";
import Utile from "../js/utile";

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

const Modal = props => {
    // Used to tell react to observe this variable that changes
    const [show, setShow] = React.useState(true);
    if (show === false) {
        // If false, the modal disappears
        return null;
    }

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
        Utile.updateTerminal(
            props.obj._id,
            "Le distributeur est vide",
            props.obj.empty,
        );
    };

    return createPortal(
        <div>
            <div>
                {/* on Click, we put in false (the show) with setShow */}
                <Button
                    class={"buttonModal"}
                    style={styleButtonM}
                    onClick={() => {
                        setShow(false);
                        props.onClose();
                    }}
                    img={ButtonClose}
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
                    alt={"button update"}
                />
            </div>
        </div>,
        document.querySelector("#modal-update"),
    );
};

export default Modal;
