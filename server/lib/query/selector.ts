import {Document, Schema, Model, model} from "mongoose";

export interface ISelector {
    key: string;
    value: string;
    operator: string;
    createdAt: Date;
}

export class Selector implements ISelector {
    key: string;
    value: string;
    operator: string;
    createdAt: Date;

    constructor(that: ISelector) {
        this.key = that.key;
        this.value = that.value;
        this.operator = that.operator;
        this.createdAt = that.createdAt;
    }
}

export interface ISelectorModel extends ISelector, Document {
}

export const SelectorSchema: Schema = new Schema({
    key: String,
    value: String,
    operator: String,
    createdAt: {type: Date, default: Date.now}
});
