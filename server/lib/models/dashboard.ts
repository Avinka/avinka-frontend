import { Document, Schema, Model, model} from "mongoose";

export interface IDashboard {
    name: string;
    createdAt:Date
}

export interface IDashboardModel extends IDashboard, Document {
    fullName(): string;
}

export const DashboardSchema: Schema = new Schema({
    name: String,
    createdAt: Date
});
