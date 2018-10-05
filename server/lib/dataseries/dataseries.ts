import {Document, Schema, Model, model} from "mongoose";

export interface IDataseries {
    name: string;
    createdAt: Date;
    query: string;
    indexName: string;
    data: Array<Array<any>>
}

export interface IDataseriesModel extends IDataseries, Document {
}

export const DataseriesSchema: Schema = new Schema({
    name: String,
    createdAt: { type: Date, default: Date.now },
    query: String,
    indexName: String
});
