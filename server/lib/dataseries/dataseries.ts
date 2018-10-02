import { Document, Schema, Model, model} from "mongoose";

export interface IDataseries {
    name: string;
    createdAt: Date;
    query: string;
    indexName: string;
}

export interface IDataseriesModel extends IDataseries, Document {
}

export const DataseriesSchema: Schema = new Schema({
    name: String,
    createdAt: Date,
    query: String,
    indexName: String
});
