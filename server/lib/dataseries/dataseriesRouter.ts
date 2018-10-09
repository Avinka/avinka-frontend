import {Request, Response} from "express";
import * as mongoose from "mongoose";
import {DataseriesSchema, IDataseries, IDataseriesModel} from "./dataseries";
import {Model} from "mongoose";
import {DataseriesService} from "./dataseriesService";

export class DataseriesRouter {

    readonly Dataseries: Model<IDataseriesModel> = mongoose.model<IDataseriesModel>('Dataseries', DataseriesSchema);
    readonly dataseriesService: DataseriesService;

    constructor(dataseriesService: DataseriesService) {
        this.dataseriesService = dataseriesService;
    }

    public routes(app): void {
        app.route('/dataseries')
            .get(async (req: Request, res: Response) => {
                let result = await this.Dataseries.find().exec();
                res.status(200).send(result)
            })
            .post(async (req: Request, res: Response) => {
                let result = await this.Dataseries.create(req.body);
                res.status(200).send(result)
            });
        app.route('/dataseries/:id')
            .get(async (req: Request, res: Response) => {
                const result: IDataseries = await this.dataseriesService.get(req.params.id);
                if(result != null) {
                    res.status(200).send(result)
                } else {
                    res.status(404)
                }
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
