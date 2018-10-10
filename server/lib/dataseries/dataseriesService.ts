import {Model} from "mongoose";
import {IDataseriesModel, IDataseries} from "./dataseries";
import {DatapointService} from "../datapoint/datapointService";

export class DataseriesService {

    readonly Dataseries: Model<IDataseriesModel>;
    readonly dataPointService: DatapointService;

    constructor(Dataseries: Model<IDataseriesModel>, dataPointService: DatapointService) {
        this.Dataseries = Dataseries;
        this.dataPointService = dataPointService;
    }

    async get(id: any): Promise<Object> {
        const dataseries: IDataseries = await this.Dataseries.findOne({_id: id}).exec();
        if (dataseries != null && dataseries.query != null) {
            return await this.dataPointService.get(dataseries.query);
        }
        return null;
    }
}
