import * as React from "react";
import useForm from "react-hook-form";
import {newTerminal} from "../js/utile";

const styleForm = {
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
};
const styleTitleModal = {
    textAlign: "center",
};

const Form = props => {
    const {register, handleSubmit, errors} = useForm(); // Initialise
    // We retrieve the information as an object
    const onSubmit = data => {
        console.log(data);
        navigator.geolocation.getCurrentPosition(
            positionC => {
                newTerminal(
                    data.bankId,
                    positionC.coords.longitude,
                    positionC.coords.latitude,
                );
            },
            error => console.warn(error.message),
            {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000},
        );
    };

    //récupérer les banques (localstorage)
    //retransformer en tableau d'objet
    const stringToArrayObject = str => {
        const newArr = str.split("|");
        for (let i = 0; i < newArr.length; i++) {
            newArr[i] = JSON.parse(newArr[i]);
        }
        return newArr;
    };

    let allbanks = localStorage.getItem("allbanks");
    allbanks = stringToArrayObject(allbanks);

    return (
        <div style={styleForm}>
            <div>
                <h2 style={styleTitleModal}>{props.title}</h2>
            </div>
            <form method={"post"} onSubmit={handleSubmit(onSubmit)}>
                <fieldset>
                    <legend>{"Bank"} </legend>
                    <div className={"labelInput"}>
                        <label>{"Name's bank : "}</label>
                        <select
                            name={"bankId"}
                            ref={register({required: true})}>
                            {allbanks.map(el => (
                                <option key={el._id} value={el._id}>
                                    {el.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* if empty, error + error sentence */}
                    <div className={"errorForm"}>
                        {errors.name && "Name's bank is required."}
                    </div>
                </fieldset>

                <div>
                    <input type={"submit"} value={"submit"} />
                </div>
            </form>
        </div>
    );
};

export default Form;
