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
                let ids = req.query.dataseriesIds.split(',');
                const dataseries = await this.Dataseries.find({_id: {$in: ids}}).exec();
                if (dataseries) {
                    let result = {};
                    for (let d of dataseries) {
                        const datapoints = await this.dataPointService.get(d);
                        if (datapoints) {
                            result[d._id] = datapoints;
                        }
                    }
                    res.status(200).send(result);
                    return;
                }
                res.status(404);
            });
    }
}
