/* becodeorg/trouvkach
 *
 * /src/server/index.js - Server entry point
 *
 * coded by leny@BeCode
 * started at 06/09/2019
 */

import express from "express";
import path from "path";
import {
    mongoRequestBanks,
    mongoRequestZoom,
    mongomodify,
    newTerminal,
} from "./mongo";

const {APP_PORT, PORT} = process.env;

const port = APP_PORT || PORT;

const app = express();

app.use(express.static(path.resolve(__dirname, "../../bin/client")));

app.get("/bank", (req, res) => {
    console.log("hello bank");
    mongoRequestBanks().then(rep => {
        res.send(rep); // Envoie la réponse
    });
});

// Recupère longitude, latitude, distance
app.get("/terminal/:long/:lat/:dist", (req, res) => {
    console.log(req.params.long, req.params.lat, req.params.dist);
    mongoRequestZoom(req.params.long, req.params.lat, req.params.dist).then(
        rep => {
            res.send(rep); // Envoie la réponse
        },
    );
});

// Ajout des modifications
app.get("/modifTerminal/:id/:champ/:value", (req, res) => {
    mongomodify(req.params.id, req.params.champ, req.params.value).then(rep => {
        res.send(rep);
    });
});

// New bank
app.get("/newTerminal/:idBank/:long/:lat", (req, res) => {
    newTerminal(req.params.idBank, req.params.long, req.params.lat).then(
        rep => {
            res.send(rep);
        },
    );
});

// Toujours à la fin
app.listen(port, () =>
    // eslint-disable-next-line no-console
    console.log(`🚀 Server is listening on port ${port}.`),
);
