/* eslint-disable no-console */
/* becodeorg/trouvkach
 *
 * /src/server/index.js - Server entry point
 *
 * coded by leny@BeCode
 * started at 06/09/2019
 */

import express from "express";
import path from "path";
// Import Routes
const postsRoutes = require("./routes/posts");
const bodyParser = require("body-parser");

const {APP_PORT} = process.env;

const app = express();

const mongoose = require("mongoose");

// Needed for .env file
// require("dotenv/config");

app.use(express.static(path.resolve(__dirname, "../../bin/client")));

app.use(bodyParser.json());

// Middlewares
app.use("/posts", postsRoutes);

// Connect to DB
mongoose.connect(
    "mongodb+srv://dev:dev@trouvkash-3px3t.mongodb.net/test?retryWrites=true&w=majority",
    {useUnifiedTopology: true},
    () => {
        console.log("Connected to the DB");
    },
);

// Listen
app.listen(APP_PORT, () =>
    console.log(`🚀 Server is listening on port ${APP_PORT}.`),
);
