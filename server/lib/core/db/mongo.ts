import * as mongoose from "mongoose";

export class Mongo {
    uri: string = 'mongodb://127.0.0.1:27017/local';

    public connect() {
        mongoose.connect(this.uri, (err: any) => {
            if (err) {
                console.log(err.message);
            } else {
                console.log("Succesfully connected to " + this.uri)
            }
        });

    }

    public disconnect() {
        mongoose.disconnect();
    }
}