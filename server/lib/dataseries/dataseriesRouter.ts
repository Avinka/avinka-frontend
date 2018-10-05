import {Request, Response} from "express";
import * as mongoose from "mongoose";
import {DataseriesSchema} from "./dataseries";

export class DataseriesRouter {

    Dataseries = mongoose.model('Dataseries', DataseriesSchema);

    public routes(app): void {
        app.route('/dataseries')
            .get(async (req: Request, res: Response) => {
                let result = await this.Dataseries.find().exec();
                res.status(200).send(result)
            })
            .post(async (req: Request, res: Response) => {
                // TODO add validation
                let result = await this.Dataseries.create(req.body);
                res.status(200).send(result)
            });
        app.route('/dataseries/:id')
            .get(async (req: Request, res: Response) => {
                const id = req.params.id;
                let result = await this.Dataseries.find({_id: id}).exec();
                res.status(200).send(result)
            })
            .delete(async (req: Request, res: Response) => {
                const id = req.params.id;
                let result = await this.Dataseries.deleteOne({_id: id}).exec();
                res.status(200).send(result)
            })
            .put(async (req: Request, res: Response) => {
                const id = req.params.id;
                let result = await this.Dataseries.updateOne({_id: id}, req.body).exec();
                res.status(200).send(result)
            });
    }
}
