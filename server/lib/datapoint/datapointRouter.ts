import {Request, Response} from "express";
import {DatapointService} from "./datapointService";
import {Model} from "mongoose";
import {DataseriesSchema, IDataseries, IDataseriesModel} from "../dataseries/dataseries";
import * as mongoose from "mongoose";
import {Query} from "./Query";
import {DataPoints} from "./datapoints";

export class DatapointRouter {

    readonly dataPointService: DatapointService;
    readonly Dataseries: Model<IDataseriesModel> = mongoose.model<IDataseriesModel>('Dataseries', DataseriesSchema);

    constructor(dataPointService: DatapointService) {
        this.dataPointService = dataPointService;
    }

    public routes(app): void {
        app.route('/datapoints/')
            .get(async (req: Request, res: Response) => {
                let query = new Query();
                query.since = new Date(decodeURIComponent(req.query.since));
                query.until = new Date(decodeURIComponent(req.query.until));
                let ids = req.query.dataseriesIds.split(',');
                const dataseries: IDataseries[] = await this.Dataseries.find({_id: {$in: ids}}).populate("selectors").exec();
                if (dataseries) {
                    let result = {};
                    for (let d of dataseries) {
                        if (!d.name) {
                            d.name = '';
                        }
                        query.selectors = d.selectors;
                        let datapoints: DataPoints = await this.dataPointService.get(query);
                        if (datapoints) {
                            datapoints.dataseriesId = d._id;
                            datapoints.name = d.selectors.map(x => x.key + x.operator + x.value).join() || 'default';
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
