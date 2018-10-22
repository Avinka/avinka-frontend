import app from "./app";
import * as mongoose from "mongoose";
import {Mongo} from "./core/db/mongo";
const PORT = 3000;

app.listen(PORT, () => {

    new Mongo().connect();
    console.log('Express server listening on port ' + PORT);
});
