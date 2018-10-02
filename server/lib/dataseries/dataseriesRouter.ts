import {Request, Response} from "express";
import * as mongoose from "mongoose";
import {DataseriesSchema} from "./dataseries";

export class DataseriesRouter {
    Dataseries = mongoose.model('Dataseries', DataseriesSchema);

    public routes(app): void {
        app.route('/dataseries')
            .get(async (req: Request, res: Response) => {
                let result = await this.Dataseries.find().exec();
                res.status(200).send(result.toString())
            })
            .post(async (req: Request, res: Response) => {
            // TODO add validation
            let result = await this.Dataseries.create(req.body);
            res.status(200).send(result.toString())
        });
    }
}
