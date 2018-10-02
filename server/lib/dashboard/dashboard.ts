import { Document, Schema, Model, model} from "mongoose";

export interface IDashboard {
    name: string;
    createdAt:Date;
}

export interface IDashboardModel extends IDashboard, Document {
}

export const DashboardSchema: Schema = new Schema({
    name: String,
    createdAt: Date,
    graphs: { type: Schema.Types.ObjectId, ref: 'Graphs' }
});
