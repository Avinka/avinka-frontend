import {Request, Response} from "express";
import * as mongoose from "mongoose";
import {GraphSchema} from "./graph";


export class GraphRouter {
    Graph = mongoose.model('Graph', GraphSchema);

    public routes(app): void {
        app.route('/graph')
            .get(async (req: Request, res: Response) => {
                let result = await this.Graph.find().exec();
                res.status(200).send(result.toString())
            })
            .post(async (req: Request, res: Response) => {
                // TODO add validation
                let result = await this.Graph.create(req.body);
                res.status(200).send(result.toString())
            });
        app.route('/graph/:id')
            .get(async (req: Request, res: Response) => {
                const id = req.params.id;
                let result = await this.Graph.find({_id: id}).exec();
                res.status(200).send(result.toString())
            })
            .delete(async (req: Request, res: Response) => {
                const id = req.params.id;
                let result = await this.Graph.deleteOne({_id: id}).exec();
                res.status(200).send(result.toString())
            })
            .put(async (req: Request, res: Response) => {
                const id = req.params.id;
                let result = await this.Graph.updateOne({_id: id}, req.body).exec();
                res.status(200).send(result.toString())
            });
    }
}