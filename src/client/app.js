/* becodeorg/trouvkach
 *
 * /src/client/app.js - Client entry point
 *
 * coded by leny@BeCode
 * started at 06/09/2019
 */

import "@babel/polyfill";
import "../scss/styles.scss";

import * as React from "react";
import ReactDOM from "react-dom";
import ReactMap from "./components/react-map";

ReactDOM.render(<ReactMap />, document.querySelector("#app"));
