import * as React from "react";
import {createPortal} from "react-dom";
import Button from "./button";
import Form from "./form";
import buttonClose from "./assets/close-button.png";

const styleModalAdd = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    flexWrap: "wrap",
    backgroundColor: "#fff",
    width: "80%",
    height: "auto",
    zIndex: "100000",
    position: "absolute",
    top: "5%",
    left: "6%",
    border: "20px solid rgba(0, 0, 0, 0.3)",
    backgroundClip: "padding-box",
    borderRadius: "1%",
    paddingLeft: "15px",
    paddingRight: "5px",
    paddingBottom: "10px",
};

// Style button close modal
const styleButtonM = {
    alignSelf: "start",
    borderColor: "transparent",
    backgroundColor: "transparent",
    width: "30px",
    marginTop: "7px",
};

const ModalUpdate = ({onClose}) => {
    const [showUpdate, setShowUpdate] = React.useState(true);

    if (showUpdate === false) {
        return null;
    }
    return createPortal(
        <div style={styleModalAdd}>
            <div>
                <Button
                    style={styleButtonM}
                    img={buttonClose}
                    alt={"button close"}
                    onClick={() => {
                        setShowUpdate(false);
                        onClose();
                    }}
                />
            </div>
            <Form title={"Update the bank"} />
        </div>,
        document.querySelector("#modal-add-bank"),
    );
};

export default ModalUpdate;
