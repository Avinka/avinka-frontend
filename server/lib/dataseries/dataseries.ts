import {Document, Schema, Model, model} from "mongoose";
import {ISelector} from "query/selector";

export interface IDataseries {
    name: string;
    createdAt: Date;
    query: Object;
    indexName: string;
    data: Object;
    selectors: ISelector[];
    //aggregators: IAggregators[];
}

export class DataSeries implements IDataseries {
    name: string;
    createdAt: Date;
    query: Object;
    indexName: string;
    data: Object;
    selectors: ISelector[];
    //aggregators: IAggregators[];

    constructor(that: IDataseries) {
        this.name = that.name;
        this.createdAt = that.createdAt;
        this.query = that.query;
        this.indexName = that.indexName;
        this.data = that.data;
        this.selectors = that.selectors;
    }
}

export interface IDataseriesModel extends IDataseries, Document {
}

export const DataseriesSchema: Schema = new Schema({
    name: String,
    createdAt: {type: Date, default: Date.now},
    query: String,
    indexName: String,
    selectors: [{ type: Schema.Types.ObjectId, ref: 'Selector' }]
    // aggregators: [{ type: Schema.Types.ObjectId, ref: 'Aggregator' }]
});
