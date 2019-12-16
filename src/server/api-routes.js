// /* becodeorg/trouvkash
//  *
//  * coded by Dogukan Ermis @ BeCode
//  * started at 06/12/2019
//  *
//  */

const mongo = require("mongodb").MongoClient;
const router = require("express").Router();

mongo.connect(
    // DB URI should go to .env but it's here for testing purposes
    "mongodb+srv://dev:dev@trouvkash-3px3t.mongodb.net/test?retryWrites=true&w=majority",
    (err, client) => {
        if (err) {
            console.error("An error occurred connecting to MongoDB: ", err);
        } else {
            const db = client.db("trouvkash");
            const terminals = db.collection("terminals");
            const banks = db.collection("banks");

            router.get("/", (req, res) => {
                res.json({
                    status: "API Working!",
                    message:
                        "Welcome to TrouvKash! Coded by Dogukan Ermis, Nicolas Dehez and Ayse Akdede",
                });
            });

            router.get("/banks", (req, res) => {
                banks.find({}).toArray((e, banksArray) => {
                    res.send({
                        banksArray,
                    });
                });
            });

            router.get("/terminals", (req, res) => {
                terminals.find({}).toArray((e, terminalsArray) => {
                    res.send({
                        terminalsArray,
                    });
                });
            });

            router.get("/:latitude/:longitude", (req, res) => {
                terminals
                    .aggregate([
                        // {
                        //     $match: {
                        //         latitude: {
                        //             $gte: Number(req.params.latitude) - 0.1,
                        //             $lte: Number(req.params.latitude) + 0.1,
                        //         },
                        //         longitude: {
                        //             $gte: Number(req.params.longitude) - 0.2,
                        //             $lte: Number(req.params.longitude) + 0.2,
                        //         },
                        //     },
                        // },
                        {
                            $lookup: {
                                from: "banks",
                                localField: "bank",
                                foreignField: "_id",
                                as: "bankDetails",
                            },
                        },
                    ])
                    .toArray((err2, item) => {
                        // LATITUDE //
                        const latitude = Number(req.params.latitude);
                        const ratioLat =
                            Math.cos((req.params.latitude * Math.PI) / 180) *
                            111;
                        const tenKmLat = (1 / ratioLat) * 0.75;
                        const minLat = latitude - tenKmLat;
                        const maxLat = latitude + tenKmLat;

                        // LONGITUDE //
                        const longitude = Number(req.params.longitude);
                        const ratioLong =
                            Math.cos((req.params.longitude * Math.PI) / 180) *
                            85;
                        const tenKmLong = (1 / ratioLong) * 1.5;
                        const minLong = longitude - tenKmLong;
                        const maxLong = longitude + tenKmLong;
                        const result = [];

                        // FOR LOOP ON TERMINALS ARRAY //
                        item.forEach((el, index) => {
                            if (
                                Object.getOwnPropertyNames(el.bankDetails)
                                    .length <= 1
                            ) {
                                el.bankDetails = [{}];
                                el.bankDetails[0].country = "N/A";
                            }
                            if (
                                el.latitude > minLat &&
                                el.latitude < maxLat &&
                                (el.longitude > minLong &&
                                    el.longitude < maxLong)
                            ) {
                                result.push(el);
                            }
                            index === item.length - 1 && res.json(result);
                        });
                    });
            });
        }
    },
);

module.exports = router;
