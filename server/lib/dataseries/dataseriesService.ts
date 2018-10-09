import {Model} from "mongoose";
import {IDataseriesModel, DataSeries, IDataseries} from "./dataseries";
import {CounterService} from "../counter/counterService";

export class DataseriesService {

    readonly Dataseries: Model<IDataseriesModel>;
    readonly counterService: CounterService;

    constructor(Dataseries: Model<IDataseriesModel>, counterService: CounterService) {
        this.Dataseries = Dataseries;
        this.counterService = counterService;
    }

    async get(id: any): Promise<IDataseries> {
        const result: IDataseries = await this.Dataseries.findOne({_id: id}).exec();
        if (result != null && result.query != null) {
            const data = await this.counterService.get(result.query);
            let dataseries: DataSeries = new DataSeries(result);
            dataseries.data = data;
            return dataseries;
        }
        return result;
    }
}
