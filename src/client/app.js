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

// import HelloWorld from "./components/hello";
import LeafletMap from "./components/leaflet-map";

ReactDOM.render(<LeafletMap />, document.querySelector("#app"));
