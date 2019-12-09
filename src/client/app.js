/* becodeorg/trouvkach
 *
 * /src/client/app.js - Client entry point
 *
 * coded by leny@BeCode
 * started at 06/09/2019
 */

import * as React from "react";
import ReactDOM from "react-dom";
import "./styles/style.css";

/*
 * import banks from "../_dev/banks.json";
 *import terminals from "../_dev/terminals.json";
 */

import HelloWorld from "./components/hello";

ReactDOM.render(<HelloWorld />, document.querySelector("#app"));
