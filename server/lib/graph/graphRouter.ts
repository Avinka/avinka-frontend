import {Request, Response} from "express";
import * as mongoose from "mongoose";
import {Graph, GraphSchema, IGraphModel} from "./graph";
import {Model} from "mongoose";
import {DataseriesSchema, IDataseries, IDataseriesModel} from "../dataseries/dataseries";
import {DatapointService} from "../datapoint/datapointService";

export class GraphRouter {

    readonly Graph: Model<IGraphModel> = mongoose.model<IGraphModel>('Graph', GraphSchema);
    readonly Dataseries: Model<IDataseriesModel> = mongoose.model<IDataseriesModel>('Dataseries', DataseriesSchema);
    readonly datapointService: DatapointService;

    constructor(dataseriesService: DatapointService) {
        this.datapointService = dataseriesService;
    }

    public routes(app): void {
        app.route('/graph')
            .get(async (req: Request, res: Response) => {
                let graph = await this.Graph.find().exec();
                res.status(200).send(graph)
            })
            .post(async (req: Request, res: Response) => {
                let graph: Graph = req.body;
                let dataseries: IDataseries = await this.Dataseries.create({});
                graph.dataseries = [dataseries];
                let result = await this.Graph.create(graph);
                //Only the id of the dataseries is persisted, therefore we need to add it again
                result.dataseries = [dataseries];
                res.status(200).send(result)
            });
        app.route('/graph/:id')
            .get(async (req: Request, res: Response) => {
                const graph = this.Graph.findOne({_id: req.params.id}).populate('dataseries').exec();
                if(graph != null) {
                    res.status(200).send(graph);
                } else {
                    res.status(404);
                }
            })
            .delete(async (req: Request, res: Response) => {
                const graph  = await this.Graph.findOne({_id: req.params.id}).exec();
                await this.Dataseries.deleteMany({_id: {$in: graph.dataseries}});
                await graph.remove();
                res.status(200);
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
                result.dataseries.push(req.body._id);
                await result.save();
                res.status(201).send(result)
            });
    }
}
