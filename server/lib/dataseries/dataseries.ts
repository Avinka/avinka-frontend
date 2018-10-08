import {Document, Schema, Model, model} from "mongoose";

export interface IDataseries {
    name: string;
    createdAt: Date;
    query: Object;
    indexName: string;
    data: Object
}

export class DataSeries implements IDataseries {
    name: string;
    createdAt: Date;
    query: Object;
    indexName: string;
    data: Object

    constructor(that: IDataseries) {
        this.name = that.name;
        this.createdAt = that.createdAt;
        this.query = that.query;
        this.indexName = that.indexName;
        this.data = that.data;
    }
}

export interface IDataseriesModel extends IDataseries, Document {
}

export const DataseriesSchema: Schema = new Schema({
    name: String,
    createdAt: {type: Date, default: Date.now},
    query: String,
    indexName: String
});
