import { Document, Schema} from "mongoose";
import {IDataseries} from "../dataseries/dataseries";

export interface IGraph {
    _id: any;
    name: string;
    description: string;
    createdAt:Date;
    dataseries: IDataseries[];
}

export class Graph implements IGraph {
    _id: any;
    name: string;
    description: string;
    createdAt:Date;
    dataseries: IDataseries[];

    static clone(that: IGraph): Graph {
        let result: Graph = new Graph();
        result._id = that._id;
        result.name = that.name;
        result.description = that.description;
        result.createdAt = that.createdAt;
        result.dataseries = that.dataseries;
        return result;
    }
}

export interface IGraphModel extends IGraph, Document {
}

export const GraphSchema: Schema = new Schema({
    name: String,
    description: String,
    createdAt: { type: Date, default: Date.now },
    dataseries: [{ type: Schema.Types.ObjectId, ref: 'Dataseries' }]
});
