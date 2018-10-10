import {ObjectId} from "bson";

export class DataPoints  {
    datasetId: any;
    data: Object;

    constructor(datasetId: any, data: Object) {
        this.datasetId = datasetId;
        this.data = data;
    }
}
