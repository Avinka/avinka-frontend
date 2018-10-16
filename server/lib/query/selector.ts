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

    static clone(that: ISelector): Selector {
        let selector: Selector = new Selector();
        selector.key = that.key;
        selector.value = that.value;
        selector.operator = that.operator;
        selector.createdAt = that.createdAt;
        return selector;
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
