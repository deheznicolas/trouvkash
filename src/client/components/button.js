import React from "react";

const containerButton = {
    display: "flex",
    justifyContent: "flex-end",
};
const styleImg = {
    heigth: "1em",
    width: "1em",
    paddingRight: "5px",
};

function Button(props) {
    return (
        <div style={containerButton}>
            <button
                className={props.class}
                style={props.style}
                type={"button"}
                onClick={props.onClick}>
                <img style={styleImg} src={props.img} alt={props.alt} />
                {props.value}
            </button>
        </div>
    );
}

export default Button;
