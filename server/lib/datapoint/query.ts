import {ISelector} from "../query/selector";

export class Query {
    since?: Date;
    until?: Date;
    agg_interval?: string;
    selectors: ISelector[] = [];

    isEmpty() {
        return this.since && this.until && this.selectors.length == 0;
    }
}
