/* eslint-disable no-console */
// /* eslint-disable no-console */
// /* becodeorg/trouvkach
//  *
//  * /src/server/index.js - Server entry point
//  *
//  * coded by Dogukan Ermis @BeCode
//  * started at 06/12/2019
//  */

// import express from "express";
// import path from "path";
// // Import Routes
// const postsRoutes = require("./routes/posts");
// const bodyParser = require("body-parser");
// require("dotenv").config();

// const {APP_PORT} = process.env;

// const app = express();

// const mongoose = require("mongoose");

// app.use(express.static(path.resolve(__dirname, "../../bin/client")));

// app.use(bodyParser.json());

// // Middlewares
// app.use("/posts", postsRoutes);

// // Connect to DB
// mongoose.connect(
//     "mongodb+srv://dev:dev@trouvkash-3px3t.mongodb.net/",
//     {useUnifiedTopology: true},
//     () => {
//         console.log("Connected to the DB");

//         const Schema = mongoose.Schema;
//         const Bank = mongoose.model("banks", new Schema({}), "banks");
//         Bank.find({}, function(err, doc) {
//             console.log("banks: " + doc);
//         });
//     },
// );

// // Get all data from DB
// app.get("/", async (req, res) => {
//     try {
//         const posts = await Post.find();
//         res.json(posts);

//         }
//     } catch (err) {
//         res.json({message: err});
//     }
// });

// Listen
// app.listen(APP_PORT, () =>
//     console.log(`🚀 Server is listening on port ${APP_PORT}.`),
// );

/* becodeorg/trouvkach
 *
 * /src/server/index.js - Server entry point
 *
 * coded by yousef
 * started at 03/12/2019
 */

require("dotenv").config();

import express from "express";
import path from "path";

const app = express();
const {APP_PORT} = process.env;

const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const url = process.env.DB_CONNECTION;

app.use(express.static(path.resolve(__dirname, "../../bin/client")));

app.get("/banks", (req, res) => {
    console.log(`ℹ️ (${req.method.toUpperCase()}) ${req.url}`);

    MongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
        if (err === null) {
            console.log("Banks Connected");

            const db = client.db("trouvkash");
            const Banks = db.collection("banks");

            Banks.find({}).toArray((e, banks) => {
                res.send({
                    banks,
                });
            });
        }
    });
});

app.get("/terminals", (req, res) => {
    console.log(`ℹ️ (${req.method.toUpperCase()}) ${req.url}`);
    MongoClient.connect(url, {useUnifiedTopology: true}, (e, client) => {
        if (e === null) {
            console.log("Terminals Connected");

            const db = client.db("trouvkash");
            const Terminals = db.collection("terminals");

            // eslint-disable-next-line no-shadow
            Terminals.find({}).toArray((e, terminals) => {
                res.send({
                    terminals,
                });
            });
        }
    });
});

app.listen(APP_PORT, () =>
    // eslint-disable-next-line no-template-curly-in-string
    console.log("RocketIcon Server is listening on port ${APP_PORT}."),
);
