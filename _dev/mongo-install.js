const mongo = require("mongodb").MongoClient;
//A MODIFIER
const urlRemote = `mongodb+srv://dev:dev@cluster0-rhjfx.mongodb.net/test?retryWrites=true&w=majority`;
const urlLocal = "mongodb://dev:dev@localhost:27017";

const updateBD = async url => {
    console.log("UPDATE de la BD");
    const client = await mongo.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = client.db("trouvkash");
    //récupération de la collection
    const collection = db.collection("terminals");
    const items = await collection.find({}).toArray();
    for (const [i, element] of items.entries()) {
        element.location = {
            type: "Point",
            coordinates: [element.longitude, element.latitude],
        };
        console.log(element);
        console.log(i);
        collection.updateOne({_id: element._id}, {$set: element});
    }
    console.log("2dsphere");
    await collection.createIndex({location: "2dsphere"});
    client.close();
};

const verify = async url => {
    console.log("VERIFY de la BD");
    const client = await mongo.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("client connected !");
    const db = client.db("trouvkash");
    console.log("Db found !");
    const collection1 = db.collection("terminals");
    console.log("collection found !");
    const items = await collection1
        .find({})
        .limit(1)
        .toArray();
    if (!Object.prototype.hasOwnProperty.call(items[0], "location")) {
        updateBD(url);
    }
    console.log("connexion closed !");
    client.close();
};

const index = async url => {
    console.log("index de la BD");
    const client = await mongo.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("client connected !");
    const db = client.db("trouvkash");
    console.log("Db found !");
    const collection = db.collection("terminals");
    console.log("collection found !");
    await collection.createIndex({location: "2dsphere"});
    console.log(`index created for : ${url}`);

    console.log("connexion closed !");
    client.close();
};

const remoteOrLocal = process.argv[2];
const choix = process.argv[3];

let uri = urlRemote;
if (typeof remoteOrLocal != "undefined") {
    if (remoteOrLocal.toLocaleLowerCase() === "l") {
        uri = urlLocal;
        console.log(uri);
    }
}
console.log(uri);
if (typeof choix != "undefined") {
    if (choix === "index") {
        index(uri);
    } else {
        verify(uri);
    }
} else {
    verify(uri);
}
