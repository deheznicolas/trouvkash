import express from "express";
import path from "path";
import router from "./api-routes";

const {APP_PORT, PORT} = process.env;
const port = APP_PORT || PORT;
const app = express();

app.use(express.static(path.resolve(__dirname, "../../bin/client")));

app.listen(port, () => console.log(`🚀 Server is listening on port ${port}.`));

app.use("/api", router);
