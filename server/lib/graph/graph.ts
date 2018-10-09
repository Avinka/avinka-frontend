import { Document, Schema, Model, model} from "mongoose";
import {IDataseries} from "../dataseries/dataseries";

export interface IGraph {
    name: string;
    createdAt:Date;
    dataseries: IDataseries[];
}

export interface IGraphModel extends IGraph, Document {
}

export const GraphSchema: Schema = new Schema({
    name: String,
    createdAt: { type: Date, default: Date.now },
    dataSeries: [{ type: Schema.Types.ObjectId, ref: 'DataSeries' }]
});
