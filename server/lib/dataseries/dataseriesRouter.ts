import {Request, Response} from "express";
import * as mongoose from "mongoose";
import {DataseriesSchema, IDataseries, Dataseries, IDataseriesModel} from "./dataseries";
import {Model} from "mongoose";
import {DatapointService} from "../datapoint/datapointService";
import {DataPoints} from "../datapoint/datapoints";
import {GraphSchema, IGraphModel} from "../graph/graph";
import {Result} from "../util/result";

export class DataseriesRouter {

    readonly Graph: Model<IGraphModel> = mongoose.model<IGraphModel>('Graph', GraphSchema);
    readonly Dataseries: Model<IDataseriesModel> = mongoose.model<IDataseriesModel>('Dataseries', DataseriesSchema);
    readonly datapointService: DatapointService;

    constructor(dataseriesService: DatapointService) {
        this.datapointService = dataseriesService;
    }

    public routes(app): void {
        app.route('/dataseries')
            .get(async (req: Request, res: Response) => {
                let result = await this.Dataseries.find().exec();
                res.status(200).send(result);
            })
            .post(async (req: Request, res: Response) => {
                let result = await this.Dataseries.create(req.body);
                res.status(200).send(result);
            });
        app.route('/dataseries/:id')
            .get(async (req: Request, res: Response) => {
                const id = req.params.id;
                const result: IDataseries = await this.Dataseries.findOne({_id: id}).exec();
                if (result != null) {
                    res.status(200).send(result);
                } else {
                    res.status(404);
                }
            })
            .delete(async (req: Request, res: Response) => {
                const id = req.params.id;
                let result = await this.Dataseries.deleteOne({_id: id}).exec();
                res.status(200).send(result);
            })
            .put(async (req: Request, res: Response) => {
                const id = req.params.id;
                let result = await this.Dataseries.updateOne({_id: id}, req.body).exec();
                res.status(200).send(result);
            });
        app.route('/dataseries/graph/:id')
            .get(async (req: Request, res: Response) => {
                const graphId = req.params.id;
                let graph: IGraphModel = await this.Graph.findOne({_id: graphId}, 'dataseries').populate('dataseries').exec();
                if (graph != null && graph.dataseries != null) {
                    let result = [];
                    for (const data of graph.dataseries) {
                        const datapoints = await this.datapointService.get(data.selectors);
                        let dataseries =  Dataseries.clone(data);
                        dataseries.datapoints = datapoints;
                        result.push(dataseries);
                    }
                    res.status(200).send(new Result(result));
                } else {
                    res.status(404);
                }
            });
        app.route('/dataseries/:id/selector')
            .post(async (req: Request, res: Response) => {
                const dataseriesId = req.params.id;
                let result = await this.Dataseries.findOne({_id: dataseriesId});
                // @ts-ignore
                result.selectors.push(req.body._id);
                await result.save();
                res.status(200).send(result);
            });
        app.route('/dataseries/:id/datapoint')
            .post(async (req: Request, res: Response) => {
                const id = req.params.id;
                const dataseries: IDataseries = await this.Dataseries.findOne({_id: id}).exec();
                if (dataseries != null) {
                    const result = await this.datapointService.get(dataseries.selectors);
                    res.status(200).send(new DataPoints(id, result));
                } else {
                    res.status(404);
                }
            });
    }
}
