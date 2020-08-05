import express from "express";
import Responses from "./utils/response";
import Database from "./database";
import Routes from "./routes";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    return Responses.normal(res, "root");
});

Database.init();

app.use(Routes);

app.listen(9000, () => {
    console.log("Server started");
});