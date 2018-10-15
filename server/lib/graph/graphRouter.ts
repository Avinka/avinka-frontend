import {Request, Response} from "express";
import * as mongoose from "mongoose";
import {GraphSchema, IGraphModel} from "./graph";
import {Model} from "mongoose";

export class GraphRouter {

    readonly Graph: Model<IGraphModel> = mongoose.model<IGraphModel>('Graph', GraphSchema);

    public routes(app): void {
        app.route('/graph')
            .get(async (req: Request, res: Response) => {
                let result = await this.Graph.find().exec();
                res.status(200).send(result)
            })
            .post(async (req: Request, res: Response) => {
                // TODO add validation
                let result = await this.Graph.create(req.body);
                res.status(200).send(result)
            });
        app.route('/graph/:id')
            .get(async (req: Request, res: Response) => {
                const id = req.params.id;
                let findOne = this.Graph.findOne({_id: id});
                if (req.query.full === 'true') {
                    findOne = findOne.populate('dataseries')
                }
                let result = await findOne.exec();
                res.status(200).send(result)
            })
            .delete(async (req: Request, res: Response) => {
                const id = req.params.id;
                let result = await this.Graph.deleteOne({_id: id}).exec();
                res.status(200).send(result)
            })
            .put(async (req: Request, res: Response) => {
                const id = req.params.id;
                let result = await this.Graph.updateOne({_id: id}, req.body).exec();
                res.status(200).send(result)
            });
        app.route('/graph/:id/dataseries')
            .post(async (req: Request, res: Response) => {
                // TODO add validation
                const graphId = req.params.id;
                let result = await this.Graph.findOne({_id: graphId});
                // @ts-ignore
                result.graphs.push(req.body._id);
                await result.save();
                res.status(201).send(result)
            });
    }
}
