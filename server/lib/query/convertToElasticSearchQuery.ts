import {ISelector} from "./selector";

export function convertToElasticSearchQuery(selector: ISelector): Query {
    const operator = selector.operator;
    switch (operator) {
        case "=": {
            return new MatchQuery(selector.key, selector.value);
        }
        default: {
            throw new Error('Invalid selector type')
        }
    }
}

export interface Query {
}
//This will work for string, date, number 
export class MatchQuery implements Query {
    match: {}

    constructor(key: string, value: any) {
        let pair = {};
        pair[key] = value;
        this.match = pair;
    }
}

