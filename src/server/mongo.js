const mongo = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const fetch = require("node-fetch");

//A MODIFIER
const url = `mongodb+srv://dev:dev@cluster0-rhjfx.mongodb.net/test?retryWrites=true&w=majority`;
//const url = "mongodb://dev:dev@mongo:27017";

// Récupère toutes les banques
export const mongoRequestBanks = async () => {
    const client = await mongo.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = client.db("trouvkash");
    const collection = db.collection("banks");

    const banks = await collection.find({}).toArray();

    client.close();

    const rep = {
        truc: banks,
    };
    return rep;
};

export const mongoRequestZoom = async (long, lat, dist) => {
    const client = await mongo.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = client.db("trouvkash");
    const collection = db.collection("terminals");

    const items = await collection
        .aggregate([
            {
                $geoNear: {
                    near: {
                        type: "Point",
                        // coordonnées données
                        coordinates: [parseFloat(long), parseFloat(lat)],
                    },
                    // calcule la distance
                    distanceField: "dist.calculated",
                    // envoie la distance
                    maxDistance: parseInt(dist),
                },
            },
            // donne une limite
            {$limit: 100},
        ])
        .toArray();

    client.close();
    console.log(items.length);

    const rep = {
        truc: items,
    };
    return rep;
};

// Ecrit dans la BD
export const mongomodify = async (id, champ, value) => {
    if (id !== "undefined" && value !== "undefined") {
        let newValue = value;
        if (newValue === "true") {
            newValue = true;
        } else if (newValue === "false") {
            newValue = false;
        }

        const client = await mongo.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const db = client.db("trouvkash");
        const collection = db.collection("terminals");

        const modify = {};
        modify[champ] = newValue;
        collection.updateOne({_id: ObjectId(id)}, {$set: modify});

        client.close();

        const rep = {
            truc: "Modification effectuée (enfin peux-être)",
        };
        return rep;
    }
    const rep = {
        truc: "id undefined",
    };
    return rep;
};

//fonction pour récup les banques, transforme longitude et latitude en adresse
const getUnlnownAdressFromNominatim = async (lat, lon) => {
    const uri = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;
    console.log(uri);
    const response = await fetch(uri, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "GET",
    });
    const data = await response.json();
    const address = `${
        typeof data.address.house_number !== "undefined"
            ? data.address.house_number
            : ""
    } ${data.address.road && data.address.road}, ${data.address.postcode &&
        data.address.postcode} ${data.address.city && data.address.city}`;
    return address;
};

export const newTerminal = async (bank, long, lat) => {
    const client = await mongo.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = client.db("trouvkash");
    const collection = db.collection("terminals");
    //insert
    const newElement = {
        bank: ObjectId(bank),
        latitude: parseFloat(lat),
        longitude: parseFloat(long),
        address: await getUnlnownAdressFromNominatim(
            parseFloat(lat),
            parseFloat(long),
        ), //Will be update by the app
        created_at: "today", //todo luxon npm
        updated_at: "today", //todo
        deleted_at: null,
        location: {
            type: "Point",
            coordinates: [parseFloat(long), parseFloat(lat)],
        },
    };
    await collection.insertOne(newElement);
    await collection.createIndex({location: "2dsphere"});

    client.close();

    const rep = {
        truc: "Modification effectuée (enfin peux-être)",
    };
    return rep;
};
