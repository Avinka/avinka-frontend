import {Request, Response} from "express";
import {DatapointService} from "./datapointService";
import {Model} from "mongoose";
import {DataseriesSchema, IDataseriesModel} from "../dataseries/dataseries";
import * as mongoose from "mongoose";

export class DatapointRouter {

    readonly dataPointService: DatapointService;
    readonly Dataseries: Model<IDataseriesModel> = mongoose.model<IDataseriesModel>('Dataseries', DataseriesSchema);

    constructor(dataPointService: DatapointService) {
        this.dataPointService = dataPointService;
    }

    public routes(app): void {
        app.route('/datapoints/')
            .get(async (req: Request, res: Response) => {
                const dataseries = await this.Dataseries.findOne(req.query.dataseriesId);
                if (dataseries) {
                    const datapoints = await this.dataPointService.get(dataseries);
                    if (datapoints) {
                        return res.status(200).send(datapoints);
                    }
                }
                res.status(404);
            })
    }
}
