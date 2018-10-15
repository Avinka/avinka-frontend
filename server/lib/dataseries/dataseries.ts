import {Document, Schema} from "mongoose";
import {ISelector} from "query/selector";

export interface IDataseries {
    _id: any;
    name: string;
    createdAt: Date;
    indexName: string;
    selectors: ISelector[];
}

export class Dataseries implements IDataseries {
    _id: any;
    name: string;
    createdAt: Date;
    indexName: string;
    selectors: ISelector[];
    datapoints: {};

    constructor(that: IDataseries) {
        this._id = that._id;
        this.name = that.name;
        this.createdAt = that.createdAt;
        this.indexName = that.indexName;
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
    selectors: [{type: Schema.Types.ObjectId, ref: 'Selector'}]
    // aggregators: [{ type: Schema.Types.ObjectId, ref: 'Aggregator' }]
});
