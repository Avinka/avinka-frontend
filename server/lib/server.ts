import app from "./app";
import * as mongoose from "mongoose";
import {MongoTestDataBase} from "./core/db/mongo";
const PORT = 3000;

app.listen(PORT, () => {

    new MongoTestDataBase().connect();
    console.log('Express server listening on port ' + PORT);
});
